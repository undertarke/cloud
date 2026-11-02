import express from 'express';
import multer from 'multer';
import { Storage } from '@google-cloud/storage'
import { projectId, authClient } from './auth.js'
import { createOrUpdate } from './db.js'

const app = express();

app.use(express.json())

// Cloud Run's filesystem is in-memory anyway, so keep the upload in memory
const upload = multer({ storage: multer.memoryStorage() })

const storage = new Storage({ projectId, authClient })
const bucket = storage.bucket("bucketcyber")

app.get("/upload", (req, res) => {
    res.send("GET upload")
})

app.post("/upload", upload.single("image"), async (req, res) => {

    const { file } = req

    if (!file) {
        return res.status(400).json({ success: false, message: 'Missing "image" file' })
    }

    const filename = Date.now() + "_" + file.originalname

    try {
        await bucket.file(filename).save(file.buffer, { contentType: file.mimetype })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Upload failed' })
    }

    const { success, data } = await createOrUpdate({
        "id": Date.now(),
        "url": filename,
        "title": file.originalname,
        "description": file.size.toString()
    })

    res.status(success ? 200 : 500).send({ success, data })

})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on ${port}`))

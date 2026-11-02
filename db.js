import { Firestore } from '@google-cloud/firestore'
import { projectId, auth } from './auth.js'

const db = new Firestore({ projectId, auth, databaseId: 'databasecyber' })

const Collection = 'hinh_anh'


// Create or Update HinhAnhs
const createOrUpdate = async (data = {}) => {
    try {
        const ref = data.id !== undefined
            ? db.collection(Collection).doc(String(data.id))
            : db.collection(Collection).doc()

        await ref.set(data)
        return { success: true, data }
    } catch (error) {
        console.error(error)
        return { success: false }
    }
}

// Read all HinhAnhs
const readAllHinhAnhs = async () => {
    try {
        const snapshot = await db.collection(Collection).get()
        const Items = snapshot.docs.map(doc => doc.data())
        return { success: true, data: Items }

    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }

}

// Read HinhAnhs by ID
const getHinhAnhById = async (id) => {
    try {
        const doc = await db.collection(Collection).doc(String(id)).get()
        return { success: true, data: doc.exists ? doc.data() : {} }
    } catch (error) {
        console.error(error)
        return { success: false, data: null }
    }
}

// Delete HinhAnh by ID
const deleteHinhAnhById = async (id) => {
    try {
        await db.collection(Collection).doc(String(id)).delete()
        return { success: true }

    } catch (error) {
        console.error(error)
        return { success: false }
    }
}


export {
    createOrUpdate,
    readAllHinhAnhs,
    getHinhAnhById,
    deleteHinhAnhById
}

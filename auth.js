import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { GoogleAuth, JWT } from 'google-auth-library'

// Service account key (JSON) downloaded from GCP console
const keyFile = process.env.GOOGLE_KEY_FILE
    || fileURLToPath(new URL('./service-account.json', import.meta.url))

const key = JSON.parse(readFileSync(keyFile, 'utf8'))

const projectId = key.project_id

const authClient = new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
})

const auth = new GoogleAuth({ authClient, projectId })

export { projectId, authClient, auth }

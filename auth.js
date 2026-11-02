import { existsSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { GoogleAuth, JWT } from 'google-auth-library'

const scopes = ['https://www.googleapis.com/auth/cloud-platform']

// Service account key (JSON) downloaded from GCP console, used for local dev
const keyFile = process.env.GOOGLE_KEY_FILE
    || fileURLToPath(new URL('./service-account.json', import.meta.url))

let projectId, authClient, auth

if (existsSync(keyFile)) {
    const key = JSON.parse(readFileSync(keyFile, 'utf8'))

    projectId = key.project_id
    authClient = new JWT({
        email: key.client_email,
        key: key.private_key,
        scopes
    })
    auth = new GoogleAuth({ authClient, projectId })
} else {
    // No key file (e.g. Cloud Run): use the service account attached to the service.
    // Credentials and project ID are resolved lazily on the first request, so the
    // server can start listening even if the metadata server is slow.
    auth = new GoogleAuth({ scopes })
    authClient = auth
}

export { projectId, authClient, auth }

import { Client, Databases, Functions } from 'appwrite'
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
  APPWRITE_DOCUMENT_ID,
  APPWRITE_FUNCTION_ID,
} from '#/lib/constants/appwrite'

// Lazy client so a missing env var only throws at call-time, not at module load,
// keeping SSR from hard-crashing on pages that don't use these functions.
function createClient() {
  return new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
}

export async function getCompletionCount(): Promise<number> {
  const databases = new Databases(createClient())
  const doc = await databases.getDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    APPWRITE_DOCUMENT_ID
  )
  return doc.completions as number
}

export async function incrementCompletions(): Promise<void> {
  const functions = new Functions(createClient())
  await functions.createExecution(APPWRITE_FUNCTION_ID)
}

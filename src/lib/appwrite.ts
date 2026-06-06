import { Client, Databases, Functions } from 'appwrite'
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
  APPWRITE_DOCUMENT_ID,
  APPWRITE_FUNCTION_ID,
} from '#/lib/constants/appwrite'

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
  return doc.completions
}

export async function incrementCompletions(): Promise<void> {
  const functions = new Functions(createClient())
  await functions.createExecution({
    functionId: APPWRITE_FUNCTION_ID,
  })
}

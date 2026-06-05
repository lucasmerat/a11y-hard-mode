import { Client, Databases } from 'node-appwrite'

const COLLECTION_ID = 'game_stats'
const DOCUMENT_ID = 'global'

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '')

  const databases = new Databases(client)

  try {
    const doc = await databases.getDocument(
      process.env.DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID
    )

    const updated = await databases.updateDocument(
      process.env.DATABASE_ID,
      COLLECTION_ID,
      DOCUMENT_ID,
      { completions: doc.completions + 1 }
    )

    log(`Completions incremented to ${updated.completions}`)
    return res.json({ success: true, completions: updated.completions })
  } catch (err) {
    error(`Failed to increment completions: ${err.message}`)
    return res.json({ success: false, error: err.message }, 500)
  }
}

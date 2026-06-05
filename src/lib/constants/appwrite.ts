export const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT as string
export const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID as string
export const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string
export const APPWRITE_FUNCTION_ID = import.meta.env.VITE_APPWRITE_FUNCTION_ID as string

// These are stable collection/document IDs, not sensitive — no need for env vars
export const APPWRITE_COLLECTION_ID = 'game_stats'
export const APPWRITE_DOCUMENT_ID = 'global'

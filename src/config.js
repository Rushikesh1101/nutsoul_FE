// API base URL.
// Set via Vercel project env var:  VITE_API_URL=https://<your-backend>.vercel.app/api
// Falls back to the local Flask dev server for development.
const FALLBACK = "http://localhost:2000/api";
export const API_URL = import.meta.env.VITE_API_URL || FALLBACK;

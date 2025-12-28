
import { createClient } from "@supabase/supabase-js";



const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL
const VITE_API_KEY = import.meta.env.VITE_API_KEY

export const supabase = createClient(VITE_DATABASE_URL, VITE_API_KEY)
import { createClient } from '@supabase/supabase-js'
import { Database } from './schema'
// Vite doesn't provide a built-in process variable like Node.js does. Vite is designed for frontend development and doesn't include a Node.js-like global object.
// To access environment variables in Vite, use the import.meta.env object. This object allows you to access environment variables defined in your Vite project.
// rename vars in the env file with VITE_ prefix as it automatically exposes vars starting with that.
// process.env.VITE_NDE_  ---> import.meta.env.VITE_NDE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
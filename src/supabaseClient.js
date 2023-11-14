
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NDETODO_APP_SUPABASE_URL
// const supabaseKey = process.env.NDETODO_APP_SUPABASE_ANON_KEY

// Vite doesn't provide a built-in process variable like Node.js does. Vite is designed for frontend development and doesn't include a Node.js-like global object.
// To access environment variables in Vite, use the import.meta.env object. This object allows you to access environment variables defined in your Vite project.
// rename vars in the env file with VITE_ prefix as it automatically exposes vars starting with that.
// process.env.  ---> import.meta.env.

const supabaseUrl = import.meta.env.VITE_NDETODO_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_NDETODO_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

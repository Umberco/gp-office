import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_DB_URL,
    import.meta.env.VITE_SUPABASE_API_KEY,
    //import.meta.env.VITE_SUPABASE_STORAGE
);
import { createClient } from '@supabase/supabase-js'

// Runtime-only initialization (avoids build-time errors)
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

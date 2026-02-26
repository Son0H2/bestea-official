import { createClient } from '@supabase/supabase-js'

// Lazy initialization to avoid build-time errors
let _supabase: ReturnType<typeof createClient> | null = null

function getSupabase() {
    if (!_supabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (!url || !key) {
            throw new Error('Supabase environment variables not configured')
        }
        
        _supabase = createClient(url, key)
    }
    return _supabase
}

// Export methods that will be called at runtime
export const supabase = {
    from: (table: string) => getSupabase().from(table),
    auth: {
        getUser: async () => {
            return getSupabase().auth.getUser()
        },
        signInWithPassword: async (credentials: any) => {
            return getSupabase().auth.signInWithPassword(credentials)
        },
        signUp: async (credentials: any) => {
            return getSupabase().auth.signUp(credentials)
        },
    },
    storage: {
        from: (bucket: string) => getSupabase().storage.from(bucket)
    }
}

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kode_uri_api_masing2.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kode_api_key_masing2';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
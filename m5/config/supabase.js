import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kode_masing_masing.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kode_masing_masing';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
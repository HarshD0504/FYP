import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zofbnvkcnsdisrptzado.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZmJudmtjbnNkaXNycHR6YWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMTk1OTcsImV4cCI6MjA1NzU5NTU5N30.gSSwRkq0oVmru7cjV4NzHP_F-n1Hccn2oGYRoKv-Yiw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

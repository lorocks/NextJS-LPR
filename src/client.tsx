import { createClient } from "@supabase/supabase-js";

const supabaseServer = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON
);

export default supabaseServer;

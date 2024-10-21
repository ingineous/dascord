import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://odoxspibqhprcmjfckkl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kb3hzcGlicWhwcmNtamZja2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NTEzMzYsImV4cCI6MjA0NTAyNzMzNn0.pVKXzXTBHw5BEu8HFJvqDfLJvY_TE2Sy3pxPnzXw_g0",
);

export default supabase;

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://odoxspibqhprcmjfckkl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kb3hzcGlicWhwcmNtamZja2tsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTQ1MTMzNiwiZXhwIjoyMDQ1MDI3MzM2fQ.1iM8XkDxDuns0t0IW6z4mqMSzjyQl3-YLP7EbstJV7s',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export default supabase

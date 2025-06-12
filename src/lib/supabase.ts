import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://flcinuiljorceyybsszl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsY2ludWlsam9yY2V5eWJzc3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzM3NjEsImV4cCI6MjA2NTMwOTc2MX0.l7LJEq8-j-PCEbSgsgbGqSprFIxFGyAzBHgeEmkkTTc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 
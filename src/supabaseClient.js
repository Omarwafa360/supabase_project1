// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mhanotwqgboxaltelaaq.supabase.co'; // رابط مشروعك
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYW5vdHdxZ2JveGFsdGVsYWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTM5NzcsImV4cCI6MjA2ODM4OTk3N30.3pXSGlkDmV-gNuGGzWGgm-F-e6IqVDrivY_lQWsySRw'; // المفتاح

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

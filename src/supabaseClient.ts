// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mddnelkskjtxwvstlwxb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZG5lbGtza2p0eHd2c3Rsd3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzc1NzIsImV4cCI6MjA4MzY1MzU3Mn0.1rv8vdo8aIQlVtYDkDenMmvbxodLbnLcidkZlmeI9Y8";

export const supabase = createClient(supabaseUrl, supabaseKey);

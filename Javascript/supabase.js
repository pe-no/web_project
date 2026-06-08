const SUPABASE_URL = "https://feczyowbfdzvftysfvwr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlY3p5b3diZmR6dmZ0eXNmdndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNTM3OTIsImV4cCI6MjA5NTkyOTc5Mn0.AGRNUsSudvoY71WdR6g0RrgAKPfTPU3pKH73EYFtnsQ";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
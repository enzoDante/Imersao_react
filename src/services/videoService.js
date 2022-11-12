import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://xfnzbgbpzfxxhagmqpwl.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbnpiZ2JwemZ4eGhhZ21xcHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODM3MjYsImV4cCI6MTk4Mzg1OTcyNn0.R4EtaMWmeJ8gbP1FVaN59ApYD85YuVel0aEgvUGcT9g"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService(){
    return {
        getAllVideos(){
            return supabase.from("video").select("*");
        }
    }
}
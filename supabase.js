const SUPABASE_URL = "https://xygozbgvatsxeljrvyad.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5Z296Ymd2YXRzeGVsanJ2eWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODIxMjgsImV4cCI6MjA4ODM1ODEyOH0.dSiadmuUH7Gl74JPu5FHIgThPGAn0JKH2-Uij3dLt2Y";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function getCurrentUser(){
  const { data } = await supabaseClient.auth.getUser();
  return data?.user || null;
}

async function ensureLoggedIn(){
  const user = await getCurrentUser();
  if(!user){
    window.location.href = "login.html";
    return null;
  }
  return user;
}

async function logoutUser(){
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

async function getMyProfile(){
  const user = await getCurrentUser();
  if(!user) return null;

  const { data } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

async function getMyWallet(){
  const user = await getCurrentUser();
  if(!user) return null;

  const { data } = await supabaseClient
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return data;
}

function money(x){
  return Number(x || 0).toLocaleString();
}

function getKycPublicUrl(path){
  if(!path) return "";
  return SUPABASE_URL + "/storage/v1/object/public/kyc-documents/" + path;
}

import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let body: { path?: string } = {};
    if (req.method === "POST") {
      try {
        body = await req.json();
      } catch {
        // empty body is fine
      }
    }

    const path = body.path || "/";
    const userAgent = req.headers.get("user-agent") || null;

    // Geolocate using request IP
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip");
    const rawIp = forwarded?.split(",")[0]?.trim() || realIp || cfConnectingIp || "0.0.0.0";

    let country: string | null = null;
    let region: string | null = null;
    let city: string | null = null;

    try {
      const geoRes = await fetch(`http://ip-api.com/json/${rawIp}?fields=country,regionName,city,status`);
      if (geoRes.ok) {
        const geo = await geoRes.json();
        if (geo.status === "success") {
          country = geo.country || null;
          region = geo.regionName || null;
          city = geo.city || null;
        }
      }
    } catch {
      // geolocation is best-effort
    }

    const { error } = await supabase.from("website_visits").insert({
      path,
      country,
      region,
      city,
      user_agent: userAgent,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

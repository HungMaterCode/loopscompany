import { NextResponse } from "next/server";
import dns from "dns";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain || !domain.trim()) {
      return NextResponse.json({ error: "Missing domain param" }, { status: 400 });
    }

    const cleanDomain = domain.trim().toLowerCase();
    
    let isRegistered = false;
    try {
      // Query NS (Name Server) records - this is the most reliable check for registration
      await dns.promises.resolve(cleanDomain, "NS");
      isRegistered = true;
    } catch (e: any) {
      try {
        // If NS fails, check A records
        await dns.promises.resolve(cleanDomain, "A");
        isRegistered = true;
      } catch (err: any) {
        // Fallback to Google DNS over HTTPS
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);
          
          const res = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=NS`, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          const data = await res.json();
          if (data.Status === 0 && (data.Answer || data.Authority)) {
            isRegistered = true;
          } else {
            // Also check type A
            const controllerA = new AbortController();
            const timeoutIdA = setTimeout(() => controllerA.abort(), 2500);
            const resA = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`, { signal: controllerA.signal });
            clearTimeout(timeoutIdA);
            const dataA = await resA.json();
            if (dataA.Status === 0 && (dataA.Answer || dataA.Authority)) {
              isRegistered = true;
            }
          }
        } catch (fetchErr) {
          isRegistered = false;
        }
      }
    }

    return NextResponse.json({
      domain: cleanDomain,
      available: !isRegistered,
    });
  } catch (error: any) {
    console.error("Failed to check domain:", error);
    return NextResponse.json({ error: "Failed to check domain" }, { status: 500 });
  }
}

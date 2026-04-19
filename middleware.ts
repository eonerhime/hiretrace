import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "hiretrace-token";

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const PUBLIC_API_ROUTES = ["/api/auth/login", "/api/auth/register"];

async function verifyToken(token: string): Promise<boolean> {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !signatureB64) return false;

    const secret = process.env.JWT_SECRET;
    if (!secret) return false;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const signatureBytes = Uint8Array.from(
      atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0),
    );

    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const valid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      signatureBytes,
      data,
    );
    if (!valid) return false;

    // Check expiry
    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000))
      return false;

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const isApiRoute = pathname.startsWith("/api");
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPublicApiRoute = PUBLIC_API_ROUTES.includes(pathname);

  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const valid = await verifyToken(token);

  if (!valid) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "hiretrace-token";

// Routes that do not require authentication
const PUBLIC_ROUTES = ["/", "/login", "/register"];
const PUBLIC_API_ROUTES = ["/api/auth/login", "/api/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const isApiRoute = pathname.startsWith("/api");
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPublicApiRoute = PUBLIC_API_ROUTES.includes(pathname);

  // Allow public routes through without checking token
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  // No token — redirect or return 401
  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token
  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Token is expired or invalid
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Clear the invalid cookie
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

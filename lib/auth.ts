// lib/auth.ts
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

interface JWTPayload {
  userId: string;
  email: string;
}

export async function getUserFromRequest(
  request: NextRequest,
): Promise<JWTPayload | null> {
  const token = request.cookies.get("hiretrace-token")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

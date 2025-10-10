import { SignJWT, jwtVerify } from "jose";
import { Env } from "../env";

const encoder = new TextEncoder();
const secret = encoder.encode(Env.AUTH_JWT_SECRET);

export type JwtPayload = {
  sub: string;
  role: "ADMIN" | "USER";
  email?: string;
  iat?: number;
  exp?: number;
  typ?: "access" | "refresh";
};

export async function signAccessToken(payload: Omit<JwtPayload, "iat" | "exp" | "typ">) {
  return await new SignJWT({ ...payload, typ: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${Env.AUTH_ACCESS_TOKEN_TTL}s`)
    .sign(secret);
}

export async function signRefreshToken(payload: Omit<JwtPayload, "iat" | "exp" | "typ">) {
  return await new SignJWT({ ...payload, typ: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${Env.AUTH_REFRESH_TOKEN_TTL}s`)
    .sign(secret);
}

export async function verifyToken<T = JwtPayload>(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as T;
}

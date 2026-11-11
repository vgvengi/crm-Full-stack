import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const ACCESS_TOKEN_COOKIE = "hubspot_access_token";

export type AuthenticatedUser = {
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: AuthenticatedUser;
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET must be configured.");
  }

  return secret;
}

function getCookie(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.cookie;

  return cookieHeader
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function createAccessToken(email: string): string {
  return jwt.sign({ email }, getJwtSecret(), { expiresIn: "1h" });
}

export function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const token = getCookie(request, ACCESS_TOKEN_COOKIE);

  if (!token) {
    response.status(401).json({ success: false, message: "Authentication is required." });
    return;
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());

    if (
      typeof payload === "string" ||
      typeof (payload as JwtPayload).email !== "string"
    ) {
      response.status(401).json({ success: false, message: "Invalid authentication token." });
      return;
    }

    request.authenticatedUser = { email: payload.email };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      response.status(401).json({ success: false, message: "Invalid or expired authentication token." });
      return;
    }

    next(error);
  }
}

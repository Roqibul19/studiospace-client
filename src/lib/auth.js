import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError, createAuthMiddleware } from "better-auth/api";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { getPasswordErrors } from "@/lib/validation";

const client = new MongoClient(process.env.DB_URI);
const db = client.db("studiospaceDB");

const hasGoogleKeys =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

const JWT_COOKIE = "studiospace_token";
const JWT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const jwtCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

function signToken(user) {
  return jwt.sign(
    { name: user.name, email: user.email, image: user.image ?? null },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      subject: String(user.id),
      expiresIn: JWT_MAX_AGE_SECONDS,
    },
  );
}

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: hasGoogleKeys
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {},
  hooks: {
    // The form checks the password too, but a request can skip the form.
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const errors = getPasswordErrors(ctx.body?.password);
      if (errors.length) {
        throw new APIError("BAD_REQUEST", { message: errors[0] });
      }
    }),

    // Keeps the JWT cookie for the Express API in step with the login session.
    // Email login, Google login and sign-up all create a new session. Each page
    // load also calls /get-session, which renews the JWT while the session lasts.
    after: createAuthMiddleware(async (ctx) => {
      const isSessionCheck = ctx.path === "/get-session";
      const current =
        ctx.context.newSession ?? (isSessionCheck ? ctx.context.returned : null);

      if (current?.user) {
        ctx.setCookie(JWT_COOKIE, signToken(current.user), {
          ...jwtCookieOptions,
          maxAge: JWT_MAX_AGE_SECONDS,
        });
        return;
      }

      const sessionEnded = ctx.path === "/sign-out" || isSessionCheck;
      if (sessionEnded && ctx.getCookie(JWT_COOKIE)) {
        ctx.setCookie(JWT_COOKIE, "", { ...jwtCookieOptions, maxAge: 0 });
      }
    }),
  },
});

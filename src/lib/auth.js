import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { getPasswordErrors } from "@/lib/validation";

const client = new MongoClient(process.env.DB_URI);
const db = client.db("studiospaceDB");

const hasGoogleKeys =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

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
  },
});

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { profile, users } from "@/db/schema";

const app = new Hono().post(
  "/",
  clerkMiddleware(),
  zValidator("json", z.object({ message: z.string() })),

  async (c) => {
    const auth = getAuth(c);
    const { message } = c.req.valid("json");

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, auth.userId),
    });

    if (!user) {
      return c.json({ error: "This user not found" }, 404);
    }

    const [data] = await db
      .insert(profile)
      .values({
        id: createId(),
        userId: user.id,
        message: message,
      })
      .returning();

    return c.json({ data });
  }
);

export default app;

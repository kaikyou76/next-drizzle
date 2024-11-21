import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { db } from "@/db/drizzle";
import { profile, users } from "@/db/schema";

const app = new Hono()
  .post(
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

      const existingProfile = await db.query.profile.findFirst({
        where: eq(profile.userId, user.id),
      });

      if (existingProfile) {
        return c.json({ error: "Profile already exist" }, 400);
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
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ id: z.string(), message: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
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
        .update(profile)
        .set({ message: message })
        .where(and(eq(profile.userId, user.id), eq(profile.id, id)))
        .returning();

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

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
        .delete(profile)
        .where(and(eq(profile.userId, user.id), eq(profile.id, id)))
        .returning({ id: profile.id });

      return c.json({ data });
    }
  );
export default app;

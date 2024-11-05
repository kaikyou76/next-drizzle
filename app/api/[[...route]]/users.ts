import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono()

  .get("/", async (c) => {
    const data = await db.select().from(users);
    return c.json({ data });
  })
  .get("/me", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const [data] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, auth.userId));
    if (!data) {
      return c.json({ error: "user not found!" }, 404);
    }
    return c.json({ user: data });
  })
  //idと紐づけるユーザー情報を取得したい場合のロジック
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      //const id = c.req.param("id");
      const { id } = c.req.valid("param");
      const [data] = await db.select().from(users).where(eq(users.id, id));
      if (!data) {
        return c.json({ error: "user not found!" }, 404);
      }
      return c.json({ users: data });
    }
  );

export default app;

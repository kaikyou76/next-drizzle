import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/", async (c) => {
  const data = await db.select().from(users);
  return c.json({ users: data });
});

//idと紐づけるユーザー情報を取得したい場合のロジック
app.get(
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

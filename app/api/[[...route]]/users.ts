import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


const app = new Hono();

//http://localhost:3000/api/users
app.get('/', async (c) =>{
    const data = await db.select().from(users);
    return c.json({
        users: data,
    });
})

//http://localhost:3000/api/users/qxwgrwzflizjm535ojiuqged
app.get('/:id', async (c) =>{
    const id = c.req.param("id");
    const data = await db.select().from(users).where(eq(users.id, id));
    return c.json({
        user: data,
    });
})

export default app;
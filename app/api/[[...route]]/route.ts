import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.route("/users", users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

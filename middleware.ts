import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);
const isProtectedRoute = createRouteMatcher(["/", "/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  //if (isProtectedRoute(req)) await auth.protect();
  if (!isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// src/middleware.js
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Matcher ignoring API routes, Next.js internal files, and static assets
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

// src/proxy.js
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleProxy = createMiddleware(routing);

export default function proxy(request) {
  return handleProxy(request);
}

export const config = {
  // Matcher ignoring API routes, Next.js internal files, and static assets
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

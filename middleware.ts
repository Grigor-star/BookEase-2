import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  storeRoutes,
} from "./routes";
import { isAdmin } from "./lib/isAdmin";
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = req.auth;
  const userId = req.auth?.user.id;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isStoreRoute = storeRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined;
  }

  if (!isLoggedIn && isAuthRoute) {
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (isStoreRoute) {
    const params = nextUrl.searchParams.get("id");
    if (!params) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    const isStoreOwner = await isAdmin(params, userId);
    if (!isStoreOwner) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return undefined;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

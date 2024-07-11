import { RedirectToSignIn } from "@clerk/nextjs";
import {
  clerkMiddleware,
  createRouteMatcher,
  authMiddleware,
  redirectToSignUp
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"]);

// export default clerkMiddleware((auth, request) => {
//   if (isPublicRoute(request) && auth().userId) {
//     let path = "/org-select";
//     if (auth().orgId) {
//       path = `/organization/${auth().orgId}`;
//     }
//     const redirectUrl = new URL(path, request.url);
//     console.log(redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   }
//   if (!auth().userId && !isPublicRoute(request)) {
//     console.log(isPublicRoute(request));
//     return auth().redirectToSignIn({ returnBackUrl: request.url });
//   }
//   if (
//     auth().userId &&
//     !auth().orgId &&
//     request.nextUrl.pathname !== "/org-select"
//   ) {
//     const redirectUrl = new URL("/org-select", request.url);
//     return NextResponse.redirect(redirectUrl);
//   }
// });

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/org-select";
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }
      const redirectUrl = new URL(path, req.url);
      return NextResponse.redirect(redirectUrl);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignUp({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-select") {
      const redirectUrl = new URL("/org-select", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};

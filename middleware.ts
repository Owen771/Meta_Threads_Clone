import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    // without '/api/uploadthing', onboarding will fail to redirect to home page after form submitted
    publicRoutes: ['/', '/api/webhook/clerk', '/api/uploadthing'],
    ignoredRoutes: ['/api/webhook/clerk']
});

  
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
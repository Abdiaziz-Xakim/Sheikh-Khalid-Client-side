export { default } from "next-auth/middleware"
export const config = {
    matcher: ["/pages/dashboard/:path*", "/pages/dashboard/users/list/:path*", "/pages/dashboard/data/:path*", "/pages/dashboard/profile/:path*", "/pages/dashboard/settings/:path*",],

    // "/components/SideMenu/:path*"
}
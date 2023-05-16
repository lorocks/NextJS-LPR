import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const session = request.cookies.get("supabase-auth-token");
  const url = request.nextUrl.clone();

  //   if (
  //     url.pathname.startsWith("/_next") || // exclude Next.js internals
  //     url.pathname.startsWith("/api") || //  exclude all API routes
  //     url.pathname.startsWith("/static") || // exclude static files
  //     PUBLIC_FILE.test(url.pathname) // exclude all files in the public folder
  //   )
  //     return NextResponse.next();

  // if (url.pathname === '/signin' || url.pathname === '/text'){
  //     console.log("in")
  //     // return NextResponse.next()
  //     return new NextResponse(JSON.stringify({status:true}))
  // }
  // else{
  //   if (session && url.pathname !== "/licenses") {
  //     url.pathname = "/licenses";
  //     return NextResponse.redirect(url);
  //   }
  if (!session || url.pathname === "/") {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
  // }

  //   if (url.pathname.includes("/api") || session) {
  //     return NextResponse.next();
  //   }

  //   if (!session && url.pathname !== "/signin") {
  //     url.pathname = "/signin";
  //     return NextResponse.redirect(url);
  //   }
}
export const config = {
  matcher: ["/", "/licenses", "/licenses/:path*"],
};

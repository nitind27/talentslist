import { NextResponse } from "next/server";
import { auth } from "../auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, searchParams } = req.nextUrl;
  console.log("hell logged in ", !!req.auth);
  console.log("hell ", pathname);
  if (pathname === "/register") {
    return NextResponse.next();
  }
  if (pathname === "/forgot_password") {
    return NextResponse.next();
  }
  if (pathname === "/reset_password") {
    return NextResponse.next();
  }


  if(pathname === '/login'){
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/" || path === "/products";

  // Improved token retrieval with nullish coalescing operator
  const token = request.cookies.get("token")?.value ?? null;

  // Redirect based on authentication and path
  if (!isPublicPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

   
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout"],
};

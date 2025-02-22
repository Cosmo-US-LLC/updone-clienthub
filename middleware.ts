import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const talentAllowedPaths: string[] = ["/staff", "/talent"];

const hostAllowedPaths: string[] = ["/events", "/payments", "/settings"];

const unauthenticatedPathPattern = /^\/events\/detail\/\d+\/payment-request$/;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const authData = request.cookies.get("authData")?.value;
  const currentPath = request.nextUrl.pathname;

  let parsedAuthData;
  try {
    parsedAuthData = authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error("Failed to parse authData:", error);
    parsedAuthData = null;
  }

  if (
    (!token?.value || token.value === "undefined") &&
    unauthenticatedPathPattern.test(currentPath)
  ) {
    return NextResponse.next();
  }

  if (
    (!token?.value || token.value === "undefined") &&
    hostAllowedPaths.some((path) => currentPath.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_BASE_URL || "/", request.url)
    );
  }
  const role_id = parsedAuthData?.user?.role_id;

  if (
    role_id === 3 &&
    !talentAllowedPaths.some((path) => currentPath.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(`/unauthorized?role=talent`, request.url)
    );
  }

  if (
    role_id === 4 &&
    !hostAllowedPaths.some((path) => currentPath.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(`/unauthorized?role=host`, request.url)
    );
  }

  const hostname = request.headers.get('host')!;
  // Redirect paths to NEXT_PUBLIC_CLIENTHUB_URL if not already on clienthub
  if (
    hostAllowedPaths.some((path) => currentPath.startsWith(path)) &&
    !hostname.includes("clienthub")
  ) {
    const clientHubUrl = process.env.NEXT_PUBLIC_CLIENTHUB_URL;
    return NextResponse.redirect(new URL(currentPath, clientHubUrl));
  }

   // Redirect paths to NEXT_PUBLIC_TALENTPRO_URL if not already on talentpro
   if (
    talentAllowedPaths.some((path) => currentPath.startsWith(path)) &&
    !hostname.includes("talentpro")
  ) {
    const clientHubUrl = process.env.NEXT_PUBLIC_TALENTPRO_URL;
    return NextResponse.redirect(new URL(currentPath, clientHubUrl));
  }

  

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup",
    "/signin",
    "/reset-password",
    "/events/:path*",
    "/payments/:path*",
    "/settings/:path*",
    "/events/detail/:path*",
    '/staff/:path*',
    '/talent/:path*'
  ],
};

import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  if (req.nextUrl.pathname.startsWith("/api/user")) {
    const Authorization: string = "authorization"
    const token: string = req.headers.get(Authorization)
    if (token == "null") {
      return NextResponse.rewrite(new URL('/api/auth/unauthorized', req.url))
    }
  }
}

export const config = {
  matcher: ['/api/user/fetchUserSpecificData', '/api/user/UserLikedPosts'],
}
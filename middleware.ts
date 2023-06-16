import { NextResponse, NextRequest } from "next/server";
import {
  FETCH_USER_LIKED_POSTS,
  FETCH_USER_CREATED_POSTS,
  ADD_COMMENT_URL,
  DELETE_COMMENT,
  LIKE_COMMENT,
  DESCRIPTION_URL,
} from "@constants/apisEndpoints";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  if (req.nextUrl.pathname.startsWith("/api/user")) {
    const Authorization: string = "authorization";
    const token: string = req.headers.get(Authorization);
    if (token == "null") {
      return NextResponse.rewrite(new URL("/api/auth/unauthorized", req.url));
    }
  }
}

export const config = {
  matcher: [
    FETCH_USER_LIKED_POSTS,
    FETCH_USER_CREATED_POSTS,
    ADD_COMMENT_URL,
    DELETE_COMMENT,
    LIKE_COMMENT,
    DESCRIPTION_URL,
  ],
};

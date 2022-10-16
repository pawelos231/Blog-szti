import verify from "jsonwebtoken/verify";
import { NextResponse, NextRequest } from "next/server";


export  function middleware(req: NextRequest){
    console.log(req.headers)
}

export const config = {
  matcher: '/api/HandlePostSub',
}

import { NextResponse, NextRequest } from "next/server";
//it will later be changed to check protected api routes
export  async function middleware(req: NextRequest){
      const Authorization: string = "authorization"
      const token = req.headers.get(Authorization)
      if(token == "null"){
        const { pathname } = req.nextUrl;
        console.log(pathname)
        return NextResponse.rewrite(new URL('/api/auth/unauthorized', req.url))
      }
      
}



export const config = {
  matcher: ['/api/user/fetchUserSpecificData'],
}
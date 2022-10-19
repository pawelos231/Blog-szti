
import { NextResponse, NextRequest } from "next/server";
//it will later be changed to check protected api routes
export  async function middleware(req: NextRequest){
      const token = String(req.headers.get('authorization'))
      const response = NextResponse.next()
      return response
    }



export const config = {
  matcher: '/api/tochange',
}
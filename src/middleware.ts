
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';
// __Secure-
export async function middleware(request: NextRequest) {

  const accessToken = request.cookies.get('__Secure-next-auth.session-token')?.value

  let token = accessToken && await jwtVerify(accessToken as string , new TextEncoder().encode("JWTamazonClone1234")  , (err: any , token: any) =>{
    return token ? token : err
  })

  if(request.url.includes("signup") || request.url.includes("login")  ){
    if(token){
      return NextResponse.redirect(new URL("/" , request.url))
    }
  }


  if(request.url.includes("userReviews") ){
    if(!token){
      return NextResponse.redirect(new URL("/login" , request.url))
    }
  }

}

export const config = {
  matcher: ['/login','/signup', '/comment/:itemId*' , '/userReviews'],
}





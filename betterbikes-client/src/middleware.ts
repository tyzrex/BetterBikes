import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('next-auth.session-token')?.value


    const loggedInUserNotAccessiblePaths = 
    request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'


    if (authToken){
      if(request.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/user/dashboard', request.url))
      }
     
    }
    if(
      loggedInUserNotAccessiblePaths
    ){
      if(authToken){
        return NextResponse.redirect(new URL('/user/dashboard', request.url))
      }
    }
    else{
      if(!authToken){
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/listvehicle','/login','/signup', 
  //all routes under /user
  '/user/:path*',
]
}
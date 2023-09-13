import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const authToken = request.cookies.get('next-auth.session-token')?.value

    const loggedInUserNotAccessiblePaths = 
    request.nextUrl.pathname === '/login' || '/signup'


    console.log(loggedInUserNotAccessiblePaths)

    if(
      loggedInUserNotAccessiblePaths
    ){
      if(authToken){
        return NextResponse.redirect(new URL('/', request.url))
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
  matcher: ['/list-vehicle','/login','/signup']
}
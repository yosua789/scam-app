import { type NextFetchEvent, NextResponse } from 'next/server';
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware';


const authMiddleware = withAuth(
    function onSuccess(_req) {

    }, {
    callbacks: {
        authorized: async ({ token }) => {
            return !!token?.id;
        }
    }
}
)

export default function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
    const signInUrl = Response.redirect(request.url);
    console.log(request.credentials)
    if (!request.credentials) {
        if (request.nextUrl.pathname === '/') {
            return signInUrl;
        }
        const url = request.url.replace(request.nextUrl.pathname, '/sign-in');
        return Response.redirect(url);
    }

    return NextResponse.next()
}

export const config = {
    // matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/', '/dashboard/:path*'],
    matcher: ['/', '/dashboard/:path*']

}
// export const config = { matcher: ['/', '/dashboard/:path*'] };

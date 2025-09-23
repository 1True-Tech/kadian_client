import { NextRequest, NextResponse } from "next/server";


export function middleware(
    request: NextRequest,
): NextResponse {
    const pathname: string = request.nextUrl.pathname;
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const origin = request.nextUrl.origin
    const response: NextResponse = NextResponse.next();
    response.headers.set("x-origin", origin)
    response.headers.set("x-pathname", pathname);
    response.headers.set("x-searchParams", searchParams.toString());
    return response;
}
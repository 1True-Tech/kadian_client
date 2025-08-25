import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const response = NextResponse.next()
    response.headers.set('x-pathname', pathname)
    response.headers.set('x-searchParams', searchParams.toString())
    response.headers.set('x-searchParams', searchParams.toString())
    return response
}
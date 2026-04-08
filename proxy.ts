import { NextRequest, NextResponse } from "next/server";
import { checkLogin } from "./lib/checkLogin";

export default async function proxy(request: NextRequest) {
  const protectedPages = ["/create", "/dashboard"];
  const response = NextResponse.next();

  if (protectedPages.includes(request.nextUrl.pathname)) {
    const outcome: any = await checkLogin();
    console.log("OUTCOME: ", outcome);
    if (!outcome?.userId) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
  return response;
}

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /admin routes
  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (session && request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/sign-in"],
};

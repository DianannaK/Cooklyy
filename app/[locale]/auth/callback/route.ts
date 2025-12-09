import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = cookies();

  const supabase = createServerClient({
    cookies: () => cookieStore,
  });

  // After successful login, redirect to homepage
  return NextResponse.redirect(new URL('/', request.url));
}

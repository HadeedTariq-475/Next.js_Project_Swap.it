import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;

  console.log("User ID from cookie:", userId); // You’ll now see the cookie value here ✅

  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set('userId', '', {
    path: '/',
    maxAge: 0,
    httpOnly: true, // or false depending on how you originally set it
  });

  return response;
}

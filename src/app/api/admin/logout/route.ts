import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete('admin_session');
  
  return NextResponse.json({ success: true });
}


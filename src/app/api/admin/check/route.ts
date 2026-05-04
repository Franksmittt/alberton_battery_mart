import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mark as dynamic to prevent static analysis during build
export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  return NextResponse.json({ 
    authenticated: session?.value === 'authenticated' 
  });
}


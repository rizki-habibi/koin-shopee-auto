import { NextResponse } from 'next/server';
import { authorized, db } from '@/lib/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
 if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 const { data, error } = await db().from('shopee_schedule').select('*').eq('id', 1).single();
 if (error) return NextResponse.json({ error: 'Gagal membaca konfigurasi database.' }, { status: 500 });
 return NextResponse.json({ schedule: data });
}
export async function PUT(req: Request) {
 if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 const body = await req.json().catch(() => null);
 if (!body || typeof body.enabled !== 'boolean' || body.local_time !== '08:00') return NextResponse.json({ error: 'Jadwal template dikunci pada pukul 08:00 WIB agar cocok dengan Vercel Cron.' }, { status: 400 });
 const { data, error } = await db().from('shopee_schedule').update({ enabled: body.enabled, local_time: '08:00', timezone: 'Asia/Jakarta', target_url: 'https://shopee.co.id/koin-shopee', updated_at: new Date().toISOString() }).eq('id', 1).select('*').single();
 if (error) return NextResponse.json({ error: 'Gagal menyimpan konfigurasi database.' }, { status: 500 });
 return NextResponse.json({ schedule: data });
}

import { NextResponse } from 'next/server';
import { authorized, db } from '@/lib/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
 if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 const { data, error } = await db().from('shopee_runs').select('*').order('created_at', { ascending: false }).limit(20);
 if (error) return NextResponse.json({ error: 'Gagal membaca riwayat.' }, { status: 500 });
 return NextResponse.json({ runs: data ?? [] });
}
export async function POST(req: Request) {
 if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 const body = await req.json().catch(() => null);
 if (!body || !/^\d{4}-\d{2}-\d{2}$/.test(body.id || '')) return NextResponse.json({ error: 'ID jadwal tidak valid.' }, { status: 400 });
 const { error } = await db().from('shopee_runs').update({ status: 'opened_by_user', message: 'Pengguna menekan tombol buka tautan. Status check-in Shopee tidak diverifikasi.' }).eq('scheduled_for', body.id);
 if (error) return NextResponse.json({ error: 'Gagal memperbarui riwayat.' }, { status: 500 });
 return NextResponse.json({ ok: true, note: 'Pembukaan tautan dicatat; check-in tidak diverifikasi.' });
}

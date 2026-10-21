import { NextResponse } from 'next/server';
import { db } from '@/lib/server';
export const dynamic = 'force-dynamic';
export const maxDuration = 10;
export async function GET(req: Request) {
 const secret = process.env.CRON_SECRET;
 if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 try {
  const client = db();
  const { data: schedule, error: readError } = await client.from('shopee_schedule').select('*').eq('id', 1).single();
  if (readError) throw readError;
  const now = new Date();
  const local = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(now);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  if (!schedule.enabled || local < '08:00') return NextResponse.json({ ok: true, skipped: true, localTime: local });
  const { error } = await client.from('shopee_runs').upsert({ scheduled_for: today, status: 'waiting_for_browser', message: 'Tugas harian tercatat. Vercel tidak dapat membuka browser perangkat; check-in belum diverifikasi.' }, { onConflict: 'scheduled_for', ignoreDuplicates: true });
  if (error) throw error;
  return NextResponse.json({ ok: true, scheduledFor: today, status: 'waiting_for_browser', note: 'Tugas dicatat, bukan bukti check-in.' });
 } catch (e) { console.error('cron failure', e); return NextResponse.json({ error: 'Gagal memproses jadwal.' }, { status: 500 }); }
}

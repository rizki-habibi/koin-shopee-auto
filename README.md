# Shopee Auto Console

Console web untuk menyimpan jadwal harian pembukaan halaman Koin Shopee, dengan Next.js, Vercel Cron, dan Supabase.

## Penting
Vercel Cron berjalan di server dan tidak dapat membuka tab browser pada perangkat pengguna. Aplikasi ini menyimpan jadwal dan mencatat tugas harian; pengguna tetap membuka Shopee lewat tombol di dashboard. Check-in atau koin terkumpul tidak dianggap berhasil tanpa verifikasi.

## Setup
1. Jalankan `supabase/schema.sql` di SQL Editor proyek Supabase.
2. Isi environment variables `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN`, dan `CRON_SECRET` di Vercel.
3. Deploy repository sebagai aplikasi Next.js.
4. Cron pada `vercel.json` berjalan setiap hari pukul 01:00 UTC (08:00 WIB).

Lihat instruksi lengkap dan checklist di README setelah kode proyek terpasang.
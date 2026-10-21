import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Shopee Auto Console', description: 'Console jadwal harian untuk membuka halaman Koin Shopee.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body>{children}</body></html>; }

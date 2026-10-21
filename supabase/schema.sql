create table if not exists public.shopee_schedule (
 id integer primary key default 1 check (id = 1),
 target_url text not null default 'https://shopee.co.id/koin-shopee',
 enabled boolean not null default true,
 local_time text not null default '08:00',
 timezone text not null default 'Asia/Jakarta',
 updated_at timestamptz not null default now()
);
insert into public.shopee_schedule (id) values (1) on conflict (id) do nothing;
create table if not exists public.shopee_runs (
 id bigint generated always as identity primary key,
 scheduled_for date not null unique,
 status text not null check (status in ('waiting_for_browser','opened_by_user','failed')),
 message text not null,
 created_at timestamptz not null default now()
);
alter table public.shopee_schedule enable row level security;
alter table public.shopee_runs enable row level security;
-- No public policies. Use service-role key only in server routes.

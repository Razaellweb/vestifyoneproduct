-- Enable extensions if needed
create extension if not exists pgcrypto;

-- Users profile table (additional to Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text not null unique,
  bvn_encrypted text,
  bvn_last4 text,
  kyc_status text default 'unverified',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_users_phone on public.users(phone);

-- OTPs table (hashed codes)
create table if not exists public.otps (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  purpose text not null check (purpose in ('signup','login','bvn_verify')),
  expires_at timestamptz not null,
  attempts int default 0,
  sent_via text,
  last_sent_at timestamptz default now(),
  created_at timestamptz default now()
);
create index if not exists idx_otps_phone_purpose on public.otps(phone, purpose);

-- Savings plan table
create table if not exists public.savings_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  amount numeric not null check (amount > 0),
  frequency text not null check (frequency in ('daily','weekly','monthly')),
  start_date date not null,
  status text not null default 'pending_setup',
  auto_debit boolean default true,
  balance numeric not null default 0,
  idempotency_key text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, idempotency_key)
);
create index if not exists idx_savings_plans_user on public.savings_plans(user_id);

-- Investment products
create table if not exists public.investment_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  min_amount numeric not null check (min_amount > 0),
  risk text not null,
  status text not null default 'draft' check (status in ('draft','approved','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_investment_products_status on public.investment_products(status);

-- Investment transactions
create table if not exists public.investment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  product_id uuid not null references public.investment_products(id),
  amount numeric not null check (amount > 0),
  status text not null default 'initiated' check (status in ('initiated','pending','completed','failed','refunded')),
  provider text,
  provider_reference text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_investment_tx_user on public.investment_transactions(user_id);

-- Loans
create table if not exists public.loans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount numeric not null check (amount > 0),
  status text not null default 'pending' check (status in ('pending','approved','disbursing','disbursed','failed','repaid')),
  disbursement_reference text,
  repayment_schedule jsonb,
  collateral_reference text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_loans_user on public.loans(user_id);

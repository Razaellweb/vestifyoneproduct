-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text unique,
  password_hash text not null,
  full_name text,
  role text not null default 'USER',
  kyc_status text not null default 'UNVERIFIED',
  bvn text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Wallet Ledger (double-entry-like simplified)
create table if not exists wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  type text not null check (type in ('CREDIT','DEBIT')),
  amount numeric not null,
  currency text not null default 'NGN',
  balance_after numeric,
  reference text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Transactions Ledger
create table if not exists transactions_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  category text not null, -- topup, savings, investment, loan, group
  status text not null default 'PENDING',
  amount numeric not null,
  currency text not null default 'NGN',
  reference text unique,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Savings Plans
create table if not exists savings_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text not null,
  amount numeric not null,
  interval text not null, -- daily, weekly, monthly
  next_run_date date,
  status text not null default 'ACTIVE', -- ACTIVE, PAUSED, COMPLETED
  created_at timestamptz not null default now()
);

-- Investments
create table if not exists investment_products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  rate numeric not null,
  tenor_days int not null,
  min_amount numeric not null,
  max_amount numeric,
  status text not null default 'ACTIVE'
);

create table if not exists user_investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  product_id uuid references investment_products(id),
  amount numeric not null,
  status text not null default 'PENDING',
  started_at timestamptz,
  matures_at timestamptz,
  created_at timestamptz not null default now()
);

-- Loans
create table if not exists loans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  principal numeric not null,
  interest_rate numeric not null,
  status text not null default 'PENDING', -- PENDING, ACTIVE, REPAID, DEFAULTED
  collateral_locked numeric not null default 0,
  created_at timestamptz not null default now()
);

-- Groups (Ajo/Esusu)
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id),
  name text not null,
  contribution_amount numeric not null,
  cycle_days int not null,
  status text not null default 'ACTIVE',
  invite_code text unique,
  created_at timestamptz not null default now()
);

create table if not exists group_memberships (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id),
  user_id uuid references users(id),
  role text not null default 'MEMBER',
  joined_at timestamptz not null default now(),
  unique(group_id, user_id)
);

create table if not exists group_contributions (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id),
  user_id uuid references users(id),
  amount numeric not null,
  status text not null default 'SUCCESS',
  created_at timestamptz not null default now()
);

-- Referrals
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  code text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references users(id),
  referred_user_id uuid references users(id),
  status text not null default 'PENDING',
  amount numeric not null default 0,
  created_at timestamptz not null default now()
);

-- Audit logs
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Idempotency keys
create table if not exists idempotency_keys (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  actor_id uuid,
  action text,
  created_at timestamptz not null default now()
);

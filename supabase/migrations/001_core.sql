-- Core schema for Vestify One
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  bvn text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Savings
create table if not exists public.savings_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  currency text not null default 'NGN',
  created_at timestamptz default now()
);

create table if not exists public.savings_transactions (
  id uuid primary key default uuid_generate_v4(),
  account_id uuid not null references public.savings_accounts(id) on delete cascade,
  type text not null check (type in ('deposit','withdrawal')),
  amount numeric not null check (amount > 0),
  created_at timestamptz default now()
);

-- Loans
create table if not exists public.loans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric not null,
  term_months int not null,
  status text not null check (status in ('pending','approved','rejected','repaid')) default 'approved',
  created_at timestamptz default now()
);

create table if not exists public.loan_repayments (
  id uuid primary key default uuid_generate_v4(),
  loan_id uuid not null references public.loans(id) on delete cascade,
  amount numeric not null,
  paid_at timestamptz default now()
);

-- Groups (Ajo/Esusu)
create table if not exists public.groups (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  contribution_amount numeric not null,
  frequency text not null check (frequency in ('daily','weekly','monthly')),
  created_at timestamptz default now()
);

create table if not exists public.group_members (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','member')) default 'member',
  joined_at timestamptz default now(),
  unique (group_id, user_id)
);

create table if not exists public.group_contributions (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric not null,
  contributed_at timestamptz default now()
);

-- Payments
create table if not exists public.payment_intents (
  id uuid primary key default uuid_generate_v4(),
  provider text not null check (provider in ('paystack','flutterwave','stripe')),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text,
  amount numeric not null,
  status text not null check (status in ('initialized','succeeded','failed')) default 'initialized',
  created_at timestamptz default now()
);

-- Utility function: total savings balance for a user
create or replace function public.total_savings_balance(p_user_id uuid)
returns numeric language sql stable as $$
  select coalesce(sum(case when st.type = 'deposit' then st.amount else -st.amount end),0)
  from public.savings_transactions st
  join public.savings_accounts sa on sa.id = st.account_id
  where sa.user_id = p_user_id;
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.savings_accounts enable row level security;
alter table public.savings_transactions enable row level security;
alter table public.loans enable row level security;
alter table public.loan_repayments enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.group_contributions enable row level security;
alter table public.payment_intents enable row level security;

-- Basic policies (adjust as needed)
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can manage own savings accounts" on public.savings_accounts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own transactions" on public.savings_transactions for all using (
  exists (select 1 from public.savings_accounts sa where sa.id = account_id and sa.user_id = auth.uid())
) with check (
  exists (select 1 from public.savings_accounts sa where sa.id = account_id and sa.user_id = auth.uid())
);

create policy "Users can manage own loans" on public.loans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own loan repayments" on public.loan_repayments for all using (
  exists (select 1 from public.loans l where l.id = loan_id and l.user_id = auth.uid())
) with check (
  exists (select 1 from public.loans l where l.id = loan_id and l.user_id = auth.uid())
);

create policy "Members can read group" on public.groups for select using (
  exists (select 1 from public.group_members gm where gm.group_id = id and gm.user_id = auth.uid())
);
create policy "Owner can update group" on public.groups for update using (owner_id = auth.uid());

create policy "Members can manage membership" on public.group_members for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Members can manage contributions" on public.group_contributions for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users can manage own payment intents" on public.payment_intents for all using (user_id = auth.uid()) with check (user_id = auth.uid());

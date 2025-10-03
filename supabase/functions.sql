-- helper function to increment balance atomically
create or replace function public.increment_savings_balance(p_plan_id uuid, p_amount numeric)
returns void as $$
begin
  update public.savings_plans set balance = balance + p_amount, updated_at = now() where id = p_plan_id;
end;
$$ language plpgsql;

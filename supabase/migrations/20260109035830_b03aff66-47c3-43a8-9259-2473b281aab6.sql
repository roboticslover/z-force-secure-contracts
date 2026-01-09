-- Fix function search path for handle_new_user and update_updated_at_column
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (user_id, full_name, email)
    values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'User'), new.email);
    return new;
end;
$$ language plpgsql security definer set search_path = public;

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql set search_path = public;
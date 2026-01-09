-- Create role enum
create type public.app_role as enum ('admin', 'client', 'agency');

-- Create user_roles table (CRITICAL: roles stored separately for security)
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone not null default now(),
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Security definer function to check roles (prevents recursive RLS)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Profiles table
create table public.profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null unique,
    full_name text not null,
    email text not null,
    phone text,
    avatar_url text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.profiles enable row level security;

-- Organizations table (for both clients and agencies)
create table public.organizations (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    type text not null check (type in ('client', 'agency')),
    description text,
    logo_url text,
    address text,
    city text,
    state text,
    pincode text,
    phone text,
    email text,
    website text,
    license_number text,
    license_expiry date,
    is_verified boolean default false,
    verification_status text default 'pending' check (verification_status in ('pending', 'approved', 'rejected')),
    experience_years integer,
    total_guards integer,
    rating numeric(2,1) default 0,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.organizations enable row level security;

-- Client Locations table
create table public.locations (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references public.organizations(id) on delete cascade not null,
    name text not null,
    address text not null,
    city text,
    state text,
    pincode text,
    contact_person text,
    contact_phone text,
    created_at timestamp with time zone not null default now()
);

alter table public.locations enable row level security;

-- Security Requirements (posted by clients)
create table public.requirements (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references public.organizations(id) on delete cascade not null,
    location_id uuid references public.locations(id) on delete set null,
    title text not null,
    description text,
    guard_type text not null check (guard_type in ('armed', 'unarmed', 'both')),
    guards_needed integer not null,
    shift_type text not null check (shift_type in ('day', 'night', 'both', '24x7')),
    start_date date not null,
    end_date date,
    contract_duration text check (contract_duration in ('monthly', 'quarterly', 'yearly', 'custom')),
    budget_min numeric,
    budget_max numeric,
    status text default 'open' check (status in ('open', 'in_review', 'awarded', 'closed', 'cancelled')),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.requirements enable row level security;

-- Proposals (submitted by agencies)
create table public.proposals (
    id uuid primary key default gen_random_uuid(),
    requirement_id uuid references public.requirements(id) on delete cascade not null,
    agency_id uuid references public.organizations(id) on delete cascade not null,
    proposed_rate numeric not null,
    total_amount numeric not null,
    cover_letter text,
    proposed_guards integer not null,
    availability_date date not null,
    status text default 'pending' check (status in ('pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn')),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.proposals enable row level security;

-- Contracts
create table public.contracts (
    id uuid primary key default gen_random_uuid(),
    requirement_id uuid references public.requirements(id) on delete set null,
    proposal_id uuid references public.proposals(id) on delete set null,
    client_org_id uuid references public.organizations(id) on delete cascade not null,
    agency_org_id uuid references public.organizations(id) on delete cascade not null,
    contract_number text unique not null,
    title text not null,
    start_date date not null,
    end_date date not null,
    guards_count integer not null,
    monthly_rate numeric not null,
    total_value numeric not null,
    status text default 'active' check (status in ('draft', 'active', 'completed', 'terminated', 'expired')),
    terms text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.contracts enable row level security;

-- Payments (for tracking)
create table public.payments (
    id uuid primary key default gen_random_uuid(),
    contract_id uuid references public.contracts(id) on delete cascade not null,
    amount numeric not null,
    payment_date date not null,
    due_date date not null,
    status text default 'pending' check (status in ('pending', 'paid', 'overdue', 'cancelled')),
    invoice_number text,
    payment_method text,
    transaction_id text,
    notes text,
    created_at timestamp with time zone not null default now()
);

alter table public.payments enable row level security;

-- Service Categories
create table public.service_categories (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text,
    icon text,
    is_active boolean default true,
    created_at timestamp with time zone not null default now()
);

alter table public.service_categories enable row level security;

-- RLS Policies

-- User roles: users can view their own roles
create policy "Users can view own roles"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

-- Admins can manage all roles
create policy "Admins can manage roles"
on public.user_roles for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Profiles: users can manage their own profile
create policy "Users can view own profile"
on public.profiles for select
to authenticated
using (user_id = auth.uid());

create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (user_id = auth.uid());

-- Admins can view all profiles
create policy "Admins can view all profiles"
on public.profiles for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Organizations: owners can manage, all authenticated can view verified
create policy "Users can manage own organization"
on public.organizations for all
to authenticated
using (user_id = auth.uid());

create policy "Authenticated can view verified organizations"
on public.organizations for select
to authenticated
using (is_verified = true or user_id = auth.uid());

create policy "Admins can manage all organizations"
on public.organizations for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Locations: org owners can manage
create policy "Org owners can manage locations"
on public.locations for all
to authenticated
using (
    exists (
        select 1 from public.organizations
        where id = locations.organization_id
        and user_id = auth.uid()
    )
);

-- Requirements: clients can manage their own, agencies can view open ones
create policy "Clients can manage own requirements"
on public.requirements for all
to authenticated
using (
    exists (
        select 1 from public.organizations
        where id = requirements.organization_id
        and user_id = auth.uid()
    )
);

create policy "Agencies can view open requirements"
on public.requirements for select
to authenticated
using (
    status = 'open' and public.has_role(auth.uid(), 'agency')
);

create policy "Admins can manage all requirements"
on public.requirements for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Proposals: agencies can manage their own, clients can view for their requirements
create policy "Agencies can manage own proposals"
on public.proposals for all
to authenticated
using (
    exists (
        select 1 from public.organizations
        where id = proposals.agency_id
        and user_id = auth.uid()
    )
);

create policy "Clients can view proposals for their requirements"
on public.proposals for select
to authenticated
using (
    exists (
        select 1 from public.requirements r
        join public.organizations o on r.organization_id = o.id
        where r.id = proposals.requirement_id
        and o.user_id = auth.uid()
    )
);

-- Contracts: participants can view
create policy "Contract participants can view"
on public.contracts for select
to authenticated
using (
    exists (
        select 1 from public.organizations
        where (id = contracts.client_org_id or id = contracts.agency_org_id)
        and user_id = auth.uid()
    )
);

create policy "Admins can manage all contracts"
on public.contracts for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Payments: contract participants can view
create policy "Contract participants can view payments"
on public.payments for select
to authenticated
using (
    exists (
        select 1 from public.contracts c
        join public.organizations o on (c.client_org_id = o.id or c.agency_org_id = o.id)
        where c.id = payments.contract_id
        and o.user_id = auth.uid()
    )
);

create policy "Admins can manage all payments"
on public.payments for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Service categories: public read, admin write
create policy "Anyone can view active categories"
on public.service_categories for select
using (is_active = true);

create policy "Admins can manage categories"
on public.service_categories for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Insert default service categories
insert into public.service_categories (name, description, icon) values
('Residential Security', 'Guards for housing societies, apartments, and gated communities', 'home'),
('Commercial Security', 'Security for offices, malls, and commercial buildings', 'building'),
('Industrial Security', 'Warehouse, factory, and industrial facility protection', 'factory'),
('Educational Security', 'Schools, colleges, and educational institution security', 'graduation-cap'),
('Healthcare Security', 'Hospital and healthcare facility security', 'heart-pulse'),
('Event Security', 'Temporary security for events and gatherings', 'calendar'),
('Retail Security', 'Store, showroom, and retail outlet security', 'shopping-bag'),
('VIP Protection', 'Personal security and executive protection', 'shield');

-- Updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger update_profiles_updated_at before update on public.profiles
for each row execute function public.update_updated_at_column();

create trigger update_organizations_updated_at before update on public.organizations
for each row execute function public.update_updated_at_column();

create trigger update_requirements_updated_at before update on public.requirements
for each row execute function public.update_updated_at_column();

create trigger update_proposals_updated_at before update on public.proposals
for each row execute function public.update_updated_at_column();

create trigger update_contracts_updated_at before update on public.contracts
for each row execute function public.update_updated_at_column();

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (user_id, full_name, email)
    values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'User'), new.email);
    return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger for new user signup
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
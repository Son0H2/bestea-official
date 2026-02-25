-- =====================================================
-- Bestea - Initial Database Schema
-- Supabase PostgreSQL + RLS (Row Level Security)
-- =====================================================

-- 1. 프로필 테이블 (Supabase Auth 와 연동)
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text not null,
  full_name text null,
  phone text null,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- 2. 상품 테이블
create table public.products (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  original_price integer null,
  discount integer null,
  category text not null,
  description text null,
  images text[] null,
  details jsonb null,
  stock integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- 3. 장바구니
create table public.cart_items (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(user_id, product_id)
);

-- 4. 주문
create table public.orders (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id),
  order_number text not null unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount integer not null,
  shipping_address jsonb not null,
  payment_method text null,
  paid_at timestamp with time zone null,
  shipped_at timestamp with time zone null,
  delivered_at timestamp with time zone null,
  cancelled_at timestamp with time zone null,
  created_at timestamp with time zone not null default now()
);

-- 5. 주문 항목
create table public.order_items (
  id uuid not null default gen_random_uuid() primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null,
  price integer not null,
  created_at timestamp with time zone not null default now()
);

-- 6. 견적 요청 (리폼/AI 견적)
create table public.quote_requests (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  image_url text not null,
  service_types text[] not null,
  description text null,
  ai_analysis jsonb null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'quoted', 'completed', 'cancelled')),
  estimated_price_min integer null,
  estimated_price_max integer null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.quote_requests enable row level security;

-- Profiles: Users can view/update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Products: Public read, admin write
create policy "Public can view products" on public.products
  for select using (true);
create policy "Admin can modify products" on public.products
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Cart: Users can only access their own cart
create policy "Users can access own cart" on public.cart_items
  for all using (auth.uid() = user_id);

-- Orders: Users can view their own orders
create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Users can create own orders" on public.orders
  for insert with check (auth.uid() = user_id);
create policy "Admin can view all orders" on public.orders
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Order Items: Same as orders
create policy "Users can view own order items" on public.order_items
  for select using (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );
create policy "Users can create own order items" on public.order_items
  for insert with check (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

-- Quotes: Users can view their own quotes
create policy "Users can view own quotes" on public.quote_requests
  for select using (auth.uid() = user_id or user_id is null);
create policy "Users can create quotes" on public.quote_requests
  for insert with check (auth.uid() = user_id or user_id is null);
create policy "Admin can view all quotes" on public.quote_requests
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- =====================================================
-- Functions & Triggers
-- =====================================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_products_updated_at before update on public.products
  for each row execute procedure public.update_updated_at_column();

create trigger update_cart_items_updated_at before update on public.cart_items
  for each row execute procedure public.update_updated_at_column();

create trigger update_quote_requests_updated_at before update on public.quote_requests
  for each row execute procedure public.update_updated_at_column();

-- =====================================================
-- Mock Data (Products)
-- =====================================================

insert into public.products (name, price, original_price, discount, category, description, images, details, stock) values
  (
    '밀라노 천연가죽 4 인 소파',
    1299000,
    1732000,
    25,
    '소파',
    '이태리 최상급 천연가죽을 사용하여 부드러운 촉감과 내구성을 자랑합니다.',
    array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200'],
    '{"material": "이태리 천연 면피 가죽", "size": "W 2800 x D 1000 x H 900 (mm)"}'::jsonb,
    10
  ),
  (
    '로마 원목 6 인 식탁 세트',
    899000,
    1200000,
    25,
    '테이블',
    '북미산 월넛 원목을 사용하여 고급스러운 무늬와 단단한 내구성을 가집니다.',
    array['https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=1200'],
    '{"material": "북미산 월넛 원목", "size": "W 1800 x D 800 x H 750 (mm)"}'::jsonb,
    5
  ),
  (
    '베니스 호텔형 침대 프레임',
    1599000,
    1777000,
    10,
    '침대',
    '고급스러운 호텔식 침대 프레임입니다.',
    array['https://images.unsplash.com/photo-1505693314120-0d4438699d9e?q=80&w=1200'],
    '{"material": "원목", "size": "Q 1530 x L 2030 x H 1200 (mm)"}'::jsonb,
    3
  );

-- =====================================================
-- Indexes (Performance)
-- =====================================================

create index idx_products_category on public.products(category);
create index idx_products_active on public.products(is_active);
create index idx_cart_items_user on public.cart_items(user_id);
create index idx_orders_user on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_quote_requests_user on public.quote_requests(user_id);
create index idx_quote_requests_status on public.quote_requests(status);

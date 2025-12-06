-- Create products table
create table public.products (
  id uuid not null default gen_random_uuid (),
  name text not null,
  price integer not null,
  original_price integer null,
  discount integer null,
  category text not null,
  description text null,
  images text[] null,
  details jsonb null,
  stock integer not null default 0,
  created_at timestamp with time zone not null default now(),
  constraint products_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy to allow public read access
create policy "Enable read access for all users" on public.products
  for select using (true);

-- Create policy to allow authenticated users (admin) to insert/update/delete
-- For now, we'll allow all operations for authenticated users, or just leave it read-only for public
-- Adjust this policy based on actual auth setup
create policy "Enable insert for authenticated users only" on public.products
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.products
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.products
  for delete using (auth.role() = 'authenticated');

-- Insert some mock data
insert into public.products (name, price, original_price, discount, category, description, images, details, stock)
values
  (
    '밀라노 천연가죽 4인 소파',
    1299000,
    1732000,
    25,
    '소파',
    '이태리 최상급 천연가죽을 사용하여 부드러운 촉감과 내구성을 자랑합니다. 모던한 디자인으로 어떤 거실에도 잘 어울리며, 편안한 착석감을 제공합니다.',
    array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=1200&auto=format&fit=crop'],
    '{"material": "이태리 천연 면피 가죽 (Top Grain)", "size": "W 2800 x D 1000 x H 900 (mm)", "color": "Camel, Dark Brown, Ivory", "origin": "Made in Korea (Bestea Factory)"}'::jsonb,
    10
  ),
  (
    '로마 원목 6인 식탁 세트',
    899000,
    1200000,
    25,
    '테이블',
    '북미산 월넛 원목을 사용하여 고급스러운 무늬와 단단한 내구성을 가집니다. 6인 가족이 넉넉하게 사용할 수 있는 사이즈입니다.',
    array['https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=1200&auto=format&fit=crop'],
    '{"material": "북미산 월넛 원목", "size": "W 1800 x D 800 x H 750 (mm)", "color": "Walnut", "origin": "Made in Korea (Bestea Factory)"}'::jsonb,
    5
  );

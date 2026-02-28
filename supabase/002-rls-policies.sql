-- =====================================================
-- Bestea - Row Level Security (RLS) 강화
-- 관리자 권한 및 추가 보안 정책
-- =====================================================

-- 실행 방법:
-- 1. Supabase Dashboard → SQL Editor
-- 2. 아래 SQL 붙여넣기 → Run
-- =====================================================

-- 1. 관리자 전용 정책 - products 테이블
create policy "Admins can insert products" on public.products
  for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update products" on public.products
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete products" on public.products
  for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 2. 관리자 전용 정책 - orders 테이블 (조회만 모든 사용자, 수정은 관리자)
create policy "Admins can update orders" on public.orders
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete orders" on public.orders
  for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 3. quote_requests - 관리자만 조회/수정 가능
create policy "Admins can view all quotes" on public.quote_requests
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all quotes" on public.quote_requests
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 사용자는 자신의 견적만 조회
create policy "Users can view own quotes" on public.quote_requests
  for select
  using (auth.uid() = user_id);

-- 사용자는 자신의 견적만 생성
create policy "Users can create own quotes" on public.quote_requests
  for insert
  with check (auth.uid() = user_id);

-- 4. cart_items - 본인 장바구니만 접근
create policy "Users can view own cart" on public.cart_items
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own cart" on public.cart_items
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart" on public.cart_items
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own cart" on public.cart_items
  for delete
  using (auth.uid() = user_id);

-- 5. order_items - 주문 항목 (주문과 동일 권한)
create policy "Users can view own order items" on public.order_items
  for select
  using (
    exists (
      select 1 from public.orders
      where id = order_items.order_id and user_id = auth.uid()
    )
    or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can insert order items" on public.order_items
  for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 6. profiles - 관리자만 다른 사용자 프로필 조회 가능
-- 참고: 미들웨어에서 role 확인을 위해 "본인 프로필 조회"는 허용해야 함
create policy "Admins can view all profiles" on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- (중요) 로그인 사용자는 본인 프로필(특히 role)만 조회 가능
create policy "Users can view own profile" on public.profiles
  for select
  using (auth.uid() = id);

create policy "Admins can update all profiles" on public.profiles
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- =====================================================
-- 관리자 사용자 추가 방법
-- =====================================================
-- Supabase Dashboard → Authentication → Users
-- 관리자 만들 사용자의 user_id 를 복사하여 아래 SQL 실행:
--
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = '사용자 UUID';
-- =====================================================

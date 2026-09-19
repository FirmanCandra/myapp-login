-- =========================================================
-- OmniLedger AI — Supabase Database Migration Schema
-- =========================================================

-- 1. Profiles Table (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT DEFAULT 'My Business',
  currency TEXT DEFAULT 'IDR',
  industry TEXT DEFAULT 'Digital & Tech',
  starting_cash NUMERIC DEFAULT 150000000,
  monthly_revenue_target NUMERIC DEFAULT 50000000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);


-- 2. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  payment_method TEXT DEFAULT 'Bank Transfer',
  receipt_url TEXT,
  merchant TEXT,
  tax NUMERIC DEFAULT 0,
  notes TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" 
ON transactions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" 
ON transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" 
ON transactions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" 
ON transactions FOR DELETE 
USING (auth.uid() = user_id);


-- 3. Scenarios Table (Saved Simulation Configurations)
CREATE TABLE IF NOT EXISTS scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  revenue_delta NUMERIC DEFAULT 0,
  opex_delta NUMERIC DEFAULT 0,
  headcount_cost NUMERIC DEFAULT 0,
  capex_cost NUMERIC DEFAULT 0,
  capex_month INTEGER DEFAULT 1,
  capital_injection NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scenarios" 
ON scenarios FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scenarios" 
ON scenarios FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scenarios" 
ON scenarios FOR DELETE 
USING (auth.uid() = user_id);


-- 4. Receipts Table (OCR / Scanned data history)
CREATE TABLE IF NOT EXISTS receipts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  merchant_name TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  tax_amount NUMERIC DEFAULT 0,
  date DATE NOT NULL,
  category TEXT,
  confidence_score NUMERIC DEFAULT 0.95,
  items_json JSONB DEFAULT '[]'::jsonb,
  raw_image_url TEXT,
  status TEXT DEFAULT 'processed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own receipts" 
ON receipts FOR ALL 
USING (auth.uid() = user_id);

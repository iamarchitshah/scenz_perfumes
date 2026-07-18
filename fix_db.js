const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Scenz%40009ias@db.grdrbhvpusxjulyizwvh.supabase.co:5432/postgres',
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to Supabase DB!");

    const sql = `
      -- 1. Confirm any currently trapped users instantly
      UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;
      
      -- 2. Create a bypass trigger to automatically confirm all FUTURE users
      CREATE OR REPLACE FUNCTION public.auto_confirm_user()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.email_confirmed_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS auto_confirm_user_trigger ON auth.users;
      CREATE TRIGGER auto_confirm_user_trigger
        BEFORE INSERT ON auth.users
        FOR EACH ROW
        EXECUTE PROCEDURE public.auto_confirm_user();

      -- 3. Set up the Profiles tracking table and link it to Auth.Users
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        full_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
      );

      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.profiles (id, full_name, role)
        VALUES (
          new.id, 
          new.raw_user_meta_data->>'full_name',
          COALESCE(new.raw_user_meta_data->>'role', 'user')
        );
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

      -- 4. Enable viewing order history
      ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
      ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
    `;

    await client.query(sql);
    console.log("✅ Successfully auto-confirmed users and provisioned authentication backend!");
  } catch (err) {
    console.error("Database Error:", err);
  } finally {
    await client.end();
  }
}

run();

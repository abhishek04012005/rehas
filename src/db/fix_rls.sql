-- Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'whatsapp_clicks';

-- Drop restrictive policy
DROP POLICY IF EXISTS "Allow select for authenticated users" ON whatsapp_clicks;

-- Create permissive select policy
CREATE POLICY "Allow select for all" ON whatsapp_clicks FOR SELECT USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'whatsapp_clicks';


CREATE OR REPLACE FUNCTION public.verify_password(plain text, hashed text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT hashed = extensions.crypt(plain, hashed);
$$;


CREATE TABLE IF NOT EXISTS staff_login (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE staff_login ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_check_login" ON staff_login FOR SELECT
  TO anon, authenticated USING (true);

INSERT INTO staff_login (username, password_hash)
VALUES ('SMPteam#1', crypt('SMPdashboard2026', gen_salt('bf')))
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;

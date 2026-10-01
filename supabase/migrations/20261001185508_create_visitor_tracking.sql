/*
# Visitor Tracking for SMP Dashboard

## Purpose
Creates a table to log every website visit with geolocation data, so SMP staff can see how many visits the site gets and where visitors are located.

## New Tables
- `website_visits`
  - `id` (uuid, primary key)
  - `created_at` (timestamptz, when the visit occurred)
  - `country` (text, visitor's country)
  - `region` (text, visitor's region/state)
  - `city` (text, visitor's city)
  - `path` (text, page path visited, defaults to '/')
  - `user_agent` (text, browser/device info)

## Security
- RLS enabled on `website_visits`.
- INSERT: allowed for anon + authenticated (any visitor can log their visit).
- SELECT: restricted to authenticated only (only logged-in staff can view stats).
- No UPDATE or DELETE policies (visits are append-only).
*/

CREATE TABLE IF NOT EXISTS website_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  country text,
  region text,
  city text,
  path text DEFAULT '/',
  user_agent text
);

ALTER TABLE website_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_can_log_visit" ON website_visits;
CREATE POLICY "anon_can_log_visit" ON website_visits
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "staff_can_view_visits" ON website_visits;
CREATE POLICY "staff_can_view_visits" ON website_visits
  FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_website_visits_created_at ON website_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_visits_country ON website_visits (country);

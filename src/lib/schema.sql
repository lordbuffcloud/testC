CREATE TABLE IF NOT EXISTS decks (
  id text PRIMARY KEY,
  key text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cards (
  id text PRIMARY KEY,
  deck_key text NOT NULL REFERENCES decks(key) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

INSERT INTO decks (id, key, name) VALUES
  ('deck-patrol', 'patrol', 'Patrol'),
  ('deck-ec', 'ec', 'EC'),
  ('deck-bdoc', 'bdoc', 'BDOC')
ON CONFLICT (key) DO NOTHING;

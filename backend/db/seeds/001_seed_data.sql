BEGIN;

-- Mot de passe : admin123
INSERT INTO users (email, password_hash, nom)
VALUES ('admin@etu.mg', '$2b$10$JOvI.ogtCzSdgWcPSTNyAeYH1lb1Zz74qHG1TjOUVjylRf/EzZdFa', 'Administrateur')
ON CONFLICT (email) DO NOTHING;

INSERT INTO students (nom, prenom, email, filiere)
VALUES
  ('Rakoto', 'Jean', 'jean.rakoto@etu.mg', 'Informatique'),
  ('Rasoa', 'Marie', 'marie.rasoa@etu.mg', 'Mathématiques'),
  ('Randria', 'Paul', 'paul.randria@etu.mg', 'Physique')
ON CONFLICT (email) DO NOTHING;

COMMIT;

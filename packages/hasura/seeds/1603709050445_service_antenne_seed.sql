INSERT INTO public.service_antenne (id, service_id, name, created_at, address_street, address_zip_code, address_city, contact_lastname, contact_firstname, contact_email, contact_phone, mesures_awaiting, mesures_in_progress, mesures_max, address, latitude, longitude) VALUES (242, 57, 'ATFPO PARIS EST (3;4;11;12;19;20)', '2020-01-13 07:54:03.989521+00', '4 square Georges Lesage', '75012', 'Paris', NULL, NULL, NULL, NULL, 0, 350, 350, '4 Square Georges Lesage 75012 Paris', 48.8465004, 2.36783004);
INSERT INTO public.service_antenne (id, service_id, name, created_at, address_street, address_zip_code, address_city, contact_lastname, contact_firstname, contact_email, contact_phone, mesures_awaiting, mesures_in_progress, mesures_max, address, latitude, longitude) VALUES (247, 57, 'PARIS OUEST (14;15;16;6;7)', '2020-01-13 12:57:56.829835+00', '33 rue Rémy Dumoncel', '75014', 'Paris', NULL, NULL, NULL, NULL, 0, 255, 350, '33 Rue Rémy Dumoncel 75014 Paris', 48.8296013, 2.3305099);
INSERT INTO public.service_antenne (id, service_id, name, created_at, address_street, address_zip_code, address_city, contact_lastname, contact_firstname, contact_email, contact_phone, mesures_awaiting, mesures_in_progress, mesures_max, address, latitude, longitude) VALUES (240, 57, 'ATFPO PARIS SUD (13; 14; 5)', '2020-01-13 07:54:03.989521+00', '35 rue Daviel', '75013', 'Paris', NULL, NULL, NULL, NULL, 0, 310, 325, '35 Rue Daviel 75013 Paris', 48.8283005, 2.34348989);
INSERT INTO public.service_antenne (id, service_id, name, created_at, address_street, address_zip_code, address_city, contact_lastname, contact_firstname, contact_email, contact_phone, mesures_awaiting, mesures_in_progress, mesures_max, address, latitude, longitude) VALUES (241, 57, 'ATFPO PARIS NORD (1;2;8;9;10;17;18)', '2020-01-13 07:54:03.989521+00', '3 rue Émile level', '75017', 'Paris', NULL, NULL, NULL, NULL, 0, 259, 320, '3 Rue Emile Level 75017 Paris', 48.8925018, 2.31772995);
SELECT pg_catalog.setval('public.service_antenne_id_seq', 255, true);
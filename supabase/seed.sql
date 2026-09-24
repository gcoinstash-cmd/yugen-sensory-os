-- YŪGEN SENSORY OS — Mock Production Seed Records

INSERT INTO public.sensory_courses (course_number, title, romanized_name, category, olfactory_profile, temperature, wine_sake_pairing) VALUES
(1, 'Otoro with 25-Year Smoked Shoyu', 'Chūtoro & Ōtoro Nigiri', 'nigiri', 'Cold-pressed yuzu zest, toasted nori oil, binchotan smoke', 'Shari 37°C / Fish 16°C', 'Kokuryu "Black Dragon" Daiginjo'),
(2, 'Hokkaido Sea Urchin & White Truffle', 'Ezo Bafun Uni Gunkan', 'nigiri', 'Ocean brine, sweet cream, Alba white truffle shavings', 'Room Temperature', 'Born "Gold" Muroka Junmai Daiginjo'),
(3, 'A5 Miyazaki Wagyu Nigiri', 'Miyazakigyu Sirloin Torched', 'nigiri', 'Rendered umami fat, Tasmanian pepper berry, aged tare', 'Warm 42°C', 'Kenbishi "Mizuho" Yamahai Junmai'),
(4, 'Blackthroat Seaperch over Cedar Needle', 'Nodoguro Aburi', 'composition', 'Smoked cedar, flame-kissed fat, sudachi lime spritz', 'Charred Warm', 'Isojiman Junmai Daiginjo'),
(5, 'Ceremonial Stone-Ground Matcha & Warabi Mochi', 'Kyoto Matcha Finale', 'pairing', 'Roasted genmaicha, kuromitsu molasses, wild kinako', 'Chilled', 'Iced Rare Gyokuro Dew');

INSERT INTO public.reservations (guest_name, email, phone, date, time_slot, guests_count, experience_tier, caviar_assortment, private_sommelier, special_requests, estimated_total, status) VALUES
('Dr. Kenji Takahashi', 'kenji.takahashi@tokyo-health.org', '+1 (310) 555-0198', CURRENT_DATE, '18:00', 2, 'tier-exclusive', true, true, 'Celebrating milestone medical fellowship appointment', 950.00, 'confirmed'),
('Elena Rostova', 'e.rostova@rostova-design.com', '+1 (415) 555-0144', CURRENT_DATE + 1, '20:30', 8, 'tier-buyout', true, true, 'Full salon reservation. Severe crustacean allergy on seat 4', 3800.00, 'mise-en-place'),
('Julian & Marc Vance', 'julian@vancecapital.vc', '+1 (212) 555-0122', CURRENT_DATE + 2, '18:00', 4, 'tier-signature', false, false, 'Prefer corner vantage adjacent to shari station', 1600.00, 'confirmed');

INSERT INTO public.buyout_inquiries (host_name, organization, email, phone, target_date, guest_capacity, budget_range, custom_curation_notes, status) VALUES
('Sovereign Heritage Trust', 'Sovereign Heritage Family Office', 'events@sovereign-heritage.ch', '+41 22 555 0100', CURRENT_DATE + 14, 12, '$6,000 - $10,000', 'Private closing dinner for cross-border asset purchase agreement. Require dedicated sake sommelier.', 'contract_issued');

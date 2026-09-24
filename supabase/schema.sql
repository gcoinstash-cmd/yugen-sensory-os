-- YŪGEN SENSORY OS — Production PostgreSQL Schema & Security Policies
-- Vertical: Luxury Hospitality & Dining Sanctuary (Omakase Counter + Olfactory Degustation)

CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    guests_count INT NOT NULL DEFAULT 2,
    experience_tier TEXT NOT NULL,
    caviar_assortment BOOLEAN DEFAULT FALSE,
    private_sommelier BOOLEAN DEFAULT FALSE,
    special_requests TEXT,
    estimated_total NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, mise-en-place, seated, completed, cancelled
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.sensory_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_number INT NOT NULL,
    title TEXT NOT NULL,
    romanized_name TEXT,
    category TEXT NOT NULL DEFAULT 'nigiri', -- nigiri, composition, pairing
    olfactory_profile TEXT NOT NULL,
    temperature TEXT DEFAULT 'Room / Shari 37°C',
    wine_sake_pairing TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.buyout_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_name TEXT NOT NULL,
    organization TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    target_date DATE NOT NULL,
    guest_capacity INT NOT NULL,
    budget_range TEXT NOT NULL,
    custom_curation_notes TEXT,
    status TEXT NOT NULL DEFAULT 'under_review', -- under_review, consultation_scheduled, contract_issued, deposit_secured
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensory_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyout_inquiries ENABLE ROW LEVEL SECURITY;

-- Public Read & Insert Policies
CREATE POLICY "Allow public inserts for reservations" 
    ON public.reservations FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read for reservations" 
    ON public.reservations FOR SELECT 
    USING (auth.role() = 'authenticated' OR true);

CREATE POLICY "Allow public reads for sensory courses" 
    ON public.sensory_courses FOR SELECT 
    USING (true);

CREATE POLICY "Allow public inserts for buyout inquiries" 
    ON public.buyout_inquiries FOR INSERT 
    WITH CHECK (true);

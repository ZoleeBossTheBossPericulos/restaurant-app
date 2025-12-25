-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description JSONB NOT NULL DEFAULT '{"ro": "", "en": "", "hu": ""}',
  story JSONB NOT NULL DEFAULT '{"ro": "", "en": "", "hu": ""}',
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  opening_hours JSONB,
  logo_url TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create restaurant_images table for photo gallery
CREATE TABLE IF NOT EXISTS restaurant_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text JSONB DEFAULT '{"ro": "", "en": "", "hu": ""}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name JSONB NOT NULL DEFAULT '{"ro": "", "en": "", "hu": ""}',
  description JSONB DEFAULT '{"ro": "", "en": "", "hu": ""}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name JSONB NOT NULL DEFAULT '{"ro": "", "en": "", "hu": ""}',
  description JSONB DEFAULT '{"ro": "", "en": "", "hu": ""}',
  ingredients JSONB DEFAULT '{"ro": [], "en": [], "hu": []}',
  allergens TEXT[] DEFAULT '{}',
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'RON',
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON restaurants(slug);
CREATE INDEX IF NOT EXISTS idx_restaurant_images_restaurant_id ON restaurant_images(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_categories_restaurant_id ON menu_categories(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant_id ON menu_items(restaurant_id);

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication needed for viewing menus)
CREATE POLICY "Allow public read access to restaurants"
  ON restaurants FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to restaurant_images"
  ON restaurant_images FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to menu_categories"
  ON menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to menu_items"
  ON menu_items FOR SELECT
  USING (true);

-- For future admin functionality, we'll add INSERT/UPDATE/DELETE policies
-- For now, these tables can be managed via Supabase dashboard or direct SQL

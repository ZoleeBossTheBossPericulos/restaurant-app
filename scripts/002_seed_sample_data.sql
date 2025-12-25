-- Insert sample restaurants
INSERT INTO restaurants (slug, name, description, story, phone, email, address, city, country, opening_hours, cover_image_url)
VALUES 
(
  'buffalo-restaurant',
  'Buffalo Restaurant',
  '{"ro": "Restaurantul Buffalo oferă o experiență culinară autentică cu preparate tradiționale și moderne.", "en": "Buffalo Restaurant offers an authentic culinary experience with traditional and modern dishes.", "hu": "A Buffalo Étterem autentikus kulináris élményt kínál hagyományos és modern ételekkel."}',
  '{"ro": "Fondat în 2010, Buffalo Restaurant a devenit rapid unul dintre cele mai iubite restaurante din oraș. Pasiunea noastră pentru gastronomie și dedicarea pentru calitate ne-au ajutat să creăm o experiență culinară unică. Folosim doar ingrediente proaspete, locale și preparăm fiecare fel de mâncare cu atenție și dragoste.", "en": "Founded in 2010, Buffalo Restaurant quickly became one of the most beloved restaurants in the city. Our passion for gastronomy and dedication to quality have helped us create a unique culinary experience. We use only fresh, local ingredients and prepare each dish with care and love.", "hu": "2010-ben alapítva a Buffalo Étterem gyorsan a város egyik legkedveltebb éttermévé vált. A gasztronómia iránti szenvedélyünk és a minőség iránti elkötelezettségünk segített egyedi kulináris élményt teremteni. Csak friss, helyi alapanyagokat használunk, és minden ételt gondosan és szeretettel készítünk el."}',
  '+40 123 456 789',
  'contact@buffalo-restaurant.ro',
  'Strada Principală 123',
  'Cluj-Napoca',
  'România',
  '{"monday": {"open": "12:00", "close": "23:00"}, "tuesday": {"open": "12:00", "close": "23:00"}, "wednesday": {"open": "12:00", "close": "23:00"}, "thursday": {"open": "12:00", "close": "23:00"}, "friday": {"open": "12:00", "close": "00:00"}, "saturday": {"open": "12:00", "close": "00:00"}, "sunday": {"open": "12:00", "close": "22:00"}}',
  '/placeholder.svg?height=800&width=1200'
),
(
  'chicago-restaurant',
  'Chicago Restaurant',
  '{"ro": "Chicago Restaurant vă invită să descoperiți bucătăria americană autentică în inima orașului.", "en": "Chicago Restaurant invites you to discover authentic American cuisine in the heart of the city.", "hu": "A Chicago Étterem meghívja Önt, hogy fedezze fel az autentikus amerikai konyhát a város szívében."}',
  '{"ro": "Inspirat de vibranta scenă culinară din Chicago, restaurantul nostru aduce spiritul american în România. De la burgeri suculenți la coastele noastre emblematice, fiecare preparat reflectă pasiunea noastră pentru mâncare bună și atmosfera caldă.", "en": "Inspired by Chicago''s vibrant culinary scene, our restaurant brings the American spirit to Romania. From juicy burgers to our signature ribs, each dish reflects our passion for great food and warm atmosphere.", "hu": "Chicago élénk kulináris színterétől inspirálva éttermünk az amerikai szellemet hozza Romániába. A szaftos burgerektől a jellegzetes bordáinkig minden étel tükrözi a nagyszerű ételek és a meleg légkör iránti szenvedélyünket."}',
  '+40 987 654 321',
  'info@chicago-restaurant.ro',
  'Bulevardul Central 45',
  'București',
  'România',
  '{"monday": {"open": "11:00", "close": "23:00"}, "tuesday": {"open": "11:00", "close": "23:00"}, "wednesday": {"open": "11:00", "close": "23:00"}, "thursday": {"open": "11:00", "close": "23:00"}, "friday": {"open": "11:00", "close": "01:00"}, "saturday": {"open": "11:00", "close": "01:00"}, "sunday": {"open": "11:00", "close": "23:00"}}',
  '/placeholder.svg?height=800&width=1200'
);

-- Get restaurant IDs for reference
DO $$
DECLARE
  buffalo_id UUID;
  chicago_id UUID;
  appetizers_buffalo UUID;
  mains_buffalo UUID;
  desserts_buffalo UUID;
  appetizers_chicago UUID;
  mains_chicago UUID;
BEGIN
  -- Get restaurant IDs
  SELECT id INTO buffalo_id FROM restaurants WHERE slug = 'buffalo-restaurant';
  SELECT id INTO chicago_id FROM restaurants WHERE slug = 'chicago-restaurant';

  -- Insert menu categories for Buffalo Restaurant
  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Aperitive", "en": "Appetizers", "hu": "Előételek"}', '{"ro": "Începeți mesele cu deliciile noastre", "en": "Start your meal with our delights", "hu": "Kezdje étkezését finomságainkkal"}', 1)
  RETURNING id INTO appetizers_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Feluri Principale", "en": "Main Courses", "hu": "Főételek"}', '{"ro": "Preparate principale care vă vor încânta", "en": "Main dishes that will delight you", "hu": "Főételek, amelyek el fogják ragadtatni"}', 2)
  RETURNING id INTO mains_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Deserturi", "en": "Desserts", "hu": "Desszertek"}', '{"ro": "Finalizați cu ceva dulce", "en": "Finish with something sweet", "hu": "Fejezze be valami édessel"}', 3)
  RETURNING id INTO desserts_buffalo;

  -- Insert menu items for Buffalo Restaurant
  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (appetizers_buffalo, buffalo_id, 
   '{"ro": "Bruschetta Clasică", "en": "Classic Bruschetta", "hu": "Klasszikus Bruschetta"}',
   '{"ro": "Pâine prăjită cu roșii proaspete, busuioc și usturoi", "en": "Toasted bread with fresh tomatoes, basil and garlic", "hu": "Pirított kenyér friss paradicsommal, bazsalikommal és fokhagymával"}',
   '{"ro": ["pâine", "roșii", "busuioc", "usturoi", "ulei de măsline"], "en": ["bread", "tomatoes", "basil", "garlic", "olive oil"], "hu": ["kenyér", "paradicsom", "bazsalikom", "fokhagyma", "olívaolaj"]}',
   ARRAY['gluten'],
   28.00,
   '/placeholder.svg?height=400&width=600',
   true, true, false, 1),
  
  (appetizers_buffalo, buffalo_id,
   '{"ro": "Aripioare Buffalo", "en": "Buffalo Wings", "hu": "Buffalo Szárnyak"}',
   '{"ro": "Aripioare de pui picante cu sos ranch", "en": "Spicy chicken wings with ranch sauce", "hu": "Csípős csirkeszárnyak ranch szósszal"}',
   '{"ro": ["aripioare de pui", "sos buffalo", "sos ranch", "țelină"], "en": ["chicken wings", "buffalo sauce", "ranch sauce", "celery"], "hu": ["csirkeszárnyak", "buffalo szósz", "ranch szósz", "zeller"]}',
   ARRAY['milk', 'celery'],
   42.00,
   '/placeholder.svg?height=400&width=600',
   false, false, true, 2);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (mains_buffalo, buffalo_id,
   '{"ro": "Steak de Vită Premium", "en": "Premium Beef Steak", "hu": "Prémium Marhasteak"}',
   '{"ro": "Steak de vită Angus 300g, cu cartofi și legume", "en": "300g Angus beef steak with potatoes and vegetables", "hu": "300g Angus marhasteak burgonyával és zöldségekkel"}',
   '{"ro": ["carne de vită Angus", "cartofi", "morcov", "fasole verde", "unt"], "en": ["Angus beef", "potatoes", "carrot", "green beans", "butter"], "hu": ["Angus marha", "burgonya", "sárgarépa", "zöldbab", "vaj"]}',
   ARRAY['milk'],
   89.00,
   '/placeholder.svg?height=400&width=600',
   false, false, true, 1),
  
  (mains_buffalo, buffalo_id,
   '{"ro": "Paste Carbonara", "en": "Carbonara Pasta", "hu": "Carbonara Tészta"}',
   '{"ro": "Paste cu bacon, ou, parmezan și piper negru", "en": "Pasta with bacon, egg, parmesan and black pepper", "hu": "Tészta szalonnával, tojással, parmezánnal és fekete borssal"}',
   '{"ro": ["paste", "bacon", "ou", "parmezan", "smântână", "piper"], "en": ["pasta", "bacon", "egg", "parmesan", "cream", "pepper"], "hu": ["tészta", "szalonna", "tojás", "parmezán", "tejszín", "bors"]}',
   ARRAY['gluten', 'eggs', 'milk'],
   54.00,
   '/placeholder.svg?height=400&width=600',
   false, false, false, 2),
  
  (mains_buffalo, buffalo_id,
   '{"ro": "Salată Caesar Vegetariană", "en": "Vegetarian Caesar Salad", "hu": "Vegetáriánus Caesar Saláta"}',
   '{"ro": "Salată verde cu parmezan, crutoane și dressing Caesar", "en": "Green salad with parmesan, croutons and Caesar dressing", "hu": "Zöld saláta parmezánnal, krutonommal és Caesar öntettel"}',
   '{"ro": ["salată verde", "parmezan", "crutoane", "dressing Caesar", "roșii cherry"], "en": ["lettuce", "parmesan", "croutons", "Caesar dressing", "cherry tomatoes"], "hu": ["saláta", "parmezán", "kruton", "Caesar öntet", "koktélparadicsom"]}',
   ARRAY['gluten', 'milk', 'eggs'],
   38.00,
   '/placeholder.svg?height=400&width=600',
   true, false, false, 3);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (desserts_buffalo, buffalo_id,
   '{"ro": "Tiramisu Clasic", "en": "Classic Tiramisu", "hu": "Klasszikus Tiramisu"}',
   '{"ro": "Desert italian cu mascarpone, cafea și cacao", "en": "Italian dessert with mascarpone, coffee and cocoa", "hu": "Olasz desszert mascarponeval, kávéval és kakaóval"}',
   '{"ro": ["mascarpone", "pișcoturi", "cafea", "cacao", "ou"], "en": ["mascarpone", "ladyfingers", "coffee", "cocoa", "egg"], "hu": ["mascarpone", "piskóta", "kávé", "kakaó", "tojás"]}',
   ARRAY['gluten', 'eggs', 'milk'],
   32.00,
   '/placeholder.svg?height=400&width=600',
   true, false, false, 1);

  -- Insert menu categories for Chicago Restaurant
  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Aperitive", "en": "Starters", "hu": "Előételek"}', '{"ro": "Începuturi delicioase în stil american", "en": "Delicious American-style beginnings", "hu": "Finom amerikai stílusú kezdetek"}', 1)
  RETURNING id INTO appetizers_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Burgeri & Grill", "en": "Burgers & Grill", "hu": "Burgerek & Grill"}', '{"ro": "Cele mai bune burgeri din oraș", "en": "The best burgers in town", "hu": "A város legjobb burgerei"}', 2)
  RETURNING id INTO mains_chicago;

  -- Insert menu items for Chicago Restaurant
  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (appetizers_chicago, chicago_id,
   '{"ro": "Inele de Ceapă", "en": "Onion Rings", "hu": "Hagymakarikák"}',
   '{"ro": "Inele de ceapă crocante cu sos BBQ", "en": "Crispy onion rings with BBQ sauce", "hu": "Ropogós hagymakarikák BBQ szósszal"}',
   '{"ro": ["ceapă", "pesmet", "făină", "sos BBQ"], "en": ["onion", "breadcrumbs", "flour", "BBQ sauce"], "hu": ["hagyma", "zsemlemorzsa", "liszt", "BBQ szósz"]}',
   ARRAY['gluten'],
   26.00,
   '/placeholder.svg?height=400&width=600',
   true, true, false, 1),
  
  (appetizers_chicago, chicago_id,
   '{"ro": "Nachos Supreme", "en": "Supreme Nachos", "hu": "Supreme Nachos"}',
   '{"ro": "Nachos cu carne, brânză, guacamole și smântână", "en": "Nachos with meat, cheese, guacamole and sour cream", "hu": "Nachos hússal, sajttal, guacamoléval és tejföllel"}',
   '{"ro": ["chips tortilla", "carne tocată", "brânză cheddar", "guacamole", "smântână", "jalapenos"], "en": ["tortilla chips", "ground beef", "cheddar cheese", "guacamole", "sour cream", "jalapenos"], "hu": ["tortilla chips", "darált hús", "cheddar sajt", "guacamole", "tejföl", "jalapeno"]}',
   ARRAY['milk', 'gluten'],
   44.00,
   '/placeholder.svg?height=400&width=600',
   false, false, false, 2);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (mains_chicago, chicago_id,
   '{"ro": "Chicago Classic Burger", "en": "Chicago Classic Burger", "hu": "Chicago Klasszikus Burger"}',
   '{"ro": "Burger cu carne de vită, bacon, brânză cheddar și sos special", "en": "Beef burger with bacon, cheddar cheese and special sauce", "hu": "Marhahús burger szalonnával, cheddar sajttal és különleges szósszal"}',
   '{"ro": ["chifla brioche", "carne de vită", "bacon", "cheddar", "salată", "roșie", "ceapă", "sos special"], "en": ["brioche bun", "beef patty", "bacon", "cheddar", "lettuce", "tomato", "onion", "special sauce"], "hu": ["briós zsemle", "marhahús pogácsa", "szalonna", "cheddar", "saláta", "paradicsom", "hagyma", "különleges szósz"]}',
   ARRAY['gluten', 'eggs', 'milk'],
   52.00,
   '/placeholder.svg?height=400&width=600',
   false, false, false, 1),
  
  (mains_chicago, chicago_id,
   '{"ro": "BBQ Ribs", "en": "BBQ Ribs", "hu": "BBQ Bordák"}',
   '{"ro": "Coaste de porc cu sos BBQ, cartofi wedges și salată coleslaw", "en": "Pork ribs with BBQ sauce, potato wedges and coleslaw", "hu": "Sertésborda BBQ szósszal, burgonya hasábokkal és káposztasalátával"}',
   '{"ro": ["coaste de porc", "sos BBQ", "cartofi", "varză", "morcov", "maioneză"], "en": ["pork ribs", "BBQ sauce", "potatoes", "cabbage", "carrot", "mayonnaise"], "hu": ["sertésborda", "BBQ szósz", "burgonya", "káposzta", "sárgarépa", "majonéz"]}',
   ARRAY['eggs', 'mustard'],
   68.00,
   '/placeholder.svg?height=400&width=600',
   false, false, true, 2),
  
  (mains_chicago, chicago_id,
   '{"ro": "Veggie Burger", "en": "Veggie Burger", "hu": "Veggie Burger"}',
   '{"ro": "Burger vegetarian cu chifteluță de legume, avocado și sos tahini", "en": "Vegetarian burger with veggie patty, avocado and tahini sauce", "hu": "Vegetáriánus burger zöldségpogácsával, avokádóval és tahini szósszal"}',
   '{"ro": ["chifla integrală", "chifteluță de naut", "avocado", "salată", "roșie", "ceapă", "sos tahini"], "en": ["whole wheat bun", "chickpea patty", "avocado", "lettuce", "tomato", "onion", "tahini sauce"], "hu": ["teljes kiőrlésű zsemle", "csicseriborsó pogácsa", "avokádó", "saláta", "paradicsom", "hagyma", "tahini szósz"]}',
   ARRAY['gluten', 'sesame'],
   46.00,
   '/placeholder.svg?height=400&width=600',
   true, true, false, 3);

  -- Insert restaurant images for Buffalo Restaurant
  INSERT INTO restaurant_images (restaurant_id, image_url, alt_text, display_order)
  VALUES 
  (buffalo_id, '/placeholder.svg?height=600&width=800', '{"ro": "Sala de mese elegantă", "en": "Elegant dining room", "hu": "Elegáns étkező"}', 1),
  (buffalo_id, '/placeholder.svg?height=600&width=800', '{"ro": "Preparate gourmet", "en": "Gourmet dishes", "hu": "Gourmet ételek"}', 2),
  (buffalo_id, '/placeholder.svg?height=600&width=800', '{"ro": "Zona bar", "en": "Bar area", "hu": "Bár terület"}', 3);

  -- Insert restaurant images for Chicago Restaurant
  INSERT INTO restaurant_images (restaurant_id, image_url, alt_text, display_order)
  VALUES 
  (chicago_id, '/placeholder.svg?height=600&width=800', '{"ro": "Interior în stil american", "en": "American style interior", "hu": "Amerika stílusú belső"}', 1),
  (chicago_id, '/placeholder.svg?height=600&width=800', '{"ro": "Burgeri suculenți", "en": "Juicy burgers", "hu": "Szaftos burgerek"}', 2),
  (chicago_id, '/placeholder.svg?height=600&width=800', '{"ro": "Terasă exterioară", "en": "Outdoor terrace", "hu": "Kültéri terasz"}', 3);

END $$;

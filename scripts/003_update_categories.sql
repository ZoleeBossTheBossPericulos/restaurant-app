-- Update menu categories with proper Romanian names
-- This script replaces the old categories with the correct ones

-- Delete old categories and their items
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- Get restaurant IDs
DO $$
DECLARE
  buffalo_id UUID;
  chicago_id UUID;
  aperitive_buffalo UUID;
  supe_buffalo UUID;
  feluri_principale_buffalo UUID;
  garnituri_buffalo UUID;
  salate_buffalo UUID;
  deserturi_buffalo UUID;
  bauturi_buffalo UUID;
  aperitive_chicago UUID;
  supe_chicago UUID;
  feluri_principale_chicago UUID;
  garnituri_chicago UUID;
  salate_chicago UUID;
  deserturi_chicago UUID;
  bauturi_chicago UUID;
BEGIN
  SELECT id INTO buffalo_id FROM restaurants WHERE slug = 'buffalo-restaurant';
  SELECT id INTO chicago_id FROM restaurants WHERE slug = 'chicago-restaurant';

  -- Create categories with proper Romanian names: Aperitive, Supe/Ciorbe, Feluri principale, Garnituri, Salate, Deserturi, Băuturi
  
  -- Buffalo Restaurant Categories
  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Aperitive", "en": "Appetizers", "hu": "Előételek"}', '{"ro": "Începeți mesele cu deliciile noastre", "en": "Start your meal with our delights", "hu": "Kezdje étkezését finomságainkkal"}', 1)
  RETURNING id INTO aperitive_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Supe / Ciorbe", "en": "Soups", "hu": "Levesek"}', '{"ro": "Supe și ciorbe tradiționale", "en": "Traditional soups", "hu": "Hagyományos levesek"}', 2)
  RETURNING id INTO supe_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Feluri principale", "en": "Main Courses", "hu": "Főételek"}', '{"ro": "Preparate principale care vă vor încânta", "en": "Main dishes that will delight you", "hu": "Főételek, amelyek el fogják ragadtatni"}', 3)
  RETURNING id INTO feluri_principale_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Garnituri", "en": "Side Dishes", "hu": "Köretek"}', '{"ro": "Garnituri delicioase pentru orice preparat", "en": "Delicious side dishes for any meal", "hu": "Finom köretek bármely ételhez"}', 4)
  RETURNING id INTO garnituri_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Salate", "en": "Salads", "hu": "Saláták"}', '{"ro": "Salate proaspete și sănătoase", "en": "Fresh and healthy salads", "hu": "Friss és egészséges saláták"}', 5)
  RETURNING id INTO salate_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Deserturi", "en": "Desserts", "hu": "Desszertek"}', '{"ro": "Finalizați cu ceva dulce", "en": "Finish with something sweet", "hu": "Fejezze be valami édessel"}', 6)
  RETURNING id INTO deserturi_buffalo;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (buffalo_id, '{"ro": "Băuturi", "en": "Beverages", "hu": "Italok"}', '{"ro": "Băuturi răcoritoare și calde", "en": "Cold and hot beverages", "hu": "Hideg és meleg italok"}', 7)
  RETURNING id INTO bauturi_buffalo;

  -- Chicago Restaurant Categories
  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Aperitive", "en": "Appetizers", "hu": "Előételek"}', '{"ro": "Începuturi delicioase în stil american", "en": "Delicious American-style beginnings", "hu": "Finom amerikai stílusú kezdetek"}', 1)
  RETURNING id INTO aperitive_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Supe / Ciorbe", "en": "Soups", "hu": "Levesek"}', '{"ro": "Supe consistente și hrănitoare", "en": "Hearty and nourishing soups", "hu": "Kiadós és tápláló levesek"}', 2)
  RETURNING id INTO supe_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Feluri principale", "en": "Main Courses", "hu": "Főételek"}', '{"ro": "Cele mai bune burgeri și grill din oraș", "en": "The best burgers and grill in town", "hu": "A város legjobb burgerei és grillételei"}', 3)
  RETURNING id INTO feluri_principale_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Garnituri", "en": "Side Dishes", "hu": "Köretek"}', '{"ro": "Completează-ți masa perfectă", "en": "Complete your perfect meal", "hu": "Tökéletesítsd étkezésed"}', 4)
  RETURNING id INTO garnituri_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Salate", "en": "Salads", "hu": "Saláták"}', '{"ro": "Opțiuni proaspete și crocante", "en": "Fresh and crispy options", "hu": "Friss és ropogós lehetőségek"}', 5)
  RETURNING id INTO salate_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Deserturi", "en": "Desserts", "hu": "Desszertek"}', '{"ro": "Dulciuri americane clasice", "en": "Classic American sweets", "hu": "Klasszikus amerikai édességek"}', 6)
  RETURNING id INTO deserturi_chicago;

  INSERT INTO menu_categories (restaurant_id, name, description, display_order)
  VALUES 
  (chicago_id, '{"ro": "Băuturi", "en": "Beverages", "hu": "Italok"}', '{"ro": "Băuturi răcoritoare și shake-uri", "en": "Refreshing drinks and shakes", "hu": "Frissítő italok és turmixok"}', 7)
  RETURNING id INTO bauturi_chicago;

  -- Sample items for Buffalo Restaurant
  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (aperitive_buffalo, buffalo_id, 
   '{"ro": "Bruschetta Clasică", "en": "Classic Bruschetta", "hu": "Klasszikus Bruschetta"}',
   '{"ro": "Pâine prăjită cu roșii proaspete, busuioc și usturoi", "en": "Toasted bread with fresh tomatoes, basil and garlic", "hu": "Pirított kenyér friss paradicsommal, bazsalikommal és fokhagymával"}',
   '{"ro": ["pâine", "roșii", "busuioc", "usturoi", "ulei de măsline"], "en": ["bread", "tomatoes", "basil", "garlic", "olive oil"], "hu": ["kenyér", "paradicsom", "bazsalikom", "fokhagyma", "olívaolaj"]}',
   ARRAY['gluten'],
   28.00,
   '/placeholder.svg?height=400&width=600',
   true, true, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (supe_buffalo, buffalo_id,
   '{"ro": "Ciorbă de burtă", "en": "Tripe Soup", "hu": "Pacalleves"}',
   '{"ro": "Ciorbă tradițională românească cu smântână și usturoi", "en": "Traditional Romanian soup with sour cream and garlic", "hu": "Hagyományos román leves tejföllel és fokhagymával"}',
   '{"ro": ["burtă", "morcov", "ceapă", "smântână", "usturoi", "oțet"], "en": ["tripe", "carrot", "onion", "sour cream", "garlic", "vinegar"], "hu": ["pacal", "sárgarépa", "hagyma", "tejföl", "fokhagyma", "ecet"]}',
   ARRAY['milk'],
   32.00,
   '/placeholder.svg?height=400&width=600',
   false, false, true, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (feluri_principale_buffalo, buffalo_id,
   '{"ro": "Steak de Vită Premium", "en": "Premium Beef Steak", "hu": "Prémium Marhasteak"}',
   '{"ro": "Steak de vită Angus 300g, cu cartofi și legume", "en": "300g Angus beef steak with potatoes and vegetables", "hu": "300g Angus marhasteak burgonyával és zöldségekkel"}',
   '{"ro": ["carne de vită Angus", "cartofi", "morcov", "fasole verde", "unt"], "en": ["Angus beef", "potatoes", "carrot", "green beans", "butter"], "hu": ["Angus marha", "burgonya", "sárgarépa", "zöldbab", "vaj"]}',
   ARRAY['milk'],
   89.00,
   '/placeholder.svg?height=400&width=600',
   false, false, true, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (garnituri_buffalo, buffalo_id,
   '{"ro": "Cartofi prăjiți", "en": "French Fries", "hu": "Sült krumpli"}',
   '{"ro": "Cartofi prăjiți crocanti", "en": "Crispy french fries", "hu": "Ropogós sült krumpli"}',
   '{"ro": ["cartofi", "ulei"], "en": ["potatoes", "oil"], "hu": ["burgonya", "olaj"]}',
   ARRAY[]::text[],
   15.00,
   '/placeholder.svg?height=400&width=600',
   true, true, true, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (salate_buffalo, buffalo_id,
   '{"ro": "Salată Caesar", "en": "Caesar Salad", "hu": "Caesar Saláta"}',
   '{"ro": "Salată verde cu parmezan, crutoane și dressing Caesar", "en": "Green salad with parmesan, croutons and Caesar dressing", "hu": "Zöld saláta parmezánnal, krutonnal és Caesar öntettel"}',
   '{"ro": ["salată verde", "parmezan", "crutoane", "dressing Caesar", "roșii cherry"], "en": ["lettuce", "parmesan", "croutons", "Caesar dressing", "cherry tomatoes"], "hu": ["saláta", "parmezán", "kruton", "Caesar öntet", "koktélparadicsom"]}',
   ARRAY['gluten', 'milk', 'eggs'],
   38.00,
   '/placeholder.svg?height=400&width=600',
   true, false, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (deserturi_buffalo, buffalo_id,
   '{"ro": "Tiramisu Clasic", "en": "Classic Tiramisu", "hu": "Klasszikus Tiramisu"}',
   '{"ro": "Desert italian cu mascarpone, cafea și cacao", "en": "Italian dessert with mascarpone, coffee and cocoa", "hu": "Olasz desszert mascarponeval, kávéval és kakaóval"}',
   '{"ro": ["mascarpone", "pișcoturi", "cafea", "cacao", "ou"], "en": ["mascarpone", "ladyfingers", "coffee", "cocoa", "egg"], "hu": ["mascarpone", "piskóta", "kávé", "kakaó", "tojás"]}',
   ARRAY['gluten', 'eggs', 'milk'],
   32.00,
   '/placeholder.svg?height=400&width=600',
   true, false, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (bauturi_buffalo, buffalo_id,
   '{"ro": "Limonadă de casă", "en": "Homemade Lemonade", "hu": "Házi limonádé"}',
   '{"ro": "Limonadă proaspătă cu lămâie și mentă", "en": "Fresh lemonade with lemon and mint", "hu": "Friss limonádé citrommal és mentával"}',
   '{"ro": ["lămâie", "mentă", "zahăr", "apă"], "en": ["lemon", "mint", "sugar", "water"], "hu": ["citrom", "menta", "cukor", "víz"]}',
   ARRAY[]::text[],
   18.00,
   '/placeholder.svg?height=400&width=600',
   true, true, true, 1);

  -- Sample items for Chicago Restaurant
  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (aperitive_chicago, chicago_id,
   '{"ro": "Inele de Ceapă", "en": "Onion Rings", "hu": "Hagymakarikák"}',
   '{"ro": "Inele de ceapă crocante cu sos BBQ", "en": "Crispy onion rings with BBQ sauce", "hu": "Ropogós hagymakarikák BBQ szósszal"}',
   '{"ro": ["ceapă", "pesmet", "făină", "sos BBQ"], "en": ["onion", "breadcrumbs", "flour", "BBQ sauce"], "hu": ["hagyma", "zsemlemorzsa", "liszt", "BBQ szósz"]}',
   ARRAY['gluten'],
   26.00,
   '/placeholder.svg?height=400&width=600',
   true, true, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (supe_chicago, chicago_id,
   '{"ro": "Supă cremă de roșii", "en": "Tomato Cream Soup", "hu": "Paradicsom krémleves"}',
   '{"ro": "Supă cremă de roșii cu busuioc și crutoane", "en": "Tomato cream soup with basil and croutons", "hu": "Paradicsom krémleves bazsalikommal és krutonnal"}',
   '{"ro": ["roșii", "smântână", "busuioc", "usturoi", "crutoane"], "en": ["tomatoes", "cream", "basil", "garlic", "croutons"], "hu": ["paradicsom", "tejszín", "bazsalikom", "fokhagyma", "kruton"]}',
   ARRAY['milk', 'gluten'],
   24.00,
   '/placeholder.svg?height=400&width=600',
   true, false, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (feluri_principale_chicago, chicago_id,
   '{"ro": "Chicago Classic Burger", "en": "Chicago Classic Burger", "hu": "Chicago Klasszikus Burger"}',
   '{"ro": "Burger cu carne de vită, bacon, brânză cheddar și sos special", "en": "Beef burger with bacon, cheddar cheese and special sauce", "hu": "Marhahús burger szalonnával, cheddar sajttal és különleges szósszal"}',
   '{"ro": ["chifla brioche", "carne de vită", "bacon", "cheddar", "salată", "roșie", "ceapă", "sos special"], "en": ["brioche bun", "beef patty", "bacon", "cheddar", "lettuce", "tomato", "onion", "special sauce"], "hu": ["briós zsemle", "marhahús pogácsa", "szalonna", "cheddar", "saláta", "paradicsom", "hagyma", "különleges szósz"]}',
   ARRAY['gluten', 'eggs', 'milk'],
   52.00,
   '/placeholder.svg?height=400&width=600',
   false, false, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (garnituri_chicago, chicago_id,
   '{"ro": "Cartofi wedges", "en": "Potato Wedges", "hu": "Burgonya hasábok"}',
   '{"ro": "Cartofi wedges cu rozmarin și parmezan", "en": "Potato wedges with rosemary and parmesan", "hu": "Burgonya hasábok rozmaringgal és parmezánnal"}',
   '{"ro": ["cartofi", "rozmarin", "parmezan", "ulei de măsline"], "en": ["potatoes", "rosemary", "parmesan", "olive oil"], "hu": ["burgonya", "rozmaring", "parmezán", "olívaolaj"]}',
   ARRAY['milk'],
   19.00,
   '/placeholder.svg?height=400&width=600',
   true, false, true, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (salate_chicago, chicago_id,
   '{"ro": "Salată Coleslaw", "en": "Coleslaw Salad", "hu": "Káposztasaláta"}',
   '{"ro": "Salată de varză și morcov cu maioneză", "en": "Cabbage and carrot salad with mayonnaise", "hu": "Káposzta és répa saláta majonézzel"}',
   '{"ro": ["varză", "morcov", "maioneză", "oțet", "zahăr"], "en": ["cabbage", "carrot", "mayonnaise", "vinegar", "sugar"], "hu": ["káposzta", "sárgarépa", "majonéz", "ecet", "cukor"]}',
   ARRAY['eggs'],
   22.00,
   '/placeholder.svg?height=400&width=600',
   true, false, true, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (deserturi_chicago, chicago_id,
   '{"ro": "Brownie cu înghețată", "en": "Brownie with Ice Cream", "hu": "Brownie fagylalttal"}',
   '{"ro": "Brownie de ciocolată caldă cu înghețată de vanilie", "en": "Warm chocolate brownie with vanilla ice cream", "hu": "Meleg csokoládé brownie vanília fagylalttal"}',
   '{"ro": ["ciocolată", "făină", "ou", "unt", "zahăr", "înghețată vanilie"], "en": ["chocolate", "flour", "egg", "butter", "sugar", "vanilla ice cream"], "hu": ["csokoládé", "liszt", "tojás", "vaj", "cukor", "vanília fagylalt"]}',
   ARRAY['gluten', 'eggs', 'milk'],
   34.00,
   '/placeholder.svg?height=400&width=600',
   true, false, false, 1);

  INSERT INTO menu_items (category_id, restaurant_id, name, description, ingredients, allergens, price, image_url, is_vegetarian, is_vegan, is_gluten_free, display_order)
  VALUES 
  (bauturi_chicago, chicago_id,
   '{"ro": "Milkshake Ciocolată", "en": "Chocolate Milkshake", "hu": "Csokoládé Turmix"}',
   '{"ro": "Milkshake cremos de ciocolată cu frișcă", "en": "Creamy chocolate milkshake with whipped cream", "hu": "Krémes csokoládé turmix tejszínhabbal"}',
   '{"ro": ["lapte", "înghețată ciocolată", "sirop ciocolată", "frișcă"], "en": ["milk", "chocolate ice cream", "chocolate syrup", "whipped cream"], "hu": ["tej", "csokoládé fagylalt", "csokoládé szirup", "tejszínhab"]}',
   ARRAY['milk'],
   26.00,
   '/placeholder.svg?height=400&width=600',
   true, false, true, 1);

END $$;

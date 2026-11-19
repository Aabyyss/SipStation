const catalog = [
  // Soft drinks
  ['Coca-Cola Original', 'Coca-Cola', 'Soft Drinks', '330 ml', 180, 'The original crisp cola with a classic, ice-cold finish.', 0, true, true],
  ['Coca-Cola Zero Sugar', 'Coca-Cola', 'Soft Drinks', '330 ml', 180, 'Bold Coca-Cola taste with zero sugar.', 0, true, true],
  ['Coca-Cola Diet', 'Coca-Cola', 'Soft Drinks', '330 ml', 175, 'Light, refreshing cola with a clean finish.', 8, false, false],
  ['Coca-Cola Cherry', 'Coca-Cola', 'Soft Drinks', '330 ml', 210, 'Original Coca-Cola with a cherry twist.', 0, false, false],
  ['Pepsi Original', 'Pepsi', 'Soft Drinks', '330 ml', 170, 'Bold, refreshing cola with a lively fizz.', 0, true, true],
  ['Pepsi Zero Sugar', 'Pepsi', 'Soft Drinks', '330 ml', 170, 'Big Pepsi taste with zero sugar.', 0, false, false],
  ['Pepsi Diet', 'Pepsi', 'Soft Drinks', '330 ml', 170, 'Crisp, light diet cola.', 10, false, false],
  ['Pepsi Max', 'Pepsi', 'Soft Drinks', '330 ml', 180, 'Maximum taste, no sugar.', 0, false, false],
  ['Sprite', 'Sprite', 'Soft Drinks', '330 ml', 170, 'A bright, lemon-lime sparkling classic.', 0, true, true],
  ['Sprite Zero', 'Sprite', 'Soft Drinks', '330 ml', 170, 'Crisp lemon-lime refreshment with zero sugar.', 0, false, false],
  ['Fanta Orange', 'Fanta', 'Soft Drinks', '330 ml', 175, 'Vibrant orange sparkle with a playful pop.', 12, true, true],
  ['Fanta Strawberry', 'Fanta', 'Soft Drinks', '330 ml', 190, 'Bright strawberry flavored sparkling drink.', 0, false, false],
  ['Fanta Grape', 'Fanta', 'Soft Drinks', '330 ml', 190, 'Juicy grape flavor and fizzy energy.', 0, false, false],
  ['7UP', '7UP', 'Soft Drinks', '330 ml', 165, 'Crisp lemon-lime soda, perfect over ice.', 0, false, false],
  ['Mountain Dew', 'Mountain Dew', 'Soft Drinks', '330 ml', 185, 'Citrus charged, intensely refreshing soda.', 0, false, false],
  ['Dr Pepper', 'Dr Pepper', 'Soft Drinks', '330 ml', 225, 'The unmistakable 23-flavor original.', 0, false, false],
  ['Mirinda Orange', 'Mirinda', 'Soft Drinks', '330 ml', 165, 'Orange fizz with an extra juicy burst.', 8, false, false],
  ['Schweppes Tonic Water', 'Schweppes', 'Soft Drinks', '330 ml', 195, 'Crisp tonic water with fine bubbles.', 0, false, false],
  // Energy
  ['Red Bull Original', 'Red Bull', 'Energy Drinks', '250 ml', 390, 'The original energy drink with a distinctive taste.', 0, true, true],
  ['Red Bull Sugarfree', 'Red Bull', 'Energy Drinks', '250 ml', 390, 'Red Bull energy with no sugar.', 0, false, false],
  ['Red Bull Tropical Edition', 'Red Bull', 'Energy Drinks', '250 ml', 425, 'Tropical fruit flavour with Red Bull energy.', 0, false, false],
  ['Red Bull Blue Edition', 'Red Bull', 'Energy Drinks', '250 ml', 425, 'Blueberry-flavoured Red Bull edition.', 10, false, false],
  ['Monster Energy Original', 'Monster', 'Energy Drinks', '473 ml', 465, 'The original Monster blend in the iconic black can.', 0, true, true],
  ['Monster Ultra White', 'Monster', 'Energy Drinks', '473 ml', 475, 'Zero sugar citrus Monster Ultra.', 0, true, false],
  ['Monster Mango Loco', 'Monster', 'Energy Drinks', '473 ml', 485, 'Juiced mango flavor from the Juice Monster line.', 0, false, false],
  ['Monster Pipeline Punch', 'Monster', 'Energy Drinks', '473 ml', 485, 'Passion fruit, orange and guava flavor.', 0, false, false],
  ['Monster Ultra Violet', 'Monster', 'Energy Drinks', '473 ml', 475, 'Zero sugar Monster with a bright citrus finish.', 15, false, false],
  ['Rockstar Original', 'Rockstar', 'Energy Drinks', '473 ml', 410, 'Original Rockstar energy drink.', 0, false, false],
  ['Rockstar Zero Sugar', 'Rockstar', 'Energy Drinks', '473 ml', 410, 'Zero sugar Rockstar energy drink.', 0, false, false],
  ['NOS Energy', 'NOS', 'Energy Drinks', '473 ml', 430, 'High performance citrus energy drink.', 0, false, false],
  ['Sting Energy', 'Sting', 'Energy Drinks', '250 ml', 150, 'Carbonated energy drink with a berry kick.', 0, false, false],
  ['HELL Energy Classic', 'HELL', 'Energy Drinks', '250 ml', 180, 'Classic vitamin-enriched energy drink.', 0, false, false],
  ['Celsius Energy', 'Celsius', 'Energy Drinks', '355 ml', 460, 'Functional sparkling energy drink.', 0, false, false],
  // Coffee
  ['Starbucks Frappuccino Vanilla', 'Starbucks', 'Coffee & Canned Coffee', '281 ml', 520, 'Smooth chilled coffee with creamy vanilla notes.', 0, true, true],
  ['Starbucks Frappuccino Mocha', 'Starbucks', 'Coffee & Canned Coffee', '281 ml', 520, 'Chocolatey mocha blended coffee drink.', 0, false, false],
  ['Starbucks Frappuccino Caramel', 'Starbucks', 'Coffee & Canned Coffee', '281 ml', 520, 'Rich coffee with buttery caramel flavour.', 10, false, false],
  ['Starbucks Doubleshot Espresso', 'Starbucks', 'Coffee & Canned Coffee', '200 ml', 550, 'Bold espresso and milk in a ready-to-drink can.', 0, false, false],
  ['Nescafé Ice Coffee', 'Nescafé', 'Coffee & Canned Coffee', '240 ml', 320, 'Chilled coffee for an easy pick-me-up.', 0, false, false],
  ['Nescafé Latte', 'Nescafé', 'Coffee & Canned Coffee', '240 ml', 320, 'Creamy ready-to-drink latte.', 0, false, false],
  ['Nescafé Mocha', 'Nescafé', 'Coffee & Canned Coffee', '240 ml', 330, 'Chocolate and coffee in a chilled mocha.', 0, false, false],
  ['Java Monster Mean Bean', 'Monster', 'Coffee & Canned Coffee', '444 ml', 540, 'Coffee energy drink with a bold creamy profile.', 0, false, false],
  ['Dunkin Iced Coffee', 'Dunkin', 'Coffee & Canned Coffee', '405 ml', 510, 'Bottled iced coffee with a smooth roast.', 0, false, false],
  ['Costa Coffee Mocha', 'Costa Coffee', 'Coffee & Canned Coffee', '250 ml', 480, 'Chilled mocha coffee from Costa Coffee.', 0, false, false],
  ['Costa Coffee Latte', 'Costa Coffee', 'Coffee & Canned Coffee', '250 ml', 480, 'Classic smooth chilled latte.', 0, false, false],
  ['illy Cold Brew Coffee', 'illy', 'Coffee & Canned Coffee', '250 ml', 590, 'Premium ready-to-drink cold brew coffee.', 0, false, false],
  // Water
  ['Aquafina', 'Aquafina', 'Water', '500 ml', 80, 'Purified drinking water.', 0, true, false],
  ['Dasani', 'Dasani', 'Water', '500 ml', 85, 'Purified water with a crisp finish.', 0, false, false],
  ['Evian Natural Mineral Water', 'Evian', 'Water', '500 ml', 260, 'Naturally sourced French mineral water.', 0, true, false],
  ['FIJI Natural Artesian Water', 'FIJI Water', 'Water', '500 ml', 290, 'Natural artesian water from Fiji.', 0, false, false],
  ['Perrier Sparkling Water', 'Perrier', 'Water', '330 ml', 280, 'French sparkling mineral water.', 0, false, false],
  ['S.Pellegrino Sparkling Water', 'S.Pellegrino', 'Water', '500 ml', 310, 'Fine Italian sparkling natural mineral water.', 0, false, false],
  ['smartwater', 'smartwater', 'Water', '600 ml', 210, 'Vapour-distilled premium water.', 0, false, false],
  ['VOSS Still Water', 'VOSS', 'Water', '500 ml', 360, 'Artisanal water in a signature bottle.', 0, false, false],
  // Juices
  ['Tropicana Orange Juice', 'Tropicana', 'Juices', '300 ml', 275, 'Fruit juice with bright orange flavour.', 0, true, false],
  ['Tropicana Apple Juice', 'Tropicana', 'Juices', '300 ml', 275, 'Smooth apple juice.', 0, false, false],
  ['Minute Maid Orange', 'Minute Maid', 'Juices', '300 ml', 220, 'Classic orange fruit drink.', 0, false, false],
  ['Minute Maid Apple', 'Minute Maid', 'Juices', '300 ml', 220, 'Refreshing apple fruit drink.', 0, false, false],
  ['Simply Orange', 'Simply', 'Juices', '340 ml', 340, 'Not-from-concentrate orange juice.', 0, false, false],
  ['Ceres Apple Juice', 'Ceres', 'Juices', '330 ml', 290, '100% apple juice blend.', 0, false, false],
  ['Ceres Mango Juice', 'Ceres', 'Juices', '330 ml', 300, 'Mango fruit juice blend.', 0, false, false],
  ['Ceres Mixed Fruit Juice', 'Ceres', 'Juices', '330 ml', 300, 'A vibrant mixed fruit juice blend.', 12, false, false],
  // Hydration
  ['Gatorade Cool Blue', 'Gatorade', 'Sports Drinks', '500 ml', 280, 'Electrolyte sports drink in Cool Blue.', 0, true, true],
  ['Gatorade Orange', 'Gatorade', 'Sports Drinks', '500 ml', 280, 'Electrolyte sports drink in Orange.', 0, false, false],
  ['Gatorade Fruit Punch', 'Gatorade', 'Sports Drinks', '500 ml', 280, 'Electrolyte sports drink in Fruit Punch.', 0, false, false],
  ['Powerade Mountain Blast', 'Powerade', 'Sports Drinks', '500 ml', 270, 'Sports hydration in Mountain Blast.', 0, false, false],
  ['PRIME Hydration Blue Raspberry', 'PRIME', 'Sports Drinks', '500 ml', 490, 'Coconut water hydration with Blue Raspberry flavour.', 0, true, false],
  ['PRIME Hydration Tropical Punch', 'PRIME', 'Sports Drinks', '500 ml', 490, 'Tropical Punch hydration drink.', 0, false, false],
  ['PRIME Hydration Lemon Lime', 'PRIME', 'Sports Drinks', '500 ml', 490, 'Lemon lime hydration drink.', 0, false, false],
  ['BODYARMOR Sports Drink', 'BODYARMOR', 'Sports Drinks', '500 ml', 390, 'Electrolyte sports drink with coconut water.', 0, false, false],
  // Tea and dairy
  ['Arizona Green Tea', 'Arizona', 'Iced Tea', '680 ml', 360, 'Honey-sweetened green tea.', 0, false, false],
  ['Arizona Lemon Tea', 'Arizona', 'Iced Tea', '680 ml', 360, 'Lemon-flavoured iced tea.', 0, false, false],
  ['Lipton Ice Tea Peach', 'Lipton', 'Iced Tea', '500 ml', 220, 'Peach-flavoured iced tea.', 0, false, false],
  ['Lipton Ice Tea Lemon', 'Lipton', 'Iced Tea', '500 ml', 220, 'Lemon-flavoured iced tea.', 0, false, false],
  ['Snapple Peach Tea', 'Snapple', 'Iced Tea', '473 ml', 390, 'Peach tea made with quality ingredients.', 0, false, false],
  ['Nestea Lemon Tea', 'Nestea', 'Iced Tea', '500 ml', 215, 'Lemon iced tea with a refreshing finish.', 0, false, false],
  ['Milo Ready-to-Drink', 'Milo', 'Flavored & Dairy Drinks', '240 ml', 170, 'Chocolate malt beverage, chilled and ready.', 0, false, false]
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const productSeed = catalog.map(([name, brand, category, size, price, description, discount, featured, bestseller], index) => {
  const id = slugify(name);
  return {
    id,
    name,
    brand,
    category,
    size,
    price,
    oldPrice: discount ? Math.round(price / (1 - discount / 100)) : null,
    discount,
    description,
    inStock: index !== 67,
    featured,
    bestseller,
    image: `/images/products/${id}.jpg`,
    imageAlt: `${name} product packaging`,
    rating: Number((4.4 + (index % 6) / 10).toFixed(1)),
    reviewCount: 42 + index * 13
  };
});

export const products = productSeed;
export const brands = [...new Set(products.map((product) => product.brand))].sort();

# SIPSTATION — Premium Beverage E-Commerce Store

**SIPSTATION** is a fully functional, luxury beverage e-commerce storefront built with a bold obsidian-black and deep velvet burgundy aesthetic. Inspired by high-end 3D product showcases (including UsmanAhmadDev's 3D beverage work), but engineered as an end-to-end modern e-commerce application.

---

## Brand & Visual Identity

- **Main Background:** `#090909` (Obsidian Black)
- **Secondary Surface:** `#141414`
- **Card Background:** `#1A1A1A`
- **Primary Accent:** `#800020` (Burgundy)
- **Deep Accent:** `#4B001F`
- **Accent Hover:** `#A02045`
- **Text:** `#FFFFFF` (Primary), `#A5A5A5` (Secondary Muted)
- **Typography:** DM Sans, Playfair Display, DM Mono

---

## Core Features & Architecture

1. **3D Interactive Hero Experience:**
   - Real-time 3D mouse tracking & perspective tilt (`perspective(1200px)` with spring physics).
   - Dynamic 3D Beverage Switcher: Switch between Coca-Cola, Pepsi, Red Bull, Monster Energy, Starbucks, and Sprite with 360° rotational flip, radial brand aura backlighting, and live telemetry (Sub-Zero chill temperature, carbonation pressure BAR, and instant cart action).
   - Atmospheric floating surround cans in parallax z-depth.
   - Smooth scroll indicator.

2. **Complete Authentic Product Catalog (71+ Drinks):**
   - **Soft Drinks:** Coca-Cola Original, Zero Sugar, Diet, Cherry, Pepsi Original, Zero, Diet, Max, Sprite, Sprite Zero, Fanta Orange, Strawberry, Grape, 7UP, Mountain Dew, Dr Pepper, Mirinda, Schweppes Tonic.
   - **Energy Drinks:** Red Bull Original, Sugarfree, Tropical, Blue Edition, Monster Energy Original, Ultra White, Mango Loco, Pipeline Punch, Ultra Violet, Rockstar Original, Rockstar Zero, NOS, Sting, HELL Energy, Celsius.
   - **Coffee & Canned Coffee:** Starbucks Frappuccino Vanilla, Mocha, Caramel, Doubleshot Espresso, Nescafé Ice Coffee, Latte, Mocha, Java Monster Mean Bean, Dunkin Iced Coffee, Costa Coffee Mocha, Latte, illy Cold Brew.
   - **Water:** Aquafina, Dasani, Evian, FIJI, Perrier, S.Pellegrino, smartwater, VOSS.
   - **Juices:** Tropicana Orange, Apple, Minute Maid Orange, Apple, Simply Orange, Ceres Apple, Mango, Mixed Fruit.
   - **Sports & Hydration:** Gatorade Cool Blue, Orange, Fruit Punch, Powerade, PRIME Blue Raspberry, Tropical Punch, Lemon Lime, BODYARMOR.
   - **Iced Tea & Flavored Dairy:** Arizona Green Tea, Lemon Tea, Lipton Peach, Lemon, Snapple Peach, Nestea, Milo RTD.

3. **Shop & Filtering Engine (`/shop`):**
   - Real-time instant search across name, brand, and category.
   - Multi-parameter filtering: Category chips, brand selector, price range slider (in PKR), in-stock toggle, on-sale filter.
   - Sorting options: Featured, Best Selling, Price Low to High, Price High to Low, Alphabetical.
   - Responsive grid (4-col desktop, 3-col tablet, 2-col mobile) with smooth pagination / load-more.

4. **Product Cards & Quick View Modal:**
   - 3D-elevated cards with genuine packaging photography, volume/size badges, PKR pricing, and discount badges.
   - Quick View modal with nutrition/specs, quantity stepper, and direct add-to-cart feedback.
   - Wishlist toggle with instant heart state persistence.

5. **Functional Shopping Cart & Drawer (`/cart`):**
   - Slide-over cart drawer accessible from anywhere via navbar counter.
   - Dedicated cart page (`/cart`) with line-item totals, quantity adjustment, and item removal.
   - Bundle rewards engine (5% off when ordering 6 or more drinks).
   - LocalStorage persistence so cart survives page reloads.

6. **Checkout Experience (`/checkout` & `/order-confirmation`):**
   - Form validation: Full name, phone number, email, street address, city, postal code, and instructions.
   - Payment method selection: Cash on Delivery (active demo), Bank Transfer (placeholder), Online Payment (placeholder).
   - Order confirmation screen displaying unique order ID (`SS-XXXXXX`), customer details, and order summary.
   - Fully transparent frontend demonstration with clean hooks ready for backend API integration.

7. **Dedicated Pages & Navigation:**
   - Sticky navbar with blur-on-scroll, live cart badge, wishlist badge, search shortcut, and mobile slide menu.
   - Dedicated Product Details (`/product/:id`) with related drinks recommendations.
   - Wishlist page (`/wishlist`).
   - About page (`/about`).
   - Newsletter subscription form with email validation.
   - Single desktop shortcut `SIPSTATION` with custom black PS emblem.

---

## Running the Store

### Option 1: Desktop Shortcut
Double-click the **SIPSTATION** shortcut on your Desktop. It starts the local production server in the background and opens `http://localhost:3000` automatically.

### Option 2: Command Line
```powershell
# Development mode
npm run dev

# Build production bundle
npm run build

# Start production server
node server.js
```

Open `http://localhost:3000` in any web browser.

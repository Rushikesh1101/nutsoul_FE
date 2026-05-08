# Shubham Dry Fruits & Spices

> Premium e-commerce platform for dry fruits, nuts, seeds, and authentic Indian spices.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![React](https://img.shields.io/badge/React-19-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## Table of Contents

- [Technical Architecture](#technical-architecture)
- [System Requirements](#system-requirements)
- [Quick Setup (New System)](#quick-setup-new-system)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Feature Guide](#feature-guide)
- [Admin Panel](#admin-panel)
- [Payment Integration](#payment-integration)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Technical Architecture

```
                          ┌─────────────────────────────────┐
                          │          CLIENT (Browser)        │
                          │  React 19 + Vite + Tailwind CSS │
                          │  SPA with React Router v7        │
                          └──────────────┬──────────────────┘
                                         │ HTTP / JSON
                                         │ JWT in Authorization header
                                         ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                         EXPRESS.js SERVER (Port 5000)                      │
│                                                                            │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │  Helmet   │  │  CORS        │  │ Rate Limiter │  │ Static Files   │     │
│  │ Security  │  │  Middleware   │  │ 200 req/15m  │  │  (client/dist) │     │
│  └──────────┘  └──────────────┘  └──────────────┘  └────────────────┘     │
│                                                                            │
│  ┌─────────────────────── API ROUTES (/api) ──────────────────────────┐   │
│  │                                                                     │   │
│  │  /api/auth/*          Authentication (register, login, reset, me)  │   │
│  │  /api/products/*      Product CRUD + search + filter               │   │
│  │  /api/cart/*           Cart operations (add, update, remove)       │   │
│  │  /api/wishlist/*       Wishlist toggle                             │   │
│  │  /api/orders/*         Order creation + tracking                   │   │
│  │  /api/addresses/*      Saved address management                   │   │
│  │  /api/admin/*          Admin dashboard + stats                    │   │
│  │  /api/payment/*        UPI QR generation                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌──────────────────── MIDDLEWARE ─────────────────────┐                   │
│  │  authenticateToken  │  optionalAuth  │  requireAdmin │                   │
│  │  (JWT verification)    (soft check)    (role guard)  │                   │
│  └─────────────────────────────────────────────────────┘                   │
│                                    │                                       │
└────────────────────────────────────┼───────────────────────────────────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │   SQLite Database    │
                          │   (data/store.db)    │
                          │   via better-sqlite3 │
                          │   WAL mode enabled   │
                          └─────────────────────┘
```

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend** | React 19 + Vite 7 | Fast HMR, modern bundling, tree-shaking |
| **Styling** | Tailwind CSS 3.4 | Utility-first, small bundle, rapid prototyping |
| **Backend** | Express 5 | Mature, Express v5 async error handling |
| **Database** | SQLite (better-sqlite3) | Zero config, file-based, synchronous API, no external service |
| **Auth** | JWT + Refresh Tokens | Stateless, scalable, 7-day access + 30-day refresh |
| **Passwords** | bcryptjs (12 rounds) | Industry standard, no native dependencies |
| **Payment** | UPI QR + COD | Most accessible for Indian market |

### Data Flow

```
User Action → React Component → Context (Auth/Cart) → Axios API call
    → Express Route → Middleware (auth check) → SQLite query → JSON response
    → Context state update → React re-render
```

### Security Layers

```
1. Helmet.js        → HTTP security headers (XSS, clickjacking, MIME sniffing)
2. CORS             → Origin restriction in production
3. Rate Limiting    → 200 requests per 15 minutes per IP
4. JWT Auth         → Token-based, no session storage on server
5. bcrypt           → 12-round password hashing
6. Input Validation → Server-side checks on all endpoints
7. SQL Safety       → Parameterized queries via better-sqlite3 (no SQL injection)
8. WAL Mode         → Safe concurrent reads during writes
```

---

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Node.js** | 18.x | 20.x LTS |
| **npm** | 9.x | 10.x |
| **RAM** | 512 MB | 1 GB+ |
| **Disk** | 200 MB | 500 MB |
| **OS** | Linux / macOS / Windows | Ubuntu 20.04+ |

---

## Quick Setup (New System)

### Step 1: Clone / Copy the Project

```bash
# If using git:
git clone <repository-url> Dryfruits
cd Dryfruits

# Or copy the entire folder to the new machine
```

### Step 2: Install Node.js (if not installed)

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Verify
node --version   # Should show v20.x.x
npm --version    # Should show 10.x.x
```

### Step 3: Install Dependencies

```bash
# Install root (server) dependencies
npm install

# Install client (frontend) dependencies
cd client
npm install
cd ..
```

### Step 4: Configure Environment

```bash
# Copy and edit the environment file
cp .env.example .env    # Or create .env manually

# Required .env contents:
cat > .env << 'EOF'
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this
NODE_ENV=production
UPI_ID=your-upi-id@upi
ADMIN_EMAIL=admin@shubhamdryfruits.com
ADMIN_PASSWORD=Admin@123456
SITE_URL=http://localhost:5000
EOF
```

> **Important:** Change `JWT_SECRET` and `JWT_REFRESH_SECRET` to unique random strings in production.

### Step 5: Build the Frontend

```bash
npm run build
```

### Step 6: Start the Application

```bash
# Start production server
npm start

# Server runs at http://localhost:5000
```

### Step 7: Access the App

| URL | Description |
|-----|-------------|
| `http://localhost:5000` | Homepage |
| `http://localhost:5000/store/dryfruits` | Dry Fruits store |
| `http://localhost:5000/store/spices` | Spices store |
| `http://localhost:5000/login` | User login |
| `http://localhost:5000/register` | New account |
| `http://localhost:5000/admin` | Admin panel |

### Default Admin Credentials

```
Email:    admin@shubhamdryfruits.com
Password: Admin@123456
```

> Change these immediately in production via the `.env` file (before first run).

---

## Project Structure

```
Dryfruits/
│
├── .env                          # Environment variables (secrets, config)
├── package.json                  # Root package (server dependencies + scripts)
├── README.md                     # This file
│
├── server/                       # ── BACKEND ──────────────────────────
│   ├── index.js                  # Express app entry point
│   ├── database.js               # SQLite setup, table creation, seeding
│   ├── seed-products.js          # 47 initial products data
│   │
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   │                               # - authenticateToken (required auth)
│   │                               # - optionalAuth (soft check)
│   │                               # - requireAdmin (admin role guard)
│   │
│   └── routes/
│       ├── auth.js               # POST /register, /login, /refresh
│       │                           # GET  /me
│       │                           # PUT  /profile, /change-password
│       │                           # POST /forgot-password, /reset-password
│       ├── products.js           # GET  / (list+filter), /:slug, /categories/:type
│       │                           # POST / (admin add)
│       │                           # PUT  /:id (admin update)
│       │                           # DELETE /:id (admin delete)
│       ├── cart.js               # GET  / (user cart)
│       │                           # POST /add, /save-for-later/:id, /move-to-cart/:id
│       │                           # PUT  /:id (quantity), DELETE /:id, DELETE /
│       ├── wishlist.js           # GET  /, /check/:productId
│       │                           # POST /add, DELETE /:productId
│       ├── orders.js             # POST /create, /:orderId/payment-screenshot
│       │                           # GET  /my-orders, /:orderId
│       │                           # GET  /admin/all, PUT /admin/:orderId/status
│       ├── addresses.js          # CRUD for user saved addresses
│       └── admin.js              # GET  /stats, /customers
│
├── client/                       # ── FRONTEND ─────────────────────────
│   ├── index.html                # HTML entry (Google Fonts, meta tags)
│   ├── vite.config.js            # Vite build config + dev proxy
│   ├── tailwind.config.js        # Custom theme (brand colors, animations)
│   ├── postcss.config.js         # PostCSS + Tailwind + Autoprefixer
│   ├── package.json              # Client dependencies
│   │
│   ├── public/
│   │   └── favicon.svg           # Brand favicon
│   │
│   ├── src/
│   │   ├── main.jsx              # React entry (providers, router)
│   │   ├── App.jsx               # Route definitions + layout
│   │   ├── index.css             # Tailwind imports + custom components
│   │   │                           # (glass-card, hover-lift, btn-primary, etc.)
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # User auth state (login, register, logout)
│   │   │   └── CartContext.jsx   # Cart state (items, count, subtotal)
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Top nav (search, cart badge, user menu)
│   │   │   ├── Footer.jsx        # Site footer (links, contact info)
│   │   │   └── ProductCard.jsx   # Reusable product card with weight selector
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page (hero + category cards + featured)
│   │   │   ├── Store.jsx         # Product listing (filter, sort, categories)
│   │   │   ├── ProductDetail.jsx # Single product (gallery, weights, add to cart)
│   │   │   ├── Cart.jsx          # Shopping cart (quantities, save for later)
│   │   │   ├── Checkout.jsx      # Address + payment + order placement
│   │   │   ├── OrderConfirmation.jsx  # Post-order success page
│   │   │   ├── Login.jsx         # User login form
│   │   │   ├── Register.jsx      # User registration form
│   │   │   ├── ForgotPassword.jsx # Password reset flow
│   │   │   ├── Dashboard.jsx     # User dashboard (orders, wishlist, addresses)
│   │   │   ├── AdminPanel.jsx    # Admin (stats, orders, products, customers)
│   │   │   └── SearchResults.jsx # Product search results
│   │   │
│   │   └── utils/
│   │       ├── api.js            # Axios instance (base URL, JWT interceptor)
│   │       └── helpers.js        # formatPrice, getProductPrice, constants
│   │
│   └── dist/                     # Production build output (served by Express)
│
└── data/
    └── store.db                  # SQLite database (auto-created on first run)
```

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create new account |
| POST | `/api/auth/login` | No | Login, returns JWT |
| POST | `/api/auth/refresh` | No | Refresh access token |
| GET | `/api/auth/me` | Yes | Get current user profile |
| PUT | `/api/auth/profile` | Yes | Update name/phone |
| PUT | `/api/auth/change-password` | Yes | Change password |
| POST | `/api/auth/forgot-password` | No | Request password reset |
| POST | `/api/auth/reset-password` | No | Reset with token |

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | List all (supports `?store_type=`, `?category=`, `?search=`, `?sort=`, `?featured=true`, `?bestseller=true`) |
| GET | `/api/products/:slug` | No | Single product details |
| GET | `/api/products/categories/:storeType` | No | List categories |
| POST | `/api/products` | Admin | Add new product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Cart

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cart` | Yes | Get cart items + subtotal |
| POST | `/api/cart/add` | Yes | Add item (product_id, weight, quantity) |
| PUT | `/api/cart/:id` | Yes | Update quantity |
| DELETE | `/api/cart/:id` | Yes | Remove item |
| DELETE | `/api/cart` | Yes | Clear entire cart |
| POST | `/api/cart/save-for-later/:id` | Yes | Move to saved |
| GET | `/api/cart/saved` | Yes | Get saved items |
| POST | `/api/cart/move-to-cart/:id` | Yes | Restore saved item |

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders/create` | Yes | Place order from cart |
| GET | `/api/orders/my-orders` | Yes | User's order history |
| GET | `/api/orders/:orderId` | Yes | Single order details |
| POST | `/api/orders/:orderId/payment-screenshot` | Yes | Submit UPI proof |
| GET | `/api/orders/admin/all` | Admin | All orders (filterable) |
| PUT | `/api/orders/admin/:orderId/status` | Admin | Update order/payment status |

### Other

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET/POST/PUT/DELETE | `/api/addresses/*` | Yes | Address CRUD |
| GET/POST/DELETE | `/api/wishlist/*` | Yes | Wishlist operations |
| GET | `/api/admin/stats` | Admin | Dashboard statistics |
| GET | `/api/admin/customers` | Admin | Customer list |
| GET | `/api/payment/upi-qr` | No | Generate UPI payment string |

---

## Database Schema

```sql
┌──────────────────┐       ┌──────────────────┐
│      users       │       │    addresses     │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │──┐    │ id (PK)          │
│ name             │  │    │ user_id (FK)  ───┘
│ email (UNIQUE)   │  │    │ label            │
│ phone            │  │    │ name, phone      │
│ password (hash)  │  │    │ address_line1/2  │
│ role             │  │    │ city, state      │
│ reset_token      │  │    │ pincode          │
│ created_at       │  │    │ is_default       │
└──────────────────┘  │    └──────────────────┘
         │            │
         │            │    ┌──────────────────┐
         │            ├───→│   cart_items      │
         │            │    ├──────────────────┤
         │            │    │ id (PK)          │
         │            │    │ user_id (FK)     │
         │            │    │ product_id (FK)  │
         │            │    │ weight           │
         │            │    │ quantity         │
         │            │    └──────────────────┘
         │            │
         │            │    ┌──────────────────┐
         │            ├───→│    wishlist       │
         │            │    ├──────────────────┤
         │            │    │ user_id (FK)     │
         │            │    │ product_id (FK)  │
         │            │    └──────────────────┘
         │            │
         ▼            │    ┌──────────────────┐
┌──────────────────┐  ├───→│     orders       │
│    products      │  │    ├──────────────────┤
├──────────────────┤  │    │ order_id (UNIQUE)│
│ id (PK)          │  │    │ user_id (FK)     │
│ name, slug       │  │    │ address_id (FK)  │
│ hindi_name       │  │    │ shipping_*       │
│ description      │  │    │ subtotal, total  │
│ category         │  │    │ shipping_fee     │
│ subcategory      │  │    │ payment_method   │
│ store_type       │  │    │ payment_status   │
│ image_url        │  │    │ order_status     │
│ price_100g/250g  │  │    │ tracking_id      │
│ price_500g/1kg   │  │    │ created_at       │
│ in_stock         │  │    └────────┬─────────┘
│ is_featured      │  │             │
│ is_bestseller    │  │             ▼
│ rating           │  │    ┌──────────────────┐
│ review_count     │  │    │  order_items      │
└──────────────────┘  │    ├──────────────────┤
                      │    │ order_id (FK)    │
                      │    │ product_id (FK)  │
                      │    │ product_name     │
                      │    │ weight, quantity │
                      │    │ price            │
                      │    └──────────────────┘
                      │
                      │    ┌──────────────────┐
                      └───→│ saved_for_later  │
                           ├──────────────────┤
                           │ user_id (FK)     │
                           │ product_id (FK)  │
                           │ weight, quantity │
                           └──────────────────┘
```

---

## Feature Guide

### Landing Page
- Two glassmorphism **category cards** (Dry Fruits / Spices) with hover-lift animation
- Background with premium texture overlay
- Trust badges (Authentic, Free Shipping, Freshness Guaranteed)
- Featured products and bestsellers sections

### Product Stores
- **30 Dry Fruit** products: Nuts (8), Dried Fruits (10), Seeds (6), Premium Mixes (6)
- **17+ Spice** products: Whole Spices (12), Powdered Spices (5+)
- **Weight selector**: 100g / 250g / 500g / 1kg with dynamic pricing
- Category filter tabs, sort options (price, rating, name)
- Star ratings, review counts, stock badges

### User Accounts
- Registration with name, email, phone, password
- JWT-based login with 7-day tokens + 30-day refresh
- Password reset via token
- User dashboard: overview, orders, wishlist, addresses, profile settings

### Shopping Cart
- Add items with specific weight and quantity
- Update quantities inline
- "Save for Later" and restore functionality
- Free shipping indicator (orders >= ₹500)

### Checkout
- Select from saved addresses or add new
- Indian states dropdown + pincode validation
- Payment method selection (COD, UPI QR)
- Order summary with itemized breakdown

### Order System
- Unique order IDs (format: `SDF-{timestamp}-{random}`)
- Status flow: placed → confirmed → processing → shipped → out_for_delivery → delivered
- Payment status: pending → paid / verification_pending / failed

---

## Admin Panel

Access at `/admin` with admin credentials.

### Dashboard
- Total orders, revenue, customers, products count
- Pending orders and payment verification counts
- Recent orders table

### Order Management
- Filter by status (placed, confirmed, processing, shipped, delivered, cancelled)
- One-click status updates for both order and payment
- UPI transaction reference viewing

### Product Management
- Full product list with stock toggle
- **Add new products** with:
  - Store type selector (Dry Fruits / Spices)
  - Dynamic category and subcategory dropdowns
  - Four-tier pricing (100g, 250g, 500g, 1kg)
  - Featured / Bestseller flags
- Delete products

### Customer Management
- Customer list with order count and total spend
- Registration dates

---

## Payment Integration

### Cash on Delivery (COD)
- Default payment method
- Order marked as `payment_status: pending` until delivery
- Admin updates to `paid` after collection

### UPI QR Code Payment
```
Flow:
1. User selects "UPI QR Code" at checkout
2. System generates UPI deep link:
   upi://pay?pa={UPI_ID}&pn=Shubham+Dry+Fruits&am={amount}&tn=Order+{id}&cu=INR
3. QR code rendered via react-qr-code library
4. User scans with any UPI app (GPay, PhonePe, Paytm, etc.)
5. User submits transaction ID/reference
6. Order marked as payment_status: verification_pending
7. Admin verifies and marks as paid
```

### Adding Razorpay (Future)
```javascript
// Install: npm install razorpay
// In server/routes/orders.js, add:

const Razorpay = require('razorpay');
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order:
const razorpayOrder = await instance.orders.create({
  amount: total * 100, // paise
  currency: 'INR',
  receipt: orderId,
});

// On frontend, use Razorpay checkout.js to complete payment
// Verify signature on callback
```

---

## Configuration

### Environment Variables (.env)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Server port |
| `JWT_SECRET` | **Yes** | - | Access token signing key |
| `JWT_REFRESH_SECRET` | **Yes** | - | Refresh token signing key |
| `NODE_ENV` | No | `production` | Environment mode |
| `UPI_ID` | No | `shubhamdryfruits@upi` | Merchant UPI ID for QR |
| `ADMIN_EMAIL` | No | `admin@shubhamdryfruits.com` | Default admin email |
| `ADMIN_PASSWORD` | No | `Admin@123456` | Default admin password |
| `RAZORPAY_KEY_ID` | No | - | Razorpay API key |
| `RAZORPAY_KEY_SECRET` | No | - | Razorpay secret |
| `SITE_URL` | No | `http://localhost:5000` | Public URL |

---

## Deployment

### Option 1: VPS / Cloud VM (Recommended)

```bash
# On your Ubuntu/Debian server:

# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Upload project (rsync, scp, or git clone)
scp -r Dryfruits/ user@server:/home/user/

# 3. Install + build
cd /home/user/Dryfruits
npm install
cd client && npm install && cd ..
npm run build

# 4. Configure .env (change secrets!)
nano .env

# 5. Run with PM2 (process manager)
npm install -g pm2
pm2 start server/index.js --name "shubham-dryfruits"
pm2 save
pm2 startup    # Auto-restart on reboot

# 6. (Optional) Nginx reverse proxy
sudo apt install nginx
```

**Nginx config** (`/etc/nginx/sites-available/dryfruits`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Railway / Render / DigitalOcean App Platform

```bash
# Set build command:   cd client && npm install && npx vite build
# Set start command:   node server/index.js
# Set env variables in dashboard
# Ensure PORT env var is set by the platform
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY client/package*.json ./client/
RUN cd client && npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "server/index.js"]
```

```bash
docker build -t shubham-dryfruits .
docker run -p 5000:5000 --env-file .env shubham-dryfruits
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `better-sqlite3` build fails | Install build tools: `sudo apt install build-essential python3` |
| Port 5000 already in use | Change `PORT` in `.env` or kill process: `lsof -ti:5000 \| xargs kill` |
| Blank page on frontend | Run `npm run build` to generate `client/dist/` |
| "Cannot find module" error | Run `npm install` in both root and `client/` directories |
| Database locked | Stop any duplicate server processes |
| Admin login fails | Delete `data/store.db` and restart (will re-seed) |
| Tailwind styles not applied | Ensure `tailwind.config.js` content paths match `src/**/*.{jsx,js}` |

### Reset Everything

```bash
# Delete database (will re-create with seed data on next start)
rm data/store.db

# Rebuild frontend
npm run build

# Restart server
npm start
```

---

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run build` | Build frontend for production |
| `npm run build:client` | Build only the React client |
| `npm test` | Run tests |

---

## Adding New Products

### Via Admin Panel (Recommended)
1. Login as admin at `/admin`
2. Navigate to **Add Product**
3. Select store type (Dry Fruits / Spices)
4. Choose category and subcategory from dropdowns
5. Fill in pricing for all weight tiers
6. Save

### Via API
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "name": "Saffron (Kesar)",
    "hindi_name": "Kesar",
    "description": "Premium Kashmiri saffron threads",
    "short_description": "Pure Kashmiri saffron, 1g pack",
    "category": "Whole Spices",
    "subcategory": "Saffron",
    "store_type": "spices",
    "image_url": "https://example.com/saffron.jpg",
    "price_100g": 5000,
    "price_250g": 12000,
    "price_500g": 23000,
    "price_1kg": 45000,
    "in_stock": true,
    "is_featured": true,
    "is_bestseller": false
  }'
```

### Via Database Seed
Add products to `server/seed-products.js` array and delete `data/store.db` to re-seed.

---

## Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | 20.x |
| Backend | Express.js | 5.x |
| Database | SQLite (better-sqlite3) | - |
| Frontend | React | 19.x |
| Bundler | Vite | 7.x |
| CSS | Tailwind CSS | 3.4 |
| Routing | React Router | 7.x |
| HTTP Client | Axios | 1.x |
| Auth | jsonwebtoken + bcryptjs | JWT |
| QR Codes | react-qr-code | 2.x |
| Notifications | react-hot-toast | 2.x |
| Security | helmet + express-rate-limit | - |

---

**Built with care for Shubham Dry Fruits & Spices**

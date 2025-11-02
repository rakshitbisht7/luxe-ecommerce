# LUXE Quick Start Guide 🚀

Get up and running with the LUXE eCommerce platform in minutes!

---

### Test Accounts

**Customer Account:**
- Email: `customer@example.com`
- Password: `password` (any 6+ characters)
- Access: Shopping, Cart, Wishlist, Profile

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123` (any 6+ characters)
- Role: Select "Admin" during signup
- Access: Admin Dashboard, Product Management, Order Management

---

## 📁 Project Structure

```
├── App.tsx                      # Main application component
├── components/
│   ├── AdminDashboard.tsx       # Admin panel
│   ├── AuthPages.tsx            # Login/Signup pages
│   ├── CartPage.tsx             # Shopping cart
│   ├── CheckoutPage.tsx         # Checkout process
│   ├── ErrorBoundary.tsx        # Error handling
│   ├── Footer.tsx               # Footer with links
│   ├── HomePage.tsx             # Landing page
│   ├── LoadingSpinner.tsx       # Loading state
│   ├── LogoutModal.tsx          # Logout confirmation
│   ├── Navbar.tsx               # Navigation bar
│   ├── ProductCard.tsx          # Product card component
│   ├── ProductDetailsPage.tsx   # Product details
│   ├── ProductListingPage.tsx   # Product catalog
│   ├── ProfilePage.tsx          # User profile
│   ├── SEOHead.tsx              # SEO meta tags
│   ├── WishlistPage.tsx         # Saved products
│   └── ui/                      # Shadcn UI components
├── data/
│   └── mockData.ts              # Mock product/order data
├── types/
│   └── index.ts                 # TypeScript interfaces
├── utils/
│   └── helpers.ts               # Utility functions
└── styles/
    └── globals.css              # Global styles
```
---



## 🔧 Key Features

### 1. Shopping Cart
- Add items with size/color selection
- Update quantities
- Remove items
- Persists in localStorage

### 2. Wishlist
- Save favorite products
- Heart icon on product cards
- Accessible from navbar
- Persists in localStorage

### 3. Search
- Real-time search
- Autocomplete suggestions
- Search by name, category, brand
- Click to navigate to product

### 4. Categories
- Women's Clothing
- Men's Clothing
- Accessories
- Shoes
- Navigate from navbar or homepage

### 5. User Authentication
- Login/Signup forms
- Role-based access (Customer/Admin)
- Protected routes
- Logout confirmation
- Profile management

### 6. Admin Dashboard
- Sales overview
- Recent orders
- Product management
- Customer list
- Order status updates
- Analytics charts

---

## 📱 Responsive Design

The app is fully responsive:

- **Mobile** (< 640px): Hamburger menu, stacked layout
- **Tablet** (640px - 1024px): Optimized grid
- **Desktop** (> 1024px): Full navigation, multi-column

Test responsive design by resizing your browser!

---

## 🎯 User Flows

### Customer Journey

1. **Browse** → Click "Shop All" or category from navbar
2. **Search** → Use search bar for specific products
3. **View Details** → Click product card
4. **Add to Cart** → Select size/color, click "Add to Cart"
5. **Wishlist** → Click heart icon to save
6. **Checkout** → Go to cart, proceed to checkout
7. **Login** → Login or signup (if not logged in)
8. **Place Order** → Fill shipping info, place order
9. **View Orders** → Check profile for order history

### Admin Journey

1. **Signup** → Create account with "Admin" role
2. **Access Dashboard** → Click user icon → Admin
3. **View Analytics** → See sales, orders, customers
4. **Manage Products** → View product list
5. **Manage Orders** → Update order statuses
6. **View Customers** → See customer list

---

## 💡 Tips & Tricks

### LocalStorage Data

All data is stored in browser localStorage:

- Cart: `luxe_cart`
- Wishlist: `luxe_wishlist`
- User: `luxe_user`
- Auth: `luxe_auth`

**Clear data:** Open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

### Demo Credentials

You don't need specific credentials! Just:
1. Go to Login page
2. Enter ANY email and password (6+ chars)
3. It will auto-create an account

For admin access:
1. Go to Signup
2. Select "Admin" role
3. Sign up with any credentials

### Navigation Shortcuts

- **Home**: Click LUXE logo
- **Products**: Click category buttons
- **Cart**: Click cart icon (top right)
- **Wishlist**: Click heart icon (top right)
- **Profile**: Click user icon (when logged in)
- **Admin**: Click "Admin" button (admin users only)

### Mobile Features

On mobile:
- Click hamburger menu (☰) for navigation
- All categories accessible from mobile menu
- Wishlist and cart in top bar
- Profile/logout in mobile menu

---


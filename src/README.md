# 🛍️ LUXE — Modern E-Commerce Website

LUXE is a **feature-rich, scalable, and elegant e-commerce platform** built with modern web technologies.  
It delivers a seamless shopping experience with an intuitive UI, fast performance, and clean architecture — designed to evolve into a full-stack **MERN** application.

---

## 🚀 Overview

**LUXE** combines **React**, **TypeScript**, and **Tailwind CSS v4.0** for a performant frontend, with a backend planned using the **MERN stack**.  
It showcases professional-grade UX/UI practices, reusable components, and a responsive design system ready for production deployment.

---

## 🛠️ Technology Stack

### 🧩 Frontend
- **React** – Component-based UI library  
- **TypeScript** – Type-safe JavaScript superset  
- **Tailwind CSS v4.0** – Utility-first CSS framework  
- **HTML5** – Semantic markup  

### ⚙️ Backend (Planned – MERN Stack)
- **MongoDB** – NoSQL database  
- **Express.js** – Node.js web framework  
- **Node.js** – JavaScript runtime  
- **JWT** – Authentication & authorization  

### 🧰 Build Tools & Dev Setup
- **Vite** – Lightning-fast build tool  
- **ESLint** – Linting and code quality  
- **PostCSS** – CSS post-processing  

### 🔄 State & Data Management
- **React Hooks** – useState, useEffect, useContext, etc.  
- **Context API** – Global state management  
- **localStorage** – Persistent client-side data  

---

## 📦 Key Libraries & Packages

### 🎨 UI Components
- **shadcn/ui** – Comprehensive UI library featuring:
  - Buttons, Inputs, Dialogs, Drawers, Tabs, Tables, Toasts, and more

### 🧭 Icons & Media
- **lucide-react** – Modern icon library  
- **Unsplash API** – Stock photography integration  

### 🎞️ Animation & Motion
- **motion/react (Framer Motion)** – Smooth, physics-based animations  
- **CSS Transitions & Transforms** – Lightweight native animations  

### 🧾 Form Handling & Validation
- **react-hook-form@7.55.0** – Efficient form handling  
- **Zod** – TypeScript-first schema validation  

### 📅 Date Management
- **date-fns** or native **Date** APIs  

---

## ✨ Core Features

### 🏠 Pages & Navigation
1. **Landing Page** – Hero banner, featured products, and new arrivals  
2. **Product Listing** – Filters, sorting, pagination, and category navigation  
3. **Product Details** – Images, variants, reviews, related products  
4. **Shopping Cart** – Quantity updates, discounts, summary  
5. **Checkout** – Multi-step process with shipping and payment  
6. **Auth Pages** – Login, signup, password recovery (JWT-ready)  
7. **User Profile** – Orders, settings, wishlist, addresses  
8. **Wishlist Page** – Save and manage favorites  
9. **Admin Dashboard** – Product, user, and order management  
10. **404 Page** – Custom error fallback  

---

### 🔐 Authentication & Security
- Role-based access control (User/Admin)  
- Protected routes with JWT  
- Secure login/logout  
- Session & token management  

---

### 🔍 Search & Filtering
- Real-time smart search with debounce  
- Category, price, size, color, and rating filters  
- Sorting (price, date, popularity)  

---

### 🛒 Shopping Experience
- Add to cart / wishlist  
- Persistent state via localStorage  
- Real-time cart updates  
- Multi-currency (₹) display and discount support  

---

### 💰 Localization & Formatting
- **Indian Rupee (₹)** – Locale-aware number formatting  

---

## 🎨 Design System

### Colors
- **Primary Blue:** `#2563EB`  
- **Accent Yellow:** `#FACC15`  
- **Neutral Grays** for backgrounds and text  
- Semantic success/error/warning colors  

### Typography
- Custom hierarchy, responsive scaling, readable line heights  

### Design Principles
- Clean, minimal, elegant  
- Consistent spacing and reusable components  

---

## 📱 Responsive Design
- **Mobile-first** layouts  
- Touch-friendly navigation  
- Tablet grid optimization  
- Desktop advanced features (hover, sidebar filters)  

---

## ⚡ Performance & Optimization
- Lazy loading & code splitting  
- Optimized images and assets  
- useMemo/useCallback for memoization  
- Error boundaries & skeleton loading states  
- Debounced search  

---

## 🔄 Micro-Interactions
- Smooth transitions & hover effects  
- Animated cart and modal interactions  
- Toast notifications (Sonner)  

---

## 🧩 Reusable Components
- ProductCard  
- Navbar & Footer  
- Loading Spinner & Error Boundary  
- SEO Head  
- Logout Modal  
- Custom form and UI components  

---

## 💾 Data Management
- **Mock Data System:** 20+ products, categories, user profiles  
- **localStorage Persistence:** cart, wishlist, auth, preferences  

---

## 📊 Admin Features
- CRUD for products, users, and orders  
- Analytics (sales, users, revenue)  
- Inventory tracking  
- Role-based permissions  

---

## 🎯 SEO & Accessibility
- Dynamic meta tags, titles, descriptions  
- Open Graph and semantic HTML  
- ARIA labels & keyboard navigation support  

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

## 🔑 Key Features Explained

### Authentication
- **Customer Account**: Browse products, manage cart, place orders
- **Admin Account**: Access dashboard, manage products and orders
- Demo credentials are built into the system for testing

### Product Catalog
- 20+ diverse products across multiple categories
- High-quality Unsplash images
- Categories: Women's Clothing, Men's Clothing, Accessories, Shoes
- Filters by category, price range, and search

### Shopping Experience
- Product quick view and detailed pages
- Color and size selection
- Stock management display
- Customer reviews and ratings
- Related products suggestions

### Admin Dashboard
- Overview statistics (revenue, orders, customers)
- Product management
- Order tracking and status updates
- Customer list with contact information
- Sales charts and analytics

## 💾 Data Persistence

All user data is stored in browser localStorage:
- `luxe_cart` - Shopping cart items
- `luxe_wishlist` - Saved products
- `luxe_user` - User profile data
- `luxe_auth` - Authentication status



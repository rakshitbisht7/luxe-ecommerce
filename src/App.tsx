import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AuthPages } from './components/AuthPages';
import { ProfilePage } from './components/ProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { LogoutModal } from './components/LogoutModal';
import { WishlistPage } from './components/WishlistPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEOHead } from './components/SEOHead';
import { mockProducts, mockReviews, mockUser, mockOrders } from './data/mockData';
import { CartItem, Product, User } from './types';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

type Page =
  | 'home'
  | 'products'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'signup'
  | 'profile'
  | 'admin'
  | 'wishlist';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('luxe_cart');
      const savedWishlist = localStorage.getItem('luxe_wishlist');
      const savedUser = localStorage.getItem('luxe_user');
      const savedAuth = localStorage.getItem('luxe_auth');

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
      if (savedUser && savedAuth === 'true') {
        setCurrentUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('luxe_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('luxe_wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }, [wishlistItems]);

  // Save user and auth state to localStorage whenever they change
  useEffect(() => {
    try {
      if (currentUser && isLoggedIn) {
        localStorage.setItem('luxe_user', JSON.stringify(currentUser));
        localStorage.setItem('luxe_auth', 'true');
      } else {
        localStorage.removeItem('luxe_user');
        localStorage.removeItem('luxe_auth');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }, [currentUser, isLoggedIn]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: Page, category?: string) => {
    // Check if user needs to be logged in for certain pages
    if ((page === 'profile' || page === 'admin') && !isLoggedIn) {
      toast.error('Please login to continue', {
        description: 'You need to be logged in to access this page',
      });
      setCurrentPage('login');
      return;
    }
    
    // Check if admin access is required
    if (page === 'admin' && currentUser?.role !== 'admin') {
      toast.error('Access Denied', {
        description: 'You need admin privileges to access this page',
      });
      return;
    }
    
    setCurrentPage(page);
    if (page === 'products') {
      setSelectedCategory(category);
      // Clear search when navigating by category
      if (category) {
        setSearchQuery('');
      }
    } else {
      setSelectedCategory(undefined);
      // Clear search when leaving products page
      if (page !== 'products') {
        setSearchQuery('');
      }
    }
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    setSearchQuery(query);
    setSelectedCategory(undefined); // Clear category filter when searching
    setCurrentPage('products');
    toast.success('Searching...', {
      description: `Finding products matching "${query}"`,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
      toast.success('Removed from wishlist', {
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      setWishlistItems([...wishlistItems, product]);
      toast.success('Added to wishlist', {
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const product = wishlistItems.find((item) => item.id === productId);
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    if (product) {
      toast.success('Removed from wishlist', {
        description: `${product.name} has been removed from your wishlist`,
      });
    }
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-details');
  };

  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === (selectedColor || product.colors[0]) &&
        item.selectedSize === (selectedSize || product.sizes[0])
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          product,
          quantity,
          selectedColor: selectedColor || product.colors[0],
          selectedSize: selectedSize || product.sizes[0],
        },
      ]);
    }

    toast.success('Added to cart!', {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
    toast.success('Removed from cart');
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error('Please login to continue', {
        description: 'You need to be logged in to checkout',
      });
      setCurrentPage('login');
      return;
    }
    setCurrentPage('checkout');
  };

  const handlePlaceOrder = () => {
    setCartItems([]);
    toast.success('Order placed successfully!');
    setTimeout(() => {
      setCurrentPage('home');
    }, 3000);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - In real app, this would authenticate with backend
    const user: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : 'customer',
    };
    
    setCurrentUser(user);
    setIsLoggedIn(true);
    
    // Navigate based on role
    if (user.role === 'admin') {
      setCurrentPage('admin');
      toast.success('Welcome Admin!', {
        description: 'You have been logged in to the admin dashboard.',
      });
    } else {
      setCurrentPage('home');
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
      });
    }
  };

  const handleSignup = (name: string, email: string, password: string, role: 'customer' | 'admin') => {
    // Mock signup - In real app, this would create user in backend
    const user: User = {
      id: 'user-' + Date.now(),
      name: name,
      email: email,
      role: role,
    };
    
    setCurrentUser(user);
    setIsLoggedIn(true);
    
    // Navigate based on role
    if (role === 'admin') {
      setCurrentPage('admin');
      toast.success('Admin Account Created!', {
        description: 'Welcome to LUXE Admin Dashboard!',
      });
    } else {
      setCurrentPage('home');
      toast.success('Account created!', {
        description: 'Welcome to LUXE!',
      });
    }
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    console.log('Logout confirmed');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home');
    setShowLogoutModal(false);
    toast.success('Logged out successfully', {
      description: 'Come back soon!',
    });
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleToggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const selectedProduct = mockProducts.find((p) => p.id === selectedProductId);
  const relatedProducts = mockProducts
    .filter((p) => p.id !== selectedProductId && p.category === selectedProduct?.category)
    .slice(0, 4);

  const featuredProducts = mockProducts.filter((p) => p.featured);

  // Render different pages
  const renderPage = () => {
    // Auth pages don't show navbar/footer
    if (currentPage === 'login' || currentPage === 'signup') {
      return (
        <AuthPages
          mode={authMode}
          onToggleMode={handleToggleAuthMode}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      );
    }

    // Admin page has different layout - Protected route
    if (currentPage === 'admin') {
      // Double-check admin access
      if (!isLoggedIn || currentUser?.role !== 'admin') {
        return (
          <>
            <Navbar
              cartItemCount={cartItems.length}
              onNavigate={handleNavigate}
              currentPage="home"
              isLoggedIn={isLoggedIn}
              userRole={currentUser?.role}
              userName={currentUser?.name}
              onLogout={handleLogoutClick}
            />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-8">You need admin privileges to access this page.</p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Home
                </button>
              </div>
            </div>
            <Footer onNavigate={handleNavigate} />
          </>
        );
      }
      
      return (
        <>
          <Navbar
            cartItemCount={cartItems.length}
            wishlistItemCount={wishlistItems.length}
            onNavigate={handleNavigate}
            currentPage={currentPage}
            isLoggedIn={isLoggedIn}
            userRole={currentUser?.role}
            userName={currentUser?.name}
            onLogout={handleLogoutClick}
            onSearch={handleSearch}
            products={mockProducts}
          />
          <AdminDashboard products={mockProducts} orders={mockOrders} />
          <Footer onNavigate={handleNavigate} />
        </>
      );
    }

    // Regular pages with navbar and footer
    return (
      <>
        <Navbar
          cartItemCount={cartItems.length}
          wishlistItemCount={wishlistItems.length}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isLoggedIn={isLoggedIn}
          userRole={currentUser?.role}
          userName={currentUser?.name}
          onLogout={handleLogoutClick}
          onSearch={handleSearch}
          products={mockProducts}
        />
        {currentPage === 'home' && (
          <HomePage
            featuredProducts={featuredProducts}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
          />
        )}
        {currentPage === 'products' && (
          <ProductListingPage
            products={mockProducts}
            onViewProduct={handleViewProduct}
            onAddToCart={handleAddToCart}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
          />
        )}
        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            reviews={mockReviews}
            relatedProducts={relatedProducts}
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onBack={() => setCurrentPage('products')}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
          />
        )}
        {currentPage === 'wishlist' && (
          <WishlistPage
            wishlistItems={wishlistItems}
            onViewProduct={handleViewProduct}
            onAddToCart={handleAddToCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={handleCheckout}
            onContinueShopping={() => setCurrentPage('products')}
          />
        )}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setCurrentPage('cart')}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage
            user={mockUser}
            orders={mockOrders}
            onLogout={handleLogoutClick}
            onUpdateProfile={(user) => console.log('Update profile', user)}
          />
        )}
        <Footer onNavigate={handleNavigate} />
      </>
    );
  };

  // Dynamic SEO based on current page
  const getSEOProps = () => {
    const selectedProduct = mockProducts.find((p) => p.id === selectedProductId);
    
    switch (currentPage) {
      case 'products':
        return {
          title: selectedCategory 
            ? `${selectedCategory} - LUXE Fashion` 
            : 'Shop All Products - LUXE',
          description: 'Browse our premium collection of fashion and lifestyle products.',
        };
      case 'product-details':
        return {
          title: selectedProduct ? `${selectedProduct.name} - LUXE` : 'Product Details - LUXE',
          description: selectedProduct?.description || 'Premium fashion product details',
          ogImage: selectedProduct?.image,
        };
      case 'cart':
        return {
          title: 'Shopping Cart - LUXE',
          description: 'Review your shopping cart and proceed to checkout.',
        };
      case 'wishlist':
        return {
          title: 'My Wishlist - LUXE',
          description: 'Your saved favorite products.',
        };
      case 'profile':
        return {
          title: 'My Account - LUXE',
          description: 'Manage your profile and orders.',
        };
      case 'admin':
        return {
          title: 'Admin Dashboard - LUXE',
          description: 'Manage products, orders, and customers.',
        };
      default:
        return {
          title: 'LUXE - Premium Fashion & Lifestyle',
          description: 'Your destination for premium fashion and lifestyle products. Quality, style, and elegance in every piece.',
        };
    }
  };

  return (
    <ErrorBoundary>
      <SEOHead {...getSEOProps()} />
      <div className="min-h-screen bg-white">
        {renderPage()}
        <Toaster richColors position="top-right" />
        
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          userName={currentUser?.name}
        />
      </div>
    </ErrorBoundary>
  );
}

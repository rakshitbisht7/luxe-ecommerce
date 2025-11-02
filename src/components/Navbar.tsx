import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NavbarProps {
  cartItemCount?: number;
  wishlistItemCount?: number;
  onNavigate: (page: string, category?: string) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  userRole?: 'customer' | 'admin';
  userName?: string;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
  products?: Product[];
}

export function Navbar({ 
  cartItemCount = 0,
  wishlistItemCount = 0,
  onNavigate, 
  currentPage,
  isLoggedIn = false,
  userRole,
  userName,
  onLogout,
  onSearch,
  products = []
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close recommendations when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowRecommendations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      onNavigate('products');
      setShowRecommendations(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowRecommendations(value.trim().length > 0);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.name);
    onSearch?.(product.name);
    onNavigate('products');
    setShowRecommendations(false);
  };

  // Filter products for recommendations
  const recommendations = searchQuery.trim().length > 0
    ? products
        .filter((product) => {
          const query = searchQuery.toLowerCase();
          return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
          );
        })
        .slice(0, 6) // Show max 6 recommendations
    : [];

  const categories = ['Women', 'Men', 'Accessories', 'Shoes', 'Sale'];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center py-2">
        <p className="text-sm">Free Shipping on Orders Over ₹4000 | Use Code: FASHION25</p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <span className="text-white">✦</span>
              </div>
              <span className="text-gray-900 tracking-tight">LUXE</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onNavigate('products', category)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full" ref={searchContainerRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => searchQuery.trim().length > 0 && setShowRecommendations(true)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 z-10"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              {/* Recommendations Dropdown */}
              <AnimatePresence>
                {showRecommendations && recommendations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b">
                        Suggested Products
                      </div>
                      {recommendations.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-left"
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.category} • {product.brand}
                            </p>
                          </div>
                          <div className="text-sm text-blue-600">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No results message */}
              <AnimatePresence>
                {showRecommendations && searchQuery.trim().length > 0 && recommendations.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
                      <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => onNavigate('wishlist')}
              className="relative text-gray-700 hover:text-red-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-500 min-w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {wishlistItemCount}
                </Badge>
              )}
            </button>
            
            {isLoggedIn ? (
              <>
                {userRole === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm">Admin</span>
                  </button>
                )}
                {userRole === 'customer' && (
                  <>
                    <button
                      onClick={() => onNavigate('profile')}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label="Profile"
                    >
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={() => onNavigate('cart')}
                      className="relative text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label="Shopping Cart"
                    >
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                  </>
                )}
                <button
                  onClick={() => onLogout?.()}
                  className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('cart')}
                  className="relative text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Login
                </button>
              </>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onNavigate('products', category);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {category}
                </button>
              ))}

              <div className="pt-4 border-t">
                {isLoggedIn ? (
                  <>
                    {userName && (
                      <div className="px-4 py-2 mb-2 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Logged in as</p>
                        <p className="text-blue-600">{userName}</p>
                        <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                      </div>
                    )}
                    {userRole === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        <User className="w-5 h-5 mr-3" />
                        Admin Dashboard
                      </button>
                    )}
                    {userRole === 'customer' && (
                      <>
                        <button
                          onClick={() => {
                            onNavigate('profile');
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <User className="w-5 h-5 mr-3" />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('wishlist');
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <Heart className="w-5 h-5 mr-3" />
                          Wishlist {wishlistItemCount > 0 && `(${wishlistItemCount})`}
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('cart');
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <ShoppingCart className="w-5 h-5 mr-3" />
                          Cart {cartItemCount > 0 && `(${cartItemCount})`}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onLogout) {
                          onLogout();
                        }
                      }}
                      className="flex items-center w-full px-4 py-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('wishlist');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      Wishlist {wishlistItemCount > 0 && `(${wishlistItemCount})`}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('cart');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      Cart {cartItemCount > 0 && `(${cartItemCount})`}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('login');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

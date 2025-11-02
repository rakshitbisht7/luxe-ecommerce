import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface WishlistPageProps {
  wishlistItems: Product[];
  onViewProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onNavigate: (page: string) => void;
}

export function WishlistPage({
  wishlistItems,
  onViewProduct,
  onAddToCart,
  onRemoveFromWishlist,
  onNavigate,
}: WishlistPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistItems.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products you love by clicking the heart icon on product cards
            </p>
            <Button
              onClick={() => onNavigate('products')}
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </motion.div>
        ) : (
          // Wishlist Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative">
                  <ProductCard
                    product={product}
                    onViewDetails={onViewProduct}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={() => onRemoveFromWishlist(product.id)}
                    isInWishlist={true}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Continue Shopping Button for non-empty wishlist */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => onNavigate('products')}
              variant="outline"
              size="lg"
              className="border-2"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

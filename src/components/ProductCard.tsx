import { Product } from '../types';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ 
  product, 
  onViewDetails, 
  onAddToCart, 
  onToggleWishlist,
  isInWishlist = false 
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-red-500 text-white hover:bg-red-500">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-yellow-400 text-gray-900 hover:bg-yellow-400">
              Featured
            </Badge>
          )}
        </div>

        {/* Like Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all ${
              isInWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-all ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
            />
          </button>
        )}

        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white text-gray-900 hover:bg-gray-100"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div
        onClick={() => onViewDetails(product.id)}
        className="p-4"
      >
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <h3 className="text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 mt-3">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-5 h-5 rounded-full border-2 border-gray-200"
              style={{
                backgroundColor: color.toLowerCase().replace(' ', ''),
              }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

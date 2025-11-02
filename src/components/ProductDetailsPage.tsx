import { useState } from 'react';
import { Product, Review } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailsPageProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  onAddToCart: (product: Product, quantity: number, selectedColor: string, selectedSize: string) => void;
  onViewProduct: (productId: string) => void;
  onBack: () => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistItems?: Product[];
}

export function ProductDetailsPage({
  product,
  reviews,
  relatedProducts,
  onAddToCart,
  onViewProduct,
  onBack,
  onToggleWishlist,
  wishlistItems = [],
}: ProductDetailsPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={onBack} className="hover:text-blue-600">Home</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-blue-600">Products</button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
            >
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 mb-2">{product.brand}</p>
                <h1 className="text-gray-900 mb-4">{product.name}</h1>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <Badge className="bg-red-500 text-white hover:bg-red-500">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-blue-600 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase().replace(' ', ''),
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">Size: {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-12"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900 text-sm">Free Delivery</p>
                  <p className="text-gray-500 text-xs">On orders over ₹4000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900 text-sm">Secure Payment</p>
                  <p className="text-gray-500 text-xs">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900 text-sm">Easy Returns</p>
                  <p className="text-gray-500 text-xs">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews and Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-gray-900 mb-1">{review.userName}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{review.comment}</p>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="description" className="mt-8">
              <div className="prose max-w-none">
                <p className="text-gray-600">{product.description}</p>
                <h4 className="text-gray-900 mt-6 mb-3">Features:</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>Premium quality materials</li>
                  <li>Expert craftsmanship</li>
                  <li>Comfortable fit</li>
                  <li>Easy care instructions</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  We offer free standard shipping on all orders over ₹4000.
                </p>
                <h4 className="text-gray-900 mb-3">Shipping Times:</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days</li>
                  <li>Next Day Delivery: Available in select areas</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onViewDetails={onViewProduct}
                onAddToCart={(p) => onAddToCart(p, 1, p.colors[0], p.sizes[0])}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.some((item) => item.id === relatedProduct.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

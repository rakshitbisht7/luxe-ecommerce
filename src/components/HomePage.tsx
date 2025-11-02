import { ArrowRight, TrendingUp, Award, Truck, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  featuredProducts: Product[];
  onNavigate: (page: string, category?: string) => void;
  onViewProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistItems?: Product[];
}

export function HomePage({ 
  featuredProducts, 
  onNavigate, 
  onViewProduct, 
  onAddToCart, 
  onToggleWishlist,
  wishlistItems = []
}: HomePageProps) {
  const categories = [
    { name: 'Women', image: 'https://images.unsplash.com/photo-1708363390856-172663a263d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tYW4lMjBtb2RlbHxlbnwxfHx8fDE3NjA0MzUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Men', image: 'https://images.unsplash.com/photo-1667690289738-cb8babe14307?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1758817991388-54a98d456317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3NvcmllcyUyMGJhZ3xlbnwxfHx8fDE3NjA0MzUwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1759542890353-35f5568c1c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc2MDM2OTMwMXww&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over ₹4000' },
    { icon: ShieldCheck, title: 'Secure Payment', description: '100% protected' },
    { icon: Award, title: 'Premium Quality', description: 'Guaranteed excellence' },
    { icon: TrendingUp, title: 'Latest Trends', description: 'Updated weekly' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568386396136-0d8ac51c8959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NjAzODIxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white mb-6"
            >
              Elevate Your Style
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-blue-100 text-xl mb-8"
            >
              Discover premium fashion and lifestyle products that define elegance. New collection now available.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Button
                onClick={() => onNavigate('products')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => onNavigate('products')}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                Explore Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find your perfect style</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer h-full"
                onClick={() => onNavigate('products', category.name)}
              >
                <Card className="overflow-hidden border-0 shadow-lg h-full p-0">
                  <div className="relative aspect-square w-full h-full">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                      <div className="p-6 w-full">
                        <h3 className="text-white mb-3">{category.name}</h3>
                        <Button variant="outline" size="sm" className="border-2 border-white text-white bg-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked items just for you</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.some((item) => item.id === product.id)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate('products')}
              size="lg"
              variant="outline"
              className="px-8"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Join thousands of satisfied shoppers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', comment: 'Amazing quality and fast shipping! Will definitely shop again.', rating: 5 },
              { name: 'John D.', comment: 'Best online shopping experience. The products are exactly as described.', rating: 5 },
              { name: 'Emma R.', comment: 'Love the variety and the customer service is top-notch!', rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="text-gray-900">{testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

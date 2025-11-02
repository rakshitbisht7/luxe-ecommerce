import { CartItem } from '../types';
import { Button } from './ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
}: CartPageProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 4000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Start adding some products to your cart!</p>
          <Button onClick={onContinueShopping} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-gray-900 mb-8">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-gray-500 text-sm">{item.product.brand}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span>Color: {item.selectedColor}</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.product.price.toLocaleString('en-IN')} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <Button
              onClick={onContinueShopping}
              variant="outline"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-green-600">
                    🎉 You qualify for free shipping!
                  </p>
                )}
                {shipping > 0 && subtotal < 4000 && (
                  <p className="text-sm text-gray-500">
                    Add ₹{(4000 - subtotal).toLocaleString('en-IN')} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between text-gray-900">
                  <span>Total</span>
                  <span>₹{Math.round(total).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button
                onClick={onCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mb-4"
              >
                Proceed to Checkout
              </Button>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% authentic products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

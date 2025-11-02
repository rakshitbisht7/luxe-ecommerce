import { useState } from 'react';
import { CartItem } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card } from './ui/card';
import { CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onPlaceOrder: () => void;
  onBack: () => void;
}

export function CheckoutPage({ cartItems, onPlaceOrder, onBack }: CheckoutPageProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 4000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setStep('success');
    setTimeout(() => {
      onPlaceOrder();
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-8">Order ID: #ORD-2025-{Math.floor(Math.random() * 10000)}</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900 mb-4">
            ← Back to Cart
          </button>
          <h1 className="text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'address' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'address' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span>Shipping</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {step === 'address' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="p-8">
                  <h2 className="text-gray-900 mb-6">Shipping Address</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Fashion Avenue"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleContinueToPayment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mt-6"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="p-8 mb-6">
                  <h2 className="text-gray-900 mb-6">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <div className="ml-4 flex items-center gap-3 flex-1">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                          <span>Credit / Debit Card</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <RadioGroupItem value="upi" id="upi" />
                        <div className="ml-4 flex items-center gap-3 flex-1">
                          <Smartphone className="w-5 h-5 text-gray-600" />
                          <span>UPI Payment</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <div className="ml-4 flex items-center gap-3 flex-1">
                          <Banknote className="w-5 h-5 text-gray-600" />
                          <span>Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </Card>

                {paymentMethod === 'card' && (
                  <Card className="p-8 mb-6">
                    <h3 className="text-gray-900 mb-4">Card Details</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
                >
                  Place Order - ₹{Math.round(total).toLocaleString('en-IN')}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST)</span>
                  <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between text-gray-900">
                  <span>Total</span>
                  <span>₹{Math.round(total).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

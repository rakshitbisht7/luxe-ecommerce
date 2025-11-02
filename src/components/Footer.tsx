import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface FooterProps {
  onNavigate: (page: string, category?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-400">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 md:w-80"
              />
              <Button 
                onClick={() => {
                  if (email && email.includes('@')) {
                    toast.success('Successfully subscribed!', {
                      description: 'Thank you for subscribing to our newsletter.',
                    });
                    setEmail('');
                  } else {
                    toast.error('Invalid email', {
                      description: 'Please enter a valid email address.',
                    });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white">✦</span>
              </div>
              <span className="text-white tracking-tight">LUXE</span>
            </button>
            <p className="text-gray-400 mb-4">
              Your destination for premium fashion and lifestyle products. Quality, style, and elegance in every piece.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => toast.info('Social Media', { description: 'Follow us on Facebook!' })}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => toast.info('Social Media', { description: 'Follow us on Twitter!' })}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => toast.info('Social Media', { description: 'Follow us on Instagram!' })}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => toast.info('Social Media', { description: 'Subscribe to our YouTube channel!' })}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('products', "Women's Clothing")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Women's Fashion
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('products', "Men's Clothing")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Men's Fashion
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('products', 'Accessories')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('products', 'Shoes')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shoes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('products');
                    toast.info('Sale Items', { description: 'Browse all products for great deals!' });
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => toast.info('Contact Us', { description: 'Email: support@luxe.com | Phone: 1-800-LUXE-SHOP' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Shipping & Returns', { description: 'Free shipping on orders over ₹4000. 30-day return policy.' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Size Guide', { description: 'Please check product details for size charts.' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('profile');
                    toast.info('Track Order', { description: 'View your orders in your profile.' });
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('FAQ', { description: 'Coming soon! For questions, please contact support.' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => toast.info('About Us', { description: 'LUXE - Your destination for premium fashion since 2025.' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Careers', { description: 'Join our team! Send your resume to careers@luxe.com' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Privacy Policy', { description: 'We value your privacy and protect your data.' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Terms of Service', { description: 'Please read our terms before using our services.' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 LUXE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
              <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-8" />
              <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

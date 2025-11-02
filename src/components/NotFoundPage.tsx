import { Home, Search, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl text-blue-600 mb-4">404</h1>
          <h2 className="text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onNavigate('home')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          <Button
            onClick={() => onNavigate('products')}
            variant="outline"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-gray-900 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('products', "Women's Clothing")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              Women's Fashion
            </button>
            <button
              onClick={() => onNavigate('products', "Men's Clothing")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              Men's Fashion
            </button>
            <button
              onClick={() => onNavigate('products', 'Accessories')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              Accessories
            </button>
            <button
              onClick={() => onNavigate('products', 'Shoes')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              Shoes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

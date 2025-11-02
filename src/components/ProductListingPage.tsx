import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface ProductListingPageProps {
  products: Product[];
  onViewProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory?: string;
  searchQuery?: string;
  onToggleWishlist?: (product: Product) => void;
  wishlistItems?: Product[];
}

export function ProductListingPage({ 
  products, 
  onViewProduct, 
  onAddToCart, 
  selectedCategory,
  searchQuery = '',
  onToggleWishlist,
  wishlistItems = []
}: ProductListingPageProps) {
  const [priceRange, setPriceRange] = useState([0, 40000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCategory ? [selectedCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['Women', 'Men', 'Accessories', 'Shoes'];
  const brands = ['Elegance Co.', 'Urban Style', 'LuxeLeather', 'StepStyle', 'VisionLux', 'Chronos'];

  // Update selected categories when selectedCategory prop changes
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
    }
  }, [selectedCategory]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Filter by search query first
  const searchFilteredProducts = searchQuery
    ? products.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
        );
      })
    : products;

  const filteredProducts = searchFilteredProducts.filter(product => {
    // Handle "Sale" category specially - show products with discounts
    if (selectedCategories.includes('Sale')) {
      if (!product.originalPrice) return false;
    } else if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0;
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-gray-900 mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={40000}
          step={500}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="ml-3 text-gray-700 cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-gray-900 mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="ml-3 text-gray-700 cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 500) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedBrands([]);
            setPriceRange([0, 40000]);
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            {selectedCategory ? `${selectedCategory}` : 'All Products'}
          </h1>
          <p className="text-gray-600">Showing {sortedProducts.length} of {products.length} products</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Filters</h2>
                <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(category => (
                  <Button
                    key={category}
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className="gap-2"
                  >
                    {category}
                    <X className="w-3 h-3" />
                  </Button>
                ))}
                {selectedBrands.map(brand => (
                  <Button
                    key={brand}
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleBrand(brand)}
                    className="gap-2"
                  >
                    {brand}
                    <X className="w-3 h-3" />
                  </Button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? `No products match "${searchQuery}". Try a different search term.`
                    : 'No products found matching your filters.'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([0, 40000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Product, Order } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  Search,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
}

export function AdminDashboard({ products, orders }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: DollarSign,
      change: '+12.5%',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingBag,
      change: '+8.2%',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Products',
      value: totalProducts.toString(),
      icon: Package,
      change: '+3.1%',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Avg Order Value',
      value: `₹${Math.round(avgOrderValue).toLocaleString('en-IN')}`,
      icon: TrendingUp,
      change: '+5.4%',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store and monitor performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Recent Orders</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.deliveryAddress.name}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>₹{order.total.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Top Products */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">Top Selling Products</h2>
              <div className="space-y-4">
                {products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-6">{index + 1}</span>
                      <div>
                        <p className="text-gray-900">{product.name}</p>
                        <p className="text-gray-500 text-sm">{product.brand}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                      <p className="text-gray-500 text-sm">{product.reviewCount} reviews</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Product Management</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Products Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter((product) =>
                      product.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <p className="text-gray-900">{product.name}</p>
                            <p className="text-gray-500 text-sm">{product.brand}</p>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          <Badge variant={product.inStock ? 'default' : 'secondary'}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>⭐</span>
                            <span>{product.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">All Orders</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{order.deliveryAddress.name}</p>
                          <p className="text-gray-500 text-sm">{order.deliveryAddress.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>₹{order.total.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">User Management</h2>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alex Thompson</TableCell>
                    <TableCell>alex.thompson@example.com</TableCell>
                    <TableCell>{orders.length}</TableCell>
                    <TableCell>₹{totalRevenue.toLocaleString('en-IN')}</TableCell>
                    <TableCell>Oct 1, 2025</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

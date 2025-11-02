import { User, Order } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User as UserIcon, Package, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  user: User;
  orders: Order[];
  onLogout: () => void;
  onUpdateProfile: (user: User) => void;
}

export function ProfilePage({ user, orders, onLogout, onUpdateProfile }: ProfilePageProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="mb-2">{user.name}</h1>
              <p className="text-blue-100">{user.email}</p>
              <p className="text-blue-100">{user.phone}</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="gap-2">
              <UserIcon className="w-4 h-4" />
              Profile Info
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-8">
              <h2 className="text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    defaultValue={user.phone}
                    className="mt-1"
                  />
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-gray-900 mb-4">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        defaultValue={user.address?.street}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          defaultValue={user.address?.city}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          defaultValue={user.address?.state}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          defaultValue={user.address?.pincode}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <h3 className="text-gray-900 mb-1">Order {order.id}</h3>
                          <p className="text-gray-500 text-sm">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <span className="text-gray-900">₹{order.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-gray-900 mb-1">{item.product.name}</h4>
                              <p className="text-gray-500 text-sm mb-2">
                                {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity}
                              </p>
                              <p className="text-gray-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-6 pt-6 border-t">
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outline" className="flex-1">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600">Start shopping to see your orders here</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-gray-900">Email Notifications</p>
                      <p className="text-gray-500 text-sm">Receive emails about your orders</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-gray-900">Marketing Emails</p>
                      <p className="text-gray-500 text-sm">Receive promotional offers</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-gray-900">SMS Notifications</p>
                      <p className="text-gray-500 text-sm">Get updates via text message</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Security</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Manage Devices
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-red-200">
                <h3 className="text-gray-900 mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

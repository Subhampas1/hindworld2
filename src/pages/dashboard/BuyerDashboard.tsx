import React from 'react';
import { ShoppingCart, Package, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const BuyerDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    { icon: <ShoppingCart className="w-8 h-8" />, label: 'Total Orders', value: '0' },
    { icon: <Package className="w-8 h-8" />, label: 'Active Orders', value: '0' },
    { icon: <Clock className="w-8 h-8" />, label: 'Pending Orders', value: '0' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm space-y-2"
          >
            <div className="flex items-center space-x-2 text-blue-600">
              {stat.icon}
              <h3 className="font-semibold">{stat.label}</h3>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="text-center text-gray-500 py-8">
          No orders yet
        </div>
      </div>
    </div>
  );
};
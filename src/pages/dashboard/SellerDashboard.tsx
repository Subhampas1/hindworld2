import React from 'react';
import { Package, DollarSign, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const SellerDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    { icon: <Package className="w-8 h-8" />, label: 'Total Products', value: '0' },
    { icon: <DollarSign className="w-8 h-8" />, label: 'Total Sales', value: '₹0' },
    { icon: <BarChart3 className="w-8 h-8" />, label: 'Active Orders', value: '0' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <Link to="/products/new">
          <Button>Add New Product</Button>
        </Link>
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
        <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
        <div className="text-center text-gray-500 py-8">
          No products listed yet
        </div>
      </div>
    </div>
  );
};
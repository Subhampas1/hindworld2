import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export const ProductList: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="w-72">
          <Input
            placeholder="Search products..."
            className="pl-10"
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center text-gray-500 col-span-3 py-12">
          No products available yet
        </div>
      </div>
    </div>
  );
};
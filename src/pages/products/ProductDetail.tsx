import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="text-center text-gray-500 py-12">
          Product not found (ID: {id})
        </div>
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
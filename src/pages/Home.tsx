import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted payments and verified sellers for safe trading',
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Large Network',
      description: 'Connect with thousands of verified buyers and sellers across India',
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: 'Business Growth',
      description: 'Analytics and tools to help your business reach new heights',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          India's Premier B2B Trading Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with verified buyers and sellers across India. Grow your business with HindWorld's secure and efficient trading platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register">
            <Button size="lg" className="flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose HindWorld?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p className="text-xl mb-8">Join thousands of successful businesses on HindWorld</p>
        <Link to="/register">
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Create Your Account
          </Button>
        </Link>
      </section>
    </div>
  );
};
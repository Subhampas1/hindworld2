import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, Mail, Phone, Chrome } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { auth } from '../../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { handleGoogleSignIn } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['buyer', 'seller']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [verificationId, setVerificationId] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [verificationStep, setVerificationStep] = useState<'form' | 'otp'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'buyer',
    },
  });

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const sendOTP = async (phoneNumber: string) => {
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setVerificationStep('otp');
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Error sending OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      setVerificationStep('form');
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Error verifying OTP');
    }
  };

  const handleGoogleSignInClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await handleGoogleSignIn();
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      console.log('Registration data:', data);
    } catch (error: any) {
      setError(error.message || 'Error during registration');
    }
  };

  if (verificationStep === 'otp') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-center mb-6">Verify Phone Number</h2>
          <div className="space-y-4">
            <Input
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
            />
            <Button onClick={verifyOTP} className="w-full">
              Verify OTP
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">Create Account</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-full mb-6 flex items-center justify-center space-x-2"
          onClick={handleGoogleSignInClick}
          disabled={loading}
        >
          <Chrome className="w-5 h-5" />
          <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or register with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Phone Number"
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            {...register('phone')}
            error={errors.phone?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="buyer"
                  {...register('role')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Buyer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="seller"
                  {...register('role')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Seller</span>
              </label>
            </div>
          </div>

          <div id="recaptcha-container"></div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
};
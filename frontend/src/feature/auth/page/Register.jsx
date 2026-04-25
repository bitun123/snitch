import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Phone } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import AuthToggle from '../components/AuthToggle';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoogleAuthButton from '../components/GoogleAuthButton';

function Register() {

  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const { loading, error } = authState;

  const { handleRegister } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    console.log('Register Data:', data);

    const { userName, email, password, phone, isSeller } = data;

    try {
      const res = handleRegister({ userName, email, password, phone, isSeller });
      console.log('Registration successful:', res);
      navigate('/login');
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  };

  return (
    <AuthLayout
      subtitle="Join the SNITCH tribe and redefine your style."
      alternativeText="Already have an account?"
      alternativeLink="/login"
      linkText="SIGN IN"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <AuthInput
          label="Username"
          name="userName"
          placeholder="e.g. john_doe"
          icon={User}
          register={register}
          error={errors.userName}
          validation={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Minimum 3 characters' },
          }}
        />

        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="e.g. hello@snitch.com"
          icon={Mail}
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
        />

        <AuthInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="e.g. +1 234 567 890"
          icon={Phone}
          register={register}
          error={errors.phone}
          validation={{
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: 'Invalid phone number',
            },
          }}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          }}
        />

        <div className="py-2">
          <AuthToggle
            label="Register as Seller"
            name="isSeller"
            register={register}
          />
        </div>

        {error && (
          <p className="mt-2 text-[10px] text-red-500 uppercase tracking-tight">
            {error}
          </p>
        )}

        <div className="pt-4">
          <AuthButton type="submit" disabled={!isValid}>
            {loading ? 'Registering...' : 'CREATE ACCOUNT'}
          </AuthButton>
        </div>

        <p className="mt-5 text-[10px] text-gray-400 text-center leading-relaxed">
          By creating an account, you agree to our{' '}
          <span className="text-gray-600 underline cursor-pointer">Terms of Service</span>{' '}
          and{' '}
          <span className="text-gray-600 underline cursor-pointer">Privacy Policy</span>.
        </p>

        <GoogleAuthButton />
      </form>
    </AuthLayout>
  );
}

export default Register;
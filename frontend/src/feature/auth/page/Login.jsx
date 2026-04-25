import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoogleAuthButton from '../components/GoogleAuthButton';

function Login() {

  const { handleLogin } = useAuth();
  const authState = useSelector((state) => state.auth);
  const { loading, error } = authState;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = handleLogin({ email, password });
      console.log('Login successful:', res);
      navigate('/');
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="The wait is over. Sign in to access your curated style."
      alternativeText="New to SNITCH?"
      alternativeLink="/register"
      linkText="CREATE ACCOUNT"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="relative">
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
          <div className="absolute right-0 top-0">
            <a href="#" className="text-[10px] text-gray-400 hover:text-gray-700 transition-colors font-bold uppercase tracking-widest no-underline">
              Forgot?
            </a>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-[10px] text-red-500 uppercase tracking-tight">
            {error}
          </p>
        )}

        <div className="pt-4">
          <AuthButton type="submit" disabled={!isValid}>
            {loading ? 'Logging in...' : 'SIGN IN'}
          </AuthButton>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-full bg-gray-100" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            Secure Login
          </span>
          <div className="h-px w-full bg-gray-100" />
        </div>

        <GoogleAuthButton />
      </form>
    </AuthLayout>
  );
}

export default Login;
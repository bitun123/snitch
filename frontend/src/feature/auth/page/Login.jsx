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
  const navigate = useNavigate(); // Initialize useNavigate for potential future navigation needs
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    // Business logic placeholder

    try {
      const res = handleLogin({ email, password });
      console.log('Login successful:', res);
      // Potential navigation after successful login can be added here, e.g.:
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
            <a href="#" className="text-[10px] text-[#484847] hover:text-[#E3FF00] transition-colors font-bold uppercase tracking-widest">
              Forgot?
            </a>
          </div>
        </div>
        {
          error && (
            <p className="mt-2 text-[10px] text-red-500 font-inter uppercase tracking-tighter">
              {error}
            </p>
          )
        }
        <div className="pt-6">
          <AuthButton type="submit" disabled={!isValid}>
            {loading ? 'Logging in...' : 'SIGN IN'}
          </AuthButton>
        </div>

        <div className="mt-8 flex flex items-center justify-center space-x-4">
          <div className="h-[1px] w-full bg-[#484847]/30"></div>
          <span className="text-[10px] text-[#484847] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            Secure Login
          </span>
         
          <div className="h-[1px] w-full bg-[#484847]/30"></div>
        </div>
         <GoogleAuthButton/>
      </form>
      
    </AuthLayout>
  );
}

export default Login;
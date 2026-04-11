import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, alternativeLink, alternativeText, linkText }) => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center px-6 py-12 font-inter selection:bg-[#E3FF00] selection:text-black">
      {/* Brand Header */}
      <div className="mb-12 text-center">
        <Link to="/" className="inline-block">
          <h1 className="text-4xl md:text-5xl font-extrabold font-manrope tracking-[0.25em] text-white">
            SNITCH<span className="text-[#E3FF00]">.</span>
          </h1>
        </Link>
        <div className="mt-4 h-[1px] w-24 bg-[#E3FF00]/30 mx-auto"></div>
      </div>

      {/* Auth Container */}
      <div className="w-full max-w-md">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold font-manrope text-white mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#adaaaa] text-sm font-medium tracking-tight">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-transparent">
          {children}
        </div>

        {/* Footer Link */}
        <div className="mt-10 text-center border-t border-[#484847]/30 pt-8">
          <p className="text-xs text-[#adaaaa] font-medium uppercase tracking-widest">
            {alternativeText}{' '}
            <Link
              to={alternativeLink}
              className="text-[#E3FF00] hover:text-white transition-colors duration-300 ml-1 font-bold underline underline-offset-4"
            >
              {linkText}
            </Link>
          </p>
        </div>
      </div>

      {/* Minimal Footer Info */}
      <div className="mt-16 flex space-x-8 text-[10px] text-[#484847] font-semibold uppercase tracking-[0.2em]">
        <a href="#" className="hover:text-[#adaaaa] transition-colors">Privacy</a>
        <a href="#" className="hover:text-[#adaaaa] transition-colors">Terms</a>
        <a href="#" className="hover:text-[#adaaaa] transition-colors">Help</a>
      </div>
    </div>
  );
};

export default AuthLayout;

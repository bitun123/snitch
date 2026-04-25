import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, alternativeLink, alternativeText, linkText }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 sm:px-8 py-12 font-[Inter,sans-serif] selection:bg-gray-900 selection:text-white">

      {/* Brand Header */}
      <div className="mb-10 text-center">
        <Link to="/" className="inline-block no-underline">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[Manrope,sans-serif] tracking-[0.22em] text-gray-900 m-0">
            SNITCH<span className="text-gray-300">.</span>
          </h1>
        </Link>
        <div className="mt-4 h-px w-16 bg-gray-100 mx-auto" />
      </div>

      {/* Auth Container */}
      <div className="w-full max-w-md">

        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold font-[Manrope,sans-serif] text-gray-900 mb-2 mt-0">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-sm font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          {children}
        </div>

        {/* Footer Link */}
        <div className="mt-10 text-center border-t border-gray-100 pt-8">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
            {alternativeText}{' '}
            <Link
              to={alternativeLink}
              className="text-gray-800 hover:text-gray-500 transition-colors ml-1 font-bold underline underline-offset-4 no-underline"
            >
              {linkText}
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-14 flex gap-8 text-[10px] text-gray-300 font-semibold uppercase tracking-[0.2em]">
        <a href="#" className="hover:text-gray-500 transition-colors no-underline">Privacy</a>
        <a href="#" className="hover:text-gray-500 transition-colors no-underline">Terms</a>
        <a href="#" className="hover:text-gray-500 transition-colors no-underline">Help</a>
      </div>
    </div>
  );
};

export default AuthLayout;

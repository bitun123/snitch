import React from 'react';

const AuthButton = ({ children, type = 'submit', onClick, isLoading, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full bg-gray-900 hover:bg-gray-700 text-white font-[Manrope,sans-serif] font-bold text-sm uppercase tracking-[0.18em] py-3.5 px-6 rounded-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;

import React from 'react';

const AuthButton = ({ children, type = 'submit', onClick, isLoading, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full bg-[#E3FF00] hover:bg-[#c9e100] text-black font-manrope font-extrabold text-sm uppercase tracking-[0.2em] py-5 px-6 rounded-sm transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(227,255,0,0.1)] hover:shadow-[0_0_30px_rgba(227,255,0,0.2)]"
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;

import React from 'react';

const AuthInput = ({ label, type = 'text', name, register, validation, error, icon: Icon, placeholder }) => {
  return (
    <div className="mb-6 w-full group">
      {label && (
        <label className="block mb-2 text-xs font-semibold uppercase tracking-widest text-[#adaaaa] group-focus-within:text-[#E3FF00] transition-colors duration-300 font-manrope">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#adaaaa] group-focus-within:text-[#E3FF00] transition-colors duration-300">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          {...register(name, validation)}
          className={`w-full bg-[#1a1919] border-b-[1.5px] border-transparent focus:border-[#E3FF00] ${
            Icon ? 'pl-12' : 'pl-4'
          } pr-4 py-4 text-white font-inter text-sm outline-none transition-all duration-300 rounded-t-sm ${
            error ? 'border-red-500' : 'focus:ring-1 focus:ring-[#E3FF00]/10'
          }`}
          placeholder={placeholder}
        />
        <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#E3FF00] group-focus-within:w-full transition-all duration-500"></div>
      </div>
      {error && (
        <p className="mt-2 text-[10px] text-red-500 font-inter uppercase tracking-tighter">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default AuthInput;

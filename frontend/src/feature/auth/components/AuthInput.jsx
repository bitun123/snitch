import React from 'react';

const AuthInput = ({
  label,
  type = 'text',
  name,
  register,
  validation,
  error,
  icon: Icon,
  placeholder,
}) => {
  return (
    <div className="mb-3 w-full group">
      {label && (
        <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-gray-800 transition-colors duration-200 font-[Manrope,sans-serif]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-500 transition-colors duration-200 pointer-events-none">
            <Icon size={15} />
          </div>
        )}
        <input
          type={type}
          {...register(name, validation)}
          placeholder={placeholder}
          className={[
            'w-full bg-white border rounded-lg outline-none transition-all duration-200 text-gray-800 text-sm font-[Inter,sans-serif] py-3.5 pr-4 placeholder:text-gray-300',
            Icon ? 'pl-10' : 'pl-4',
            error
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100',
          ].join(' ')}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-[10px] text-red-500 font-[Inter,sans-serif] uppercase tracking-tight">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default AuthInput;

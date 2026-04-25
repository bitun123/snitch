import React from 'react';

const AuthToggle = ({ label, name, register, description }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 group transition-all duration-200">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-[Manrope,sans-serif] font-bold text-gray-800 tracking-tight uppercase">
          {label}
        </span>
        {description && (
          <span className="text-[10px] text-gray-400 font-medium">
            {description}
          </span>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
      </label>
    </div>
  );
};

export default AuthToggle;

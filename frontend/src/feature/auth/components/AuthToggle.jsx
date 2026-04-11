import React from 'react';

const AuthToggle = ({ label, name, register, description }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#484847]/30 group transition-all duration-300">
      <div className="flex flex-col">
        <span className="text-sm font-manrope font-bold text-white tracking-tight uppercase">
          {label}
        </span>
        {description && (
          <span className="text-[10px] text-[#adaaaa] font-medium tracking-tight mt-0.5">
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
        <div className="w-11 h-6 bg-[#1a1919] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#484847] after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E3FF00] peer-checked:after:bg-black"></div>
      </label>
    </div>
  );
};

export default AuthToggle;

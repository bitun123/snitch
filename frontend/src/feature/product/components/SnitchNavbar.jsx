import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

const SnitchNavbar = () => {
    const user = useSelector((state) => state.auth.user);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 font-[Manrope,sans-serif]">
            <div className="max-w-[1800px] mx-auto px-5 sm:px-8">

                {/* Main Row */}
                <div className="flex items-center h-16 sm:h-18 gap-4 sm:gap-6">

                    {/* Logo */}
                    <Link to="/" className="no-underline shrink-0">
                        <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-[-0.04em] uppercase">
                            SNITCH.
                        </span>
                    </Link>

                    {/* Search — hidden on mobile */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="relative w-full max-w-md">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-lg outline-none text-gray-600 text-[11px] font-semibold tracking-widest uppercase placeholder:text-gray-400 focus:bg-white focus:border-gray-200 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 ml-auto shrink-0">

                        {/* Profile — hidden on mobile */}
                        <Link
                            to={user ? '/profile' : '/login'}
                            className="hidden md:flex items-center gap-3 no-underline"
                        >
                            <div className="w-9 h-9 bg-gray-900 rounded flex items-center justify-center shrink-0">
                                <User size={15} className="text-white" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-bold text-gray-400 tracking-[0.18em] uppercase">
                                    {user ? 'Signed in' : 'Guest'}
                                </span>
                                <span className="text-[11px] font-black text-gray-700 tracking-wider uppercase">
                                    {user ? user.userName : 'Sign In'}
                                </span>
                            </div>
                        </Link>

                        {/* Bag */}
                        <div className="relative cursor-pointer">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <ShoppingBag size={18} className="text-gray-600" />
                            </div>
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-900 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                                0
                            </span>
                        </div>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-4">

                        {/* Mobile Search */}
                        <div className="relative">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-600 text-[11px] font-semibold tracking-widest uppercase placeholder:text-gray-400"
                            />
                        </div>

                        {/* Mobile Profile */}
                        <Link
                            to={user ? '/profile' : '/login'}
                            className="flex items-center gap-3 no-underline"
                            onClick={() => setMobileOpen(false)}
                        >
                            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                                <User size={14} className="text-white" />
                            </div>
                            <span className="text-[12px] font-black text-gray-700 tracking-wider uppercase">
                                {user ? user.userName : 'Sign In'}
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default SnitchNavbar;

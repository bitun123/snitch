import React from 'react';
import { ArrowRight } from 'lucide-react';

const SnitchFooter = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-100 font-[Manrope,sans-serif]">

            {/* Main Grid */}
            <div className="max-w-[1800px] mx-auto px-5 sm:px-8 pt-16 pb-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">

                    {/* Brand — full width on xs, spans 2 cols on sm */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
                        <span className="text-3xl font-black text-gray-900 tracking-[-0.04em] uppercase leading-none">
                            SNITCH.
                        </span>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium max-w-[240px]">
                            Precision-crafted streetwear for those who define culture, not follow it.
                        </p>
                    </div>

                    {/* Collections */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-5">Collections</p>
                        {['New Arrivals', 'Essentials', 'Archive', 'Sale'].map(l => (
                            <a
                                key={l}
                                className="block mb-3 text-[12px] font-semibold text-gray-500 tracking-wide uppercase no-underline hover:text-gray-900 transition-colors cursor-pointer"
                            >{l}</a>
                        ))}
                    </div>

                    {/* Company */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-5">Company</p>
                        {['About Us', 'Sustainability', 'Careers', 'Contact'].map(l => (
                            <a
                                key={l}
                                className="block mb-3 text-[12px] font-semibold text-gray-500 tracking-wide uppercase no-underline hover:text-gray-900 transition-colors cursor-pointer"
                            >{l}</a>
                        ))}
                    </div>

                    {/* Help */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-5">Help</p>
                        {['Shipping', 'Returns', 'Size Guide', 'FAQ'].map(l => (
                            <a
                                key={l}
                                className="block mb-3 text-[12px] font-semibold text-gray-500 tracking-wide uppercase no-underline hover:text-gray-900 transition-colors cursor-pointer"
                            >{l}</a>
                        ))}
                    </div>

                    {/* Newsletter — full width on sm/md */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-3">
                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-1">Newsletter</p>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            Early access to drops and exclusive editorial releases.
                        </p>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded text-gray-700 text-[11px] font-semibold tracking-widest outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
                        />
                        <button className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-700 text-white px-5 py-3.5 text-[10px] font-black tracking-[0.25em] uppercase rounded transition-colors">
                            Subscribe <ArrowRight size={13} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100">
                <div className="max-w-[1800px] mx-auto px-5 sm:px-8 py-5 flex flex-wrap gap-3 items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase">
                        © 2026 Snitch. All rights reserved.
                    </p>
                    <div className="flex gap-6 sm:gap-8 flex-wrap">
                        {['Privacy', 'Terms', 'Cookies'].map(l => (
                            <a
                                key={l}
                                className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase no-underline hover:text-gray-600 transition-colors cursor-pointer"
                            >{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SnitchFooter;

import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const SellerProductCard = ({ product }) => {
    const { title, description, price, images, createdAt } = product;
    const mainImage = images?.[0]?.url || 'https://via.placeholder.com/400x500?text=No+Image';

    return (
        <div className="rounded-lg group relative bg-white border border-[#e1e3e3] hover:shadow-[0_10px_40px_rgba(25,28,29,0.06)] transition-all duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[6/5] overflow-hidden bg-[#f2f4f4]">
                <img
                    src={mainImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-[4px]">
                    <button className="p-3 bg-black text-white shadow-lg hover:bg-[#3c3b3b] transition-all duration-200">
                        <Edit3 size={16} />
                    </button>
                    <button className="p-3 bg-white text-red-600 shadow-lg border border-red-100 hover:bg-red-50 transition-all duration-200">
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-black text-white text-[9px] font-bold uppercase tracking-widest">
                        Live
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <div className="space-y-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#474747]">
                        {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold text-black group-hover:text-[#474747] transition-colors duration-200 line-clamp-1">
                        {title}
                    </h3>
                </div>

                <p className="text-[12px] font-medium text-[#474747] line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="pt-5 border-t border-[#f2f4f4] flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#474747] uppercase tracking-tighter">{price.currency}</span>
                        <span className="text-2xl font-black text-black leading-none">{price.amount.toLocaleString()}</span>
                    </div>
                    <button className="px-4 py-2 bg-[#eceeee] text-black text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200">
                        View Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerProductCard;

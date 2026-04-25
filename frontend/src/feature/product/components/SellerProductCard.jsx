import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellerProductCard = ({ product }) => {

    const navigate = useNavigate();
    const { title, description, price, images, createdAt } = product;
    const mainImage = images?.[0]?.url || 'https://via.placeholder.com/400x500?text=No+Image';

    return (
        <div 
        onClick={() => navigate(`/seller/product/${product._id}`)}
        className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">

            {/* Image */}
            <div className="relative aspect-[6/5] overflow-hidden bg-gray-50">
                <img
                    src={mainImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[3px]">
                    <button className="p-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors shadow-md">
                        <Edit3 size={15} />
                    </button>
                    <button className="p-3 bg-white text-red-500 rounded border border-red-100 hover:bg-red-50 transition-colors shadow-md">
                        <Trash2 size={15} />
                    </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded">
                        Live
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors duration-200 line-clamp-1 m-0">
                        {title}
                    </h3>
                </div>

                <p className="text-[12px] font-medium text-gray-500 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex flex-col gap-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{price.currency}</span>
                        <span className="text-2xl font-black text-gray-900 leading-none">{price.amount.toLocaleString()}</span>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 text-[9px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-200 rounded">
                        View Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerProductCard;

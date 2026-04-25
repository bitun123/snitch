import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';

const PublicProductCard = ({ product }) => {
    const navigate = useNavigate();
    console.log('Rendering PublicProductCard for product:', product);
    const { title, description, price, images, _id
    } = product;
    const mainImage = images?.[0]?.url || null;

    return (
        <div
            onClick={() => navigate(`/product/${_id}`)}
            className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">

            {/* Image */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-300 text-[10px] font-bold tracking-[0.3em] uppercase">No Image</span>
                    </div>
                )}

                {/* Hover Actions */}
                <div className="absolute bottom-0 left-0 right-0 flex opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="flex-1 py-4 bg-gray-900 hover:bg-gray-700 text-white text-[10px] font-black tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-colors">
                        <ShoppingBag size={13} />
                        Add to Bag
                    </button>
                    <button className="px-5 bg-white hover:bg-gray-50 text-gray-600 border-l border-gray-100 transition-colors">
                        <Eye size={16} />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="px-4 pt-4 pb-5 flex flex-col gap-1.5 bg-white">
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-gray-700 text-[12px] font-black uppercase tracking-[0.04em] m-0 flex-1 line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex items-baseline gap-0.5 shrink-0">
                        <span className="text-gray-400 text-[9px] font-bold uppercase">{price?.currency}</span>
                        <span className="text-gray-900 text-base font-black tracking-tight">{price?.amount?.toLocaleString()}</span>
                    </div>
                </div>
                <p className="text-gray-400 text-[11px] font-medium leading-relaxed m-0 line-clamp-1">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default PublicProductCard;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, Package, Search, Filter, LayoutGrid, List, Activity } from 'lucide-react';
import { useProduct } from '../hooks/useproduct';
import SellerProductCard from '../components/SellerProductCard';

function Dashboard() {
    const navigate = useNavigate();
    const { fetchAllProducts } = useProduct();

    const allSellerProducts = useSelector((state) => state.product.allSellerProducts);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        fetchAllProducts();
    }, []);

const products = allSellerProducts.products
console.log("Products in Dashboard:", products);
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased pb-24">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">

                    <div className="flex items-center gap-6 sm:gap-10">
                        <div className="flex flex-col leading-none">
                            <span className="text-xl sm:text-2xl font-black tracking-tighter text-gray-900 uppercase">Snitch</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 mt-0.5">Merchant Console</span>
                        </div>

                        <div className="hidden sm:flex items-center gap-3 border-l border-gray-100 pl-8">
                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded">
                                <Activity size={12} className="text-gray-700" />
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400">Inventory</span>
                                    <span className="text-xs font-black text-gray-900">{products?.length} Items</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/seller/create-product')}
                        className="flex items-center gap-2 sm:gap-3 bg-gray-900 hover:bg-gray-700 text-white px-5 sm:px-8 py-3 sm:py-3.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-200 rounded group"
                    >
                        <Plus size={15} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="hidden xs:inline">Add Product</span>
                        <span className="xs:hidden">Add</span>
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10">

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10 sm:mb-14">
                    <div className="relative group flex-1 max-w-2xl">
                        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-700 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by title, category, or ID..."
                            className="w-full bg-white border border-gray-200 focus:border-gray-400 py-4 pl-11 pr-4 outline-none text-[11px] font-bold transition-all placeholder:text-gray-400 uppercase tracking-widest rounded"
                        />
                    </div>

                    <div className="flex items-center gap-5 sm:gap-8">
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-colors">
                            <Filter size={14} />
                            <span>Filter</span>
                        </button>
                        <div className="h-5 w-px bg-gray-200" />
                        <div className="flex items-center gap-3">
                            <button className="p-2 bg-gray-900 text-white rounded"><LayoutGrid size={16} /></button>
                            <button className="p-2 bg-gray-100 text-gray-500 hover:text-gray-800 rounded transition-colors"><List size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="space-y-4 animate-pulse">
                                <div className="aspect-[4/5] bg-gray-100 rounded-lg" />
                                <div className="space-y-2">
                                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                                    <div className="h-3 bg-gray-100 rounded w-full" />
                                    <div className="h-3 bg-gray-100 rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products?.map((product) => (
                            <SellerProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 sm:py-32 bg-white border-2 border-dashed border-gray-100 rounded-lg">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                            <Package size={28} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 uppercase tracking-tight text-center">
                            No active listings
                        </h3>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 text-center max-w-xs leading-relaxed px-4">
                            Your merchant console is empty. Create your first listing to begin.
                        </p>
                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="bg-gray-900 hover:bg-gray-700 text-white px-10 py-4 text-[11px] font-black uppercase tracking-widest transition-colors duration-200 rounded"
                        >
                            Create First Listing
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-10 p-6 bg-red-50 border border-red-100 rounded text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">Error</p>
                        <p className="text-sm font-bold text-red-600">{error}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;

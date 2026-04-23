import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, Package, Search, Filter, LayoutGrid, List, ChevronRight, Activity } from 'lucide-react';
import { useProduct } from '../hooks/useproduct';
import SellerProductCard from '../components/SellerProductCard';

function Dashboard() {
    const navigate = useNavigate();
    const { fetchAllProducts } = useProduct();
    const { allProducts: sellerData, loading, error } = useSelector((state) => state.product);
    
    const products = sellerData?.products || [];

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafa] text-[#191c1d] antialiased selection:bg-black selection:text-white pb-24">
            
            {/* ── HEADER ──────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white border-b border-[#e1e3e3] shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    
                    <div className="flex items-center space-x-12">
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black tracking-tighter text-black uppercase">Snitch</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#474747] mt-1">Merchant Console</span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8 border-l border-[#e1e3e3] pl-10">
                            <div className="flex items-center space-x-3 bg-[#f2f4f4] px-4 py-2 rounded-sm">
                                <Activity size={12} className="text-black" />
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-bold uppercase tracking-widest text-[#474747]">Inventory</span>
                                    <span className="text-xs font-black text-black">{products.length} Items</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => navigate('/seller/create-product')}
                            className="flex items-center space-x-3 bg-black hover:bg-[#3c3b3b] text-white px-8 py-3.5 transition-all duration-300 group shadow-lg active:scale-95"
                        >
                            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Add Product</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
            <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-2">
                
                {/* ── FILTERS ─────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                    <div className="relative group flex-1 max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#474747] group-focus-within:text-black transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search by title, category, or ID..."
                            className="w-full bg-white border-2 border-[#e1e3e3] focus:border-black py-4 pl-12 pr-4 outline-none text-xs font-bold transition-all placeholder:text-[#474747] uppercase tracking-widest"
                        />
                    </div>
                    
                    <div className="flex items-center space-x-8">
                        <button className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-[#474747] hover:text-black transition-colors">
                            <Filter size={14} />
                            <span>Filter Results</span>
                        </button>
                        <div className="h-6 w-0.5 bg-[#e1e3e3]" />
                        <div className="flex items-center space-x-5">
                            <button className="p-2 bg-black text-white"><LayoutGrid size={18} /></button>
                            <button className="p-2 bg-[#f2f4f4] text-[#474747] hover:text-black transition-colors"><List size={18} /></button>
                        </div>
                    </div>
                </div>

                {/* ── GRID ────────────────────────────────────────── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="space-y-6 animate-pulse">
                                <div className="aspect-[4/5] bg-[#eceeee]" />
                                <div className="space-y-3">
                                    <div className="h-6 bg-[#eceeee] w-3/4" />
                                    <div className="h-4 bg-[#eceeee] w-full" />
                                    <div className="h-4 bg-[#eceeee] w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {products.map((product) => (
                            <SellerProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white border-2 border-dashed border-[#e1e3e3]">
                        <div className="w-20 h-20 bg-[#f8fafa] flex items-center justify-center mb-8">
                            <Package size={32} className="text-[#474747]" />
                        </div>
                        <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-tighter text-center">No active listings found</h3>
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#474747] mb-12 text-center max-w-sm leading-relaxed">
                            Your merchant console is currently empty. Document your first style to begin operations.
                        </p>
                        <button 
                            onClick={() => navigate('/seller/create-product')}
                            className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-[#3c3b3b] transition-all duration-300 shadow-xl"
                        >
                            Create First Listing
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-12 p-8 bg-red-50 border-2 border-red-100 text-red-900 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2">Critical System Error</p>
                        <p className="text-sm font-bold">{error}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;

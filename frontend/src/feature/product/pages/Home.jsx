import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useproduct';
import PublicProductCard from '../components/PublicProductCard';
import SnitchNavbar from '../components/SnitchNavbar';
import SnitchFooter from '../components/SnitchFooter';

function Home() {
    const { products, loading, error } = useSelector((state) => state.product);
    const { getAllProducts } = useProduct();

    useEffect(() => {
        getAllProducts();
    }, []);

    // Loading State
    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-0.5 bg-gray-200 animate-pulse" />
                    <p className="text-gray-400 text-[10px] font-extrabold tracking-[0.5em] uppercase font-[Manrope,sans-serif]">
                        Loading Archive
                    </p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center flex flex-col items-center gap-5">
                    <p className="text-red-500 text-sm font-bold font-[Manrope,sans-serif]">{error}</p>
                    <button
                        onClick={() => getAllProducts()}
                        className="bg-gray-900 hover:bg-gray-700 text-white text-[10px] font-extrabold tracking-[0.3em] uppercase px-10 py-4 rounded transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-[Manrope,sans-serif]">

            <SnitchNavbar />

            <section className="bg-white py-2 sm:py-4 lg:py-6">
                <div className="max-w-[1800px] mx-auto px-5 sm:px-8">

                    {/* Section Header */}
                    <div className="mb-5 sm:mb-7 flex flex-wrap items-end justify-between gap-4">

                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-2">
                            New Collection
                        </p>

                    </div>

                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                            {products.map((product) => (
                                <PublicProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-32 text-center">
                            <div className="w-12 h-0.5 bg-gray-100" />
                            <p className="text-gray-300 text-[11px] font-extrabold tracking-[0.4em] uppercase">
                                The archive is empty.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <SnitchFooter />
        </div>
    );
}

export default Home;

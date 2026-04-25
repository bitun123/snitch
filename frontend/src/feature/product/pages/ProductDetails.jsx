import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useproduct';
import { useSelector } from 'react-redux';
import { ArrowLeft, ShoppingBag, Zap, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import SnitchNavbar from '../components/SnitchNavbar';
import SnitchFooter from '../components/SnitchFooter';

function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const productDetails = useSelector((state) => state.product.productDetails);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    const { handleProductDetails } = useProduct();

    const [activeImage, setActiveImage] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (productId) {
            handleProductDetails(productId);
        }
    }, [productId]);

    useEffect(() => {
        setImageLoaded(false);
    }, [activeImage]);

    const handlePrevImage = () => {
        if (!productDetails?.images?.length) return;
        setActiveImage((prev) => (prev === 0 ? productDetails.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        if (!productDetails?.images?.length) return;
        setActiveImage((prev) => (prev === productDetails.images.length - 1 ? 0 : prev + 1));
    };

    // ─── Loading State ────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-white font-[Manrope,sans-serif]">
                <SnitchNavbar />
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 py-16 sm:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
                        {/* Image skeleton */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-100 rounded-lg" />
                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} className="aspect-square bg-gray-100 rounded" />
                                ))}
                            </div>
                        </div>
                        {/* Info skeleton */}
                        <div className="space-y-6 pt-4">
                            <div className="h-3 bg-gray-100 rounded w-1/4" />
                            <div className="h-9 bg-gray-100 rounded w-3/4" />
                            <div className="h-6 bg-gray-100 rounded w-1/3" />
                            <div className="space-y-2 pt-4">
                                <div className="h-3 bg-gray-100 rounded w-full" />
                                <div className="h-3 bg-gray-100 rounded w-full" />
                                <div className="h-3 bg-gray-100 rounded w-2/3" />
                            </div>
                            <div className="flex gap-4 pt-8">
                                <div className="h-14 bg-gray-100 rounded flex-1" />
                                <div className="h-14 bg-gray-900 rounded flex-1 opacity-20" />
                            </div>
                        </div>
                    </div>
                </div>
                <SnitchFooter />
            </div>
        );
    }

    // ─── Error State ──────────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="min-h-screen bg-white font-[Manrope,sans-serif]">
                <SnitchNavbar />
                <div className="flex flex-col items-center justify-center py-40 gap-6">
                    <div className="w-px h-12 bg-gray-200" />
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400">
                        Failed to Load
                    </p>
                    <p className="text-sm font-semibold text-gray-500">{error}</p>
                    <button
                        onClick={() => handleProductDetails(productId)}
                        className="bg-gray-900 hover:bg-gray-700 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest transition-colors rounded"
                    >
                        Retry
                    </button>
                </div>
                <SnitchFooter />
            </div>
        );
    }

    // ─── No Data ──────────────────────────────────────────────────────────────
    if (!productDetails) return null;

    const { title, description, price, images, createdAt } = productDetails;

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    // ─── Main Page ────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white font-[Manrope,sans-serif]">
            <SnitchNavbar />

            {/* ── Breadcrumb / Back ── */}
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 pt-8 sm:pt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-gray-900 transition-colors group"
                >
                    <ArrowLeft
                        size={13}
                        className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    Back
                </button>
            </div>

            {/* ── Main Grid ── */}
            <main className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 py-8 sm:py-12 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28">

                    {/* ════════════════════════════════════
                        LEFT — Image Gallery
                    ════════════════════════════════════ */}
                    {/* Gallery wrapper: vertical thumbnails LEFT + hero image RIGHT */}
                    <div className="flex lg:flex-row gap-3 sm:gap-4 flex-col-reverse">

                        {/* ── Vertical Thumbnail Strip ── */}
                        {images?.length > 1 && (
                            <div className="flex lg:flex-col flex-row gap-2.5 lg:w-20 sm:w-24 shrink-0 lg:justify-normal justify-center w-[rem] ">
                                {images.map((img, idx) => (
                                    <button
                                        key={img._id || idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square overflow-hidden rounded transition-all duration-200 ${
                                            idx === activeImage
                                                ? 'ring-2 ring-gray-900 ring-offset-1 opacity-100'
                                                : 'opacity-50 hover:opacity-80 hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                                        }`}
                                        aria-label={`Thumbnail ${idx + 1}`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* ── Hero Image ── */}
                        <div className="relative group overflow-hidden rounded-lg bg-gray-50 aspect-square flex-1 min-w-0">
                            {images?.length > 0 ? (
                                <>
                                    <img
                                        key={activeImage}
                                        src={images[activeImage]?.url}
                                        alt={`${title} — view ${activeImage + 1}`}
                                        onLoad={() => setImageLoaded(true)}
                                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                                            imageLoaded ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                                    )}

                                    {/* Image counter badge */}
                                    {images.length > 1 && (
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] font-black tracking-widest text-gray-600 uppercase">
                                            {activeImage + 1} / {images.length}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                                        No Image
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* ════════════════════════════════════
                        RIGHT — Product Info
                    ════════════════════════════════════ */}
                    <div className="flex flex-col gap-0 lg:pt-2">

                        {/* Label */}
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">
                            New Arrival
                        </p>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-gray-900 tracking-tight leading-[1.05] uppercase mb-6">
                            {title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                                ₹{price?.amount?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {price?.currency || 'INR'}
                            </span>
                            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wider">
                                Incl. Taxes
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 mb-8" />

                        {/* Description */}
                        {description && (
                            <div className="mb-8">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">
                                    About this piece
                                </p>
                                <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="h-px bg-gray-100 mb-8" />

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">
                                    Delivery
                                </p>
                                <p className="text-[11px] font-black text-gray-800 uppercase tracking-wide">
                                    Free Shipping
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">
                                    Returns
                                </p>
                                <p className="text-[11px] font-black text-gray-800 uppercase tracking-wide">
                                    7-Day Easy
                                </p>
                            </div>
                        </div>

                        {/* ── Action Buttons ── */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            {/* Add to Cart */}
                            <button
                                id="add-to-cart-btn"
                                type="button"
                                className="flex-1 flex items-center justify-center gap-2.5 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all duration-200 rounded group"
                            >
                                <ShoppingBag
                                    size={15}
                                    className="group-hover:scale-110 transition-transform duration-200"
                                />
                                Add to Cart
                            </button>

                            {/* Buy Now */}
                            <button
                                id="buy-now-btn"
                                type="button"
                                className="flex-1 flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-gray-700 text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all duration-200 rounded group"
                            >
                                <Zap
                                    size={15}
                                    className="group-hover:scale-110 transition-transform duration-200"
                                />
                                Buy Now
                            </button>
                        </div>

                        {/* Share */}
                        <button
                            type="button"
                            className="self-start flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-700 transition-colors"
                        >
                            <Share2 size={12} />
                            Share this product
                        </button>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 my-8" />

                        {/* Listed Date */}
                        {formattedDate && (
                            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                                Listed on {formattedDate}
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <SnitchFooter />
        </div>
    );
}

export default ProductDetails;
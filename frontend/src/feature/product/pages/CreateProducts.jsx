import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductImageUpload from '../components/ProductImageUpload';
import { useProduct } from '../hooks/useproduct';

// ─── Field Sub-components ──────────────────────────────────────────────────────

const FieldLabel = ({ children }) => (
    <div className="flex items-center gap-2 mb-2">
        <span className="w-1 h-1 rounded-full bg-gray-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 shrink-0" />
        <label className="text-[10px] font-[Manrope,sans-serif] font-bold uppercase tracking-[0.28em] text-gray-400 group-focus-within:text-gray-700 transition-colors duration-200">
            {children}
        </label>
    </div>
);

const Underline = () => (
    <div className="h-px mt-1 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-400 -translate-x-full group-focus-within:translate-x-0 transition-transform duration-300 ease-out" />
    </div>
);

const Field = ({ children }) => (
    <div className="group relative pl-3 border-l border-transparent focus-within:border-gray-300 transition-colors duration-300">
        {children}
    </div>
);

// ──────────────────────────────────────────────────────────────────────────────

function CreateProducts() {
    const navigate = useNavigate();
    const { createNewProduct } = useProduct();
    const { loading } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('priceAmount', formData.priceAmount);
        data.append('priceCurrency', formData.priceCurrency);
        images.forEach((file) => data.append('images', file));

        const result = await createNewProduct(data);
        if (result) {
            navigate('/seller/products');
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 antialiased selection:bg-gray-900 selection:text-white">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 h-14 sm:h-16 flex items-center justify-between">

                    {/* Back */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors group"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-[9px] font-[Manrope,sans-serif] uppercase tracking-[0.35em]">Back</span>
                    </button>

                    {/* Brand / Title */}
                    <div className="flex flex-col items-center leading-none gap-0.5">
                        <span className="text-[11px] font-[Manrope,sans-serif] font-black uppercase tracking-[0.5em] text-gray-900">Snitch</span>
                        <span className="text-[8px] font-[Manrope,sans-serif] uppercase tracking-[0.3em] text-gray-400">Create Product</span>
                    </div>

                    {/* Draft pill */}
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                        <span className="hidden sm:block text-[8px] font-[Manrope,sans-serif] uppercase tracking-widest text-gray-400">Draft</span>
                    </div>
                </div>
            </header>

            {/* Body */}
            <main className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-10 sm:py-16 lg:py-20">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-[5fr_1px_6fr] gap-10 lg:gap-0"
                >

                    {/* LEFT — Frames */}
                    <div className="lg:pr-16 space-y-8 lg:sticky lg:top-24 lg:self-start">
                        <div>
                            <p className="text-[9px] font-[Manrope,sans-serif] uppercase tracking-[0.4em] text-gray-300 mb-1">01</p>
                            <h2 className="text-base font-[Manrope,sans-serif] font-bold uppercase tracking-[0.15em] text-gray-800 mt-0 mb-1">Frames</h2>
                            <p className="text-[9px] font-[Manrope,sans-serif] uppercase tracking-widest text-gray-400">
                                Select up to 5 product images
                            </p>
                        </div>
                        <ProductImageUpload onImagesChange={setImages} />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block bg-gray-100" />

                    {/* RIGHT — Details */}
                    <div className="lg:pl-16 space-y-10">
                        <div>
                            <p className="text-[9px] font-[Manrope,sans-serif] uppercase tracking-[0.4em] text-gray-300 mb-1">02</p>
                            <h2 className="text-base font-[Manrope,sans-serif] font-bold uppercase tracking-[0.15em] text-gray-800 mt-0 mb-1">Details</h2>
                            <p className="text-[9px] font-[Manrope,sans-serif] uppercase tracking-widest text-gray-400">
                                Fill in product information
                            </p>
                        </div>

                        {/* Fields */}
                        <div className="space-y-10">

                            {/* Title */}
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <input
                                    value={formData.title}
                                    onChange={handleChange}
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Obsidian Oversized Tee"
                                    autoComplete="off"
                                    className="w-full bg-transparent text-gray-800 text-base font-[Manrope,sans-serif] font-normal outline-none placeholder:text-gray-200 caret-gray-500 py-1"
                                />
                                <Underline />
                            </Field>

                            {/* Description */}
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <textarea
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    placeholder="Describe the material, fit, and story..."
                                    rows={5}
                                    className="w-full bg-transparent text-gray-700 text-sm font-[Inter,sans-serif] font-normal leading-relaxed outline-none placeholder:text-gray-200 resize-none caret-gray-500 py-1"
                                />
                                <Underline />
                            </Field>

                            {/* Price */}
                            <Field>
                                <FieldLabel>Price</FieldLabel>
                                <div className="flex items-center gap-3 py-1">
                                    <input
                                        value={formData.priceAmount ?? ''}
                                        onChange={handleChange}
                                        type="number"
                                        name="priceAmount"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="flex-1 bg-transparent text-gray-800 text-2xl font-[Manrope,sans-serif] font-normal outline-none placeholder:text-gray-200 caret-gray-500"
                                    />
                                    <div className="bg-gray-50 border border-gray-200 rounded">
                                        <select
                                            value={formData.priceCurrency}
                                            onChange={handleChange}
                                            name="priceCurrency"
                                            className="appearance-none bg-transparent text-gray-500 font-[Manrope,sans-serif] text-[9px] uppercase tracking-[0.35em] font-semibold px-4 py-3 outline-none cursor-pointer hover:text-gray-800 focus:text-gray-800 transition-colors"
                                        >
                                            <option value="INR">INR ₹</option>
                                            <option value="USD">USD $</option>
                                            <option value="EUR">EUR €</option>
                                            <option value="GBP">GBP £</option>
                                        </select>
                                    </div>
                                </div>
                                <Underline />
                            </Field>
                        </div>

                        {/* CTA */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative overflow-hidden w-full lg:w-auto lg:px-16 py-4 sm:py-5 bg-gray-900 hover:bg-gray-700 text-white font-[Manrope,sans-serif] font-extrabold text-[11px] uppercase tracking-[0.35em] transition-colors duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed rounded group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                                <span className="relative">
                                    {loading ? 'Publishing...' : 'Publish Product'}
                                </span>
                            </button>

                            <p className="mt-3 text-[8px] font-[Manrope,sans-serif] uppercase tracking-[0.35em] text-gray-300">
                                All fields required before publishing
                            </p>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default CreateProducts;
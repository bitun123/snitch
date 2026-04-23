import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductImageUpload from '../components/ProductImageUpload';
import { useProduct } from '../hooks/useproduct';

// ─── Field components ─────────────────────────────────────────────────────────

// Label: small, tracked, muted → snaps to yellow + shifts left indicator on focus
const FieldLabel = ({ children }) => (
    <div className="flex items-center space-x-2 mb-2">
        {/* Yellow indicator dot – hidden until focused */}
        <span className="w-1 h-1 rounded-full bg-[#E3FF00] opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 shrink-0" />
        <label className="text-[10px] font-manrope font-bold uppercase tracking-[0.28em] text-[#484847] group-focus-within:text-[#E3FF00] transition-colors duration-200">
            {children}
        </label>
    </div>
);

// Underline: thin gray line → full yellow sweep on focus
const Underline = () => (
    <div className="h-px mt-1 bg-[#1a1919] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#E3FF00] -translate-x-full group-focus-within:translate-x-0 transition-transform duration-300 ease-out" />
    </div>
);

// Full field wrapper: adds a subtle left border + faint bg tint on focus
const Field = ({ children }) => (
    <div className="group relative pl-3 border-l border-transparent focus-within:border-[#E3FF00]/40 transition-colors duration-300">
        {children}
    </div>
);


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
        <div className="min-h-screen bg-[#0e0e0e] text-white antialiased selection:bg-[#E3FF00] selection:text-black">

            {/* ── HEADER ──────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-xl border-b border-white/[0.04]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">

                    {/* Back */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-[#484847] hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-[9px] font-manrope uppercase tracking-[0.35em]">Back</span>
                    </button>

                    {/* Brand / Page title */}
                    <div className="flex flex-col items-center leading-none space-y-0.5">
                        <span className="text-[11px] font-manrope font-black uppercase tracking-[0.55em] text-[#E3FF00]">Snitch</span>
                        <span className="text-[8px] font-manrope uppercase tracking-[0.3em] text-[#2c2c2c]">Create Product</span>
                    </div>

                    {/* Status pill */}
                    <div className="flex items-center space-x-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E3FF00] animate-pulse" />
                        <span className="hidden sm:block text-[8px] font-manrope uppercase tracking-widest text-[#484847]">Draft</span>
                    </div>

                </div>
            </header>

            {/* ── BODY ────────────────────────────────────────────────────── */}
            <main className="max-w-[1400px] mx-auto px-6 lg:px-16 py-14 lg:py-20">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-[5fr_1px_6fr] gap-12 lg:gap-0"
                >

                    {/* ── LEFT · Frames ──────────────────────────────────────── */}
                    <div className="lg:pr-16 space-y-10 lg:sticky lg:top-28 lg:self-start">

                        {/* Section label */}
                        <div>
                            <p className="text-[9px] font-manrope uppercase tracking-[0.4em] text-[#2c2c2c] mb-1">01</p>
                            <h2 className="text-base font-manrope font-bold uppercase tracking-[0.15em] text-white">Frames</h2>
                            <p className="text-[9px] font-manrope uppercase tracking-widest text-[#484847] mt-1">
                                Select up to 5 product images
                            </p>
                        </div>

                        <ProductImageUpload onImagesChange={setImages} />
                    </div>

                    {/* ── DIVIDER ─────────────────────────────────────────────── */}
                    <div className="hidden lg:block bg-[#1a1919]" />

                    {/* ── RIGHT · Details ─────────────────────────────────────── */}
                    <div className="lg:pl-16 space-y-12">

                        {/* Section label */}
                        <div>
                            <p className="text-[9px] font-manrope uppercase tracking-[0.4em] text-[#2c2c2c] mb-1">02</p>
                            <h2 className="text-base font-manrope font-bold uppercase tracking-[0.15em] text-white">Details</h2>
                            <p className="text-[9px] font-manrope uppercase tracking-widest text-[#484847] mt-1">
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
                                    className="w-full bg-transparent text-white text-base font-manrope font-normal outline-none placeholder:text-[#2c2c2c] caret-[#E3FF00] py-1"
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
                                    className="w-full bg-transparent text-white text-sm font-inter font-normal leading-relaxed outline-none placeholder:text-[#2c2c2c] resize-none caret-[#E3FF00] py-1"
                                />
                                <Underline />
                            </Field>

                            {/* Price */}
                            <Field>
                                <FieldLabel>Price</FieldLabel>
                                <div className="flex items-center gap-3 py-1">
                                    {/* Amount */}
                                    <input
                                        value={formData.priceAmount ?? ''}
                                        onChange={handleChange}
                                        type="number"
                                        name="priceAmount"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="flex-1 bg-transparent text-white text-2xl font-manrope font-normal outline-none placeholder:text-[#2c2c2c] caret-[#E3FF00]"
                                    />
                                    {/* Currency */}
                                    <div className="bg-[#131313] border border-[#1a1919] group-focus-within:border-[#E3FF00]/30 transition-colors duration-300">
                                        <select
                                            value={formData.priceCurrency}
                                            onChange={handleChange}
                                            name="priceCurrency"
                                            className="appearance-none bg-transparent text-[#adaaaa] font-manrope text-[9px] uppercase tracking-[0.35em] font-semibold px-4 py-3 outline-none cursor-pointer hover:text-[#E3FF00] transition-colors focus:text-[#E3FF00]"
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

                        {/* ── CTA ───────────────────────────────────────────────── */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative overflow-hidden w-full lg:w-auto lg:px-16 py-5 bg-[#E3FF00] text-black font-manrope font-extrabold text-[11px] uppercase tracking-[0.35em] transition-all duration-300 hover:shadow-[0_0_32px_rgba(227,255,0,0.2)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed group"
                            >
                                {/* shine sweep */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
                                <span className="relative">
                                    {loading ? 'Publishing...' : 'Publish Product'}
                                </span>
                            </button>

                            <p className="mt-4 text-[8px] font-manrope uppercase tracking-[0.35em] text-[#2c2c2c]">
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      "I landed four paid gigs within a week of signing up, which is more than I've ever had from an agency. I've been recommending it to everyone I know since!",
    name: 'Mia Schultejohann',
    role: 'Model',
    location: 'Melbourne, Australia',
  },
  {
    quote:
      'Snitch changed how I shop entirely. The curation is impeccable and every piece feels handpicked just for me.',
    name: 'Arjun Mehta',
    role: 'Stylist',
    location: 'Mumbai, India',
  },
  {
    quote:
      'From discovery to delivery, Snitch makes the entire experience feel premium and effortless.',
    name: 'Sofia Lindberg',
    role: 'Fashion Blogger',
    location: 'Stockholm, Sweden',
  },
];

const AuthLayout = ({
  children,
  title,

  alternativeLink,
  alternativeText,
  linkText,
}) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const prev = () =>
    setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[testimonialIndex];

  return (
    <div className="w-full min-h-screen overflow-hidden flex  font-[Inter,sans-serif] selection:bg-red-600 selection:text-white">
      {/* ─── LEFT PANEL ─────────────────────────────────────────── */}
      <div className="min-h-screen  flex flex-col w-full lg:w-[45%] bg-white px-8 sm:px-10 lg:px-14 py-6 overflow-hidden">

        {/* Brand */}
        <div className="mb-2 flex-shrink-0">
          <Link to="/" className="inline-block no-underline">
            <h1 className="text-3xl font-extrabold font-[Manrope,sans-serif] tracking-[0.22em] text-gray-900 m-0 leading-none">
              SNITCH<span className="text-gray-300">.</span>
            </h1>
          </Link>
          <div className="mt-2 h-px w-10 bg-gray-100" />
        </div>

        {/* Title block */}
        <div className="mb-2 lg:mb-2 flex-shrink-0 ">
          <h2 className="text-2xl font-bold font-[Manrope,sans-serif] text-gray-900 mb-1 mt-0 leading-tight">
            {title}
          </h2>

        </div>

        {/* Form content — scrollable so nothing is ever clipped */}
        <div className="flex-1 min-h-0 overflow-hidden pr-1">
          {children}
        </div>

        {/* Footer link */}
        <div className="flex-shrink-0 pt-2 border-t border-gray-100 mb-4">
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest text-center">
            {alternativeText}{' '}
            <Link
              to={alternativeLink}
              className="text-gray-900 hover:text-red-600 transition-colors ml-1 font-bold underline underline-offset-4"
            >
              {linkText}
            </Link>
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Human fashion model ───────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden h-screen">

        {/* Back button */}


        {/* Human clothing model editorial image */}
        <img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&q=90&auto=format&fit=crop"
          alt="Snitch fashion editorial"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=90&auto=format&fit=crop';
          }}
        />

        {/* Subtle neutral gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        {/* Testimonial */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-8">
          <blockquote className="text-white text-sm font-[Inter,sans-serif] font-medium leading-relaxed mb-3 max-w-md">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mb-4">
            <p className="text-white text-sm font-bold font-[Manrope,sans-serif] leading-none mb-0.5">
              {t.name}
            </p>
            <p className="text-white/60 text-xs font-medium">
              {t.role}&nbsp;|&nbsp;{t.location}
            </p>
          </div>

          {/* Carousel controls */}
          <div className="flex gap-2">
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-red-600/70 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/10"
            >
              <ArrowRight size={15} className="text-white" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-red-600/70 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/10"
            >
              <ArrowLeft size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

import React, { useState, useRef } from 'react';

const MAX_IMAGES = 5;

const ProductImageUpload = ({ onImagesChange }) => {
  const [files, setFiles] = useState([]);       // actual File objects
  const [previews, setPreviews] = useState([]);  // object URLs for display
  const inputRef = useRef(null);

  const notify = (nextFiles) => {
    if (onImagesChange) onImagesChange(nextFiles);
  };

  const handleFiles = (incoming) => {
    const selected = Array.from(incoming);
    const remaining = MAX_IMAGES - files.length;
    const toAdd = selected.slice(0, remaining);
    const nextFiles = [...files, ...toAdd];
    const nextPreviews = [...previews, ...toAdd.map((f) => URL.createObjectURL(f))];
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    notify(nextFiles);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const remove = (i) => {
    const nextFiles = files.filter((_, idx) => idx !== i);
    const nextPreviews = previews.filter((_, idx) => idx !== i);
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    notify(nextFiles);
  };

  const canAdd = previews.length < MAX_IMAGES;

  return (
    <div className="space-y-3">
      {/* Counter */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-manrope uppercase tracking-[0.2em] text-[#484847]">
          Images
        </span>
        <span className="text-[9px] font-manrope text-[#2c2c2c]">
          {previews.length} / {MAX_IMAGES}
        </span>
      </div>

      {/* Compact 2-col grid */}
      {previews.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {previews.map((src, i) => (
            <div
              key={src}
              className={`relative group overflow-hidden bg-[#1a1919] ${
                i === 0 && previews.length > 1 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center bg-black/80 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              <span className="absolute bottom-1.5 left-2 text-[8px] font-manrope uppercase tracking-widest text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                {i + 1}
              </span>
            </div>
          ))}

          {/* Inline add slot */}
          {canAdd && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square flex flex-col items-center justify-center border border-dashed border-[#2c2c2c] hover:border-[#E3FF00]/50 text-[#2c2c2c] hover:text-[#E3FF00] transition-all duration-300 group"
            >
              <span className="text-xl leading-none mb-1">+</span>
              <span className="text-[8px] font-manrope uppercase tracking-widest">Add</span>
            </button>
          )}
        </div>
      ) : (
        /* Empty drop zone — compact */
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer border border-dashed border-[#2c2c2c] hover:border-[#E3FF00]/40 transition-colors duration-300 group"
          style={{ height: '200px' }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <div className="text-[#2c2c2c] group-hover:text-[#E3FF00] transition-colors text-2xl leading-none">⊕</div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-manrope uppercase tracking-[0.25em] text-[#484847] group-hover:text-[#E3FF00] transition-colors">
                Drop or Select
              </p>
              <p className="text-[8px] font-manrope uppercase tracking-widest text-[#2c2c2c]">
                Up to 5 images
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add more */}
      {previews.length > 0 && canAdd && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-2.5 text-center text-[9px] font-manrope uppercase tracking-[0.25em] text-[#484847] hover:text-[#E3FF00] border border-[#1a1919] hover:border-[#E3FF00]/20 transition-all duration-300"
        >
          + Add Frame
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ProductImageUpload;

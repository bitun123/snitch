import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useproduct';
import { useSelector } from 'react-redux';
import { 
  Package, 
  Layers, 
  Plus, 
  ChevronRight, 
  Image as ImageIcon, 
  Trash2, 
  X,
  ArrowRight,
  AlertCircle,
  UploadCloud
} from 'lucide-react';



function SellerProductDetails() {
  const { productId } = useParams();
  
  const productDetails = useSelector((state) => state.product.productDetails);
  const { handleProductDetails } = useProduct();

  // Fallback to mock data if productDetails is not yet loaded
  const product = productDetails || {
    _id: productId,
    title: 'Sample Product Title',};

  const [activeImage, setActiveImage] = useState(product?.images ? Object.values(product.images)[0]?.url : '');
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [variants, setVariants] = useState(product?.variants || {});
  
  const [newVariant, setNewVariant] = useState({
    stock: '',
    priceAmount: '',
    attributes: {},
    images: {}
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (productId) {
      handleProductDetails(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product?.images && Object.keys(product.images).length > 0 && !activeImage) {
      setActiveImage(Object.values(product.images)[0].url);
    }
    if (product?.variants) {
      setVariants(product.variants);
    }
  }, [product]);

  const handleUpdateStock = (variantId, newStock) => {
    setVariants(prev => ({
      ...prev,
      [variantId]: { ...prev[variantId], stock: parseInt(newStock) || 0 }
    }));
  };

  const addAttributeField = () => {
    // Generate a unique key name for new attribute
    const newKey = `attribute_${Date.now()}`;
    setNewVariant(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [newKey]: '' }
    }));
  };

  const removeAttributeField = (key) => {
    setNewVariant(prev => {
      const updatedAttributes = { ...prev.attributes };
      delete updatedAttributes[key];
      return { ...prev, attributes: updatedAttributes };
    });
  };
  
  const handleAttributeChange = (key, value) => {
    setNewVariant(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Calculate how many more images we can add
    const currentImageCount = Object.keys(newVariant.images).length;
    const remainingSlots = 5 - currentImageCount;
    const filesToAdd = files.slice(0, remainingSlots);
    
    const newImages = {};
    filesToAdd.forEach((file, idx) => {
      const imageId = `image_${Date.now()}_${idx}`;
      newImages[imageId] = {
        file,
        url: URL.createObjectURL(file) // Create local preview URL
      };
    });

    setNewVariant(prev => ({
      ...prev,
      images: { ...prev.images, ...newImages }
    }));
    
    // Reset file input
    e.target.value = '';
  };

  const removeUploadedImage = (imageId) => {
    setNewVariant(prev => {
      const updatedImages = { ...prev.images };
      URL.revokeObjectURL(updatedImages[imageId].url); // Clean up memory
      delete updatedImages[imageId];
      return { ...prev, images: updatedImages };
    });
  };

  const handleAddVariantSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate attributes: At least one valid key-value pair is required
    const validAttributes = Object.entries(newVariant.attributes).filter(
      ([key, value]) => key.trim() !== '' && value.trim() !== ''
    );
    if (validAttributes.length === 0) {
      setError('At least one valid attribute (e.g., Color, Size) is required.');
      return;
    }

    // Convert array of entries back to object with trimmed values
    const attributesMap = {};
    validAttributes.forEach(([key, value]) => {
      attributesMap[key.trim()] = value.trim();
    });

    const validImages = {};
    Object.entries(newVariant.images).forEach(([imageId, imgData]) => {
      validImages[imageId] = { url: imgData.url };
    });

    const variantId = Date.now().toString();
    const variantToAdd = {
      _id: variantId,
      images: Object.keys(validImages).length > 0 ? validImages : {},
      stock: parseInt(newVariant.stock) || 0,
      attributes: attributesMap,
      // Price is optional. Only include if provided.
      ...(newVariant.priceAmount && { price: { amount: parseFloat(newVariant.priceAmount), currency: 'INR' } })
    };

    setVariants(prev => ({ ...prev, [variantId]: variantToAdd }));
    setShowAddVariant(false);
    
    // Cleanup preview URLs
    Object.values(newVariant.images).forEach(img => URL.revokeObjectURL(img.url));


    // Reset form
    setNewVariant({
      stock: '',
      priceAmount: '',
      attributes: {},
      images: {}
    });
  };

  if (!product) return <div className="p-10 text-center">Loading product details...</div>;

  console.log(variants);

  return (
    <div className="h-screen bg-[#f9f9f9] text-[#2d3435] font-inter overflow-hidden flex flex-col">
      {/* Editorial Header */}
      <header className="px-3 py-2 md:px-8 md:py-5 max-w-7xl mx-auto w-full flex  md:flex-row md:items-center justify-between gap-2 md:gap-3 flex-shrink-0 flex-row">
        <div className="space-y-0.5 md:space-y-1">
          <span className="text-[7px] md:text-[8px] uppercase tracking-[0.1em] font-medium text-[#5f5e5e]/60 block mb-0 md:mb-0.5">Inventory Management</span>
          <h1 className="text-base md:text-xl lg:text-2xl font-serif leading-tight">
            {product.title}
          </h1>
          <p className="text-[9px] md:text-[10px] text-[#5f5e5e]/80 max-w-sm mt-0.5 md:mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-0 md:gap-0.5 flex-shrink-0">
          <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-[#5f5e5e]/50 font-semibold">Ref No.</span>
          <span className="text-xs md:text-sm font-medium tracking-tight">SN-{product._id?.slice(-6).toUpperCase()}</span>
          <div className="mt-1 md:mt-1.5 px-2 md:px-2.5 py-0.5 md:py-1 bg-white rounded-sm text-[8px] md:text-[9px] font-semibold tracking-wide border border-[#f2f4f4] flex items-center gap-1">
            <Package size={10} className="md:size-3 text-[#5f5e5e]" />
            {product.price?.currency} {product.price?.amount?.toLocaleString()}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 w-full overflow-y-auto lg:overflow-hidden">
        
        {/* Left: Image Gallery (Editorial Style) */}
        <div className="lg:col-span-5 flex gap-2 flex-col-reverse lg:flex-row">
          {/* Vertical Thumbnails */}
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 flex-shrink-0 overflow-x-auto lg:overflow-x-visible no-scrollbar">
            {product.images && Object.entries(product.images).map(([imgId, img]) => (
              <button 
                key={imgId} 
                onClick={() => setActiveImage(img.url)}
                className={`w-12 h-12 lg:w-[4rem] lg:h-[4rem] bg-white overflow-hidden transition-all duration-300 flex-shrink-0 ${activeImage === img.url ? 'ring-2 ring-[#5f5e5e] ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
              >
                <img src={img.url} alt={`Gallery ${imgId}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className= "rounded  sm:h-64 md:h-80 lg:h-[35rem] bg-white relative group overflow-hidden shadow-sm flex-1">
            {activeImage && (
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-md text-[8px] uppercase tracking-widest px-2 py-1 font-bold shadow-sm">Main Focus</span>
            </div>
          </div>
        </div>

        {/* Right: Variants & Actions */}
        <div className="lg:col-span-7 space-y-2 lg:space-y-3 flex flex-col lg:overflow-y-auto min-h-0">
          
          {/* Current Inventory Section */}
          <section className="bg-white p-3 md:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#5f5e5e]/10"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-[#5f5e5e]" />
                <h2 className="text-lg font-serif">Current Variants</h2>
              </div>
              <span className="text-[8px] uppercase tracking-widest font-bold bg-[#f2f4f4] px-2 py-0.5 text-[#5f5e5e]">
                {Object.keys(variants).length} SKU{Object.keys(variants).length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-0.5 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-y-visible">
              {Object.keys(variants).length === 0 ? (
                 <p className="text-sm text-gray-400 py-4 italic">No variants created yet.</p>
              ) : (
                Object.entries(variants).map(([variantId, variant]) => (
                  <div key={variantId} className="group py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#f9f9f9] -mx-2 px-2 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 overflow-x-auto max-w-[65px] sm:max-w-[75px] no-scrollbar">
                        {variant.images && Object.keys(variant.images).length > 0 ? (
                          Object.entries(variant.images).map(([imgId, img]) => (
                             <div key={imgId} className="w-6 h-8 shrink-0 bg-[#f2f4f4] overflow-hidden">
                                <img src={img.url} alt="Variant" className="w-full h-full object-cover" />
                             </div>
                          ))
                        ) : (
                          <div className="w-6 h-8 shrink-0 bg-[#f2f4f4] flex items-center justify-center text-[#5f5e5e]/30">
                            <ImageIcon size={10} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex gap-1.5 flex-wrap">
                          {variant.attributes && Object.entries(variant.attributes).map(([key, val]) => (
                            <span key={key} className="text-[8px] font-bold uppercase tracking-tighter text-[#5f5e5e]/60 border border-[#5f5e5e]/10 px-1 py-0.5">
                              {key}: {val}
                            </span>
                          ))}
                        </div>
                        <div className="text-[10px] font-serif tracking-tight text-[#5f5e5e]">
                          {variant.price ? `INR ${variant.price.amount.toLocaleString()}` : <span className="italic text-[8px] opacity-60">Price unassigned</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <label className="text-[7px] uppercase tracking-widest text-[#5f5e5e]/40 font-bold mb-0.5">Stock</label>
                        <input 
                          type="number" 
                          value={variant.stock}
                          onChange={(e) => handleUpdateStock(variantId, e.target.value)}
                          className="w-14 text-right bg-transparent border-b border-[#5f5e5e]/10 py-0.5 font-medium text-sm focus:border-[#5f5e5e] focus:outline-none transition-colors"
                        />
                      </div>
                      <button 
                        onClick={() => setVariants(prev => {
                          const updated = { ...prev };
                          delete updated[variantId];
                          return updated;
                        })}
                        className="p-1 text-[#5f5e5e]/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => setShowAddVariant(!showAddVariant)}
              className="mt-2 w-full py-2 border border-dashed border-[#5f5e5e]/20 text-[#5f5e5e]/60 hover:text-[#5f5e5e] hover:border-[#5f5e5e]/40 hover:bg-[#f9f9f9] transition-all flex items-center justify-center gap-2 group font-medium text-xs"
            >
              {showAddVariant ? <X size={16} /> : <Plus size={16} />}
              {showAddVariant ? 'Cancel' : 'Create New Variant'}
            </button>
          </section>

          {/* Add Variant Form */}
          {showAddVariant && (
            <section className="bg-[#f2f4f4] p-4 md:p-5 relative  animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-serif mb-4 flex items-center gap-2">
                <Plus size={16} className="text-[#5f5e5e]" />
                New Variant Details
              </h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <form onSubmit={handleAddVariantSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] uppercase tracking-widest font-bold text-[#5f5e5e]/60">Stock Level *</label>
                      <input 
                        type="number" 
                        required
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                        placeholder="0" 
                        className="bg-white/50 backdrop-blur-sm border-none px-3 py-2 focus:bg-white transition-all focus:ring-0 text-xs" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] uppercase tracking-widest font-bold text-[#5f5e5e]/60 flex justify-between">
                        Variant Price (INR)
                        <span className="opacity-50">Optional</span>
                      </label>
                      <input 
                        type="number" 
                        value={newVariant.priceAmount}
                        onChange={(e) => setNewVariant({...newVariant, priceAmount: e.target.value})}
                        placeholder="e.g. 2499.98" 
                        className="bg-white/50 backdrop-blur-sm border-none px-3 py-2 focus:bg-white transition-all focus:ring-0 text-xs placeholder-[#5f5e5e]/30" 
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[8px] uppercase tracking-widest font-bold text-[#5f5e5e]/60 flex justify-between w-full">
                          Images
                          <span className="opacity-50">Optional (Up to 5)</span>
                        </label>
                      </div>
                      
                      {Object.keys(newVariant.images).length > 0 && (
            
            <div className="flex flex-wrap gap-1.5 mb-2">
                          {Object.entries(newVariant.images).map(([imageId, img]) => (
                            <div key={imageId} className="relative w-14 h-16 bg-white border border-[#5f5e5e]/10 group shadow-sm ">
                              <img src={img.url} alt={`Preview ${imageId}`} className="w-full h-full object-cover" />
                              <button 
                                type="button" 
                                onClick={() => removeUploadedImage(imageId)} 
                                className="absolute top-0.5 right-0.5 bg-white/90 shadow-sm p-0.5 text-red-500 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* File Upload Dropzone */}
                      {Object.keys(newVariant.images).length < 5 && (
                        <div className="relative mt-1.5">
                          <input 
                            type="file" 
                            accept="image/*" 
                            multiple
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full border border-dashed border-[#5f5e5e]/30 bg-white/50 backdrop-blur-sm px-3 py-4 flex flex-col items-center justify-center text-center gap-1 group hover:border-[#5f5e5e]/60 hover:bg-white/80 transition-all">
                            <UploadCloud size={18} className="text-[#5f5e5e]/40 group-hover:text-[#5f5e5e]/70 transition-colors" />
                            <div className="text-[9px] text-[#5f5e5e] font-medium">
                              <span className="font-bold underline decoration-[#5f5e5e]/30 underline-offset-2">Click to upload</span> or drag and drop
                            </div>
                            <div className="text-[8px] text-[#5f5e5e]/50 uppercase tracking-widest">
                              SVG, PNG, JPG (max {5 - Object.keys(newVariant.images).length} more)
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[8px] uppercase tracking-widest font-bold text-[#5f5e5e]/60">Attributes *</label>
                      <button type="button" onClick={addAttributeField} className="text-[8px] uppercase tracking-widest font-bold text-[#5f5e5e] hover:underline flex items-center gap-0.5">
                        <Plus size={10} /> Add Attribute
                      </button>
                    </div>
                    <p className="text-[9px] text-[#5f5e5e]/60 mt-0.5 mb-2">Define variant options like Color, Size, Storage, Voltage, etc. At least 1 is required.</p>
                    
                    <div className="space-y-2">
                      {Object.entries(newVariant.attributes).map(([key, value]) => (
                        <div key={key} className="flex gap-1.5 items-center group">
                          <input 
                            type="text" 
                            value={key} 
                            onChange={(e) => {
                              const oldKey = key;
                              const newKey = e.target.value;
                              setNewVariant(prev => {
                                const newAttrs = { ...prev.attributes };
                                delete newAttrs[oldKey];
                                newAttrs[newKey] = value;
                                return { ...prev, attributes: newAttrs };
                              });
                            }}
                            placeholder="e.g. Storage"
                            className="flex-1 bg-white/50 backdrop-blur-sm border-none px-2 py-1.5 text-[9px] focus:bg-white focus:ring-0" 
                          />
                          <ArrowRight size={10} className="text-[#5f5e5e]/20" />
                          <input 
                            type="text" 
                            value={value} 
                            onChange={(e) => handleAttributeChange(key, e.target.value)}
                            placeholder="e.g. "
                            className="flex-1 bg-white/50 backdrop-blur-sm border-none px-2 py-1.5 text-[9px] focus:bg-white focus:ring-0" 
                          />
                          <button type="button" onClick={() => removeAttributeField(key)} className="opacity-0 group-hover:opacity-100 p-0.5 text-red-400 hover:text-red-600 transition-all">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button type="submit" className="bg-[#5f5e5e] text-white px-6 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-[#2d3435] transition-all shadow-lg flex items-center gap-2 group cursor-pointer">
                    Confirm & Publish Variant
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default SellerProductDetails;
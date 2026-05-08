import { useState, useRef } from "react";
import { API_URL } from "../../config";

export default function Add_Items() {
  const fileInputRef = useRef(null);

  const categoryOptions = {
    dryfruits: ["Nuts", "Dried Fruits", "Seeds", "Premium Mixes"],
    spices: ["Whole Spices", "Powdered Spices"],
  };

  const [form, setForm] = useState({
    name: "",
    slug: "",
    hindi_name: "",
    description: "",
    short_description: "",
    category: "",
    subcategory: "",
    store_type: "",
    price_100g: "",
    price_250g: "",
    price_500g: "",
    price_1kg: "",
    in_stock: true,
    // is_featured: false,
    // is_bestseller: false,
    // rating: "",
    // review_count: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // const update = (field, value) => {
  //     setForm(prev => ({ ...prev, [field]: value }));
  // };
  const update = (field, value) => {
    if (field === "store_type") {
      setForm((prev) => ({
        ...prev,
        store_type: value,
        category: "",
      }));
    } else if (field === "price_100g") {
      const base = parseFloat(value) || 0;
      setForm((prev) => ({
        ...prev,
        price_100g: value,
        price_250g: base > 0 ? base * 2.5 : "",
        price_500g: base > 0 ? base * 5 : "",
        price_1kg: base > 0 ? base * 10 : "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("image", imageFile);

      const res = await fetch(`${API_URL}/add_products`, {
        method: "POST",
        body: formData, // ❗ no JSON
      });

      const data = await res.json();

      if (res.ok && data.status) {
        alert("Product added successfully!");

        setForm({
          name: "",
          slug: "",
          hindi_name: "",
          description: "",
          short_description: "",
          category: "",
          subcategory: "",
          store_type: "",
          price_100g: "",
          price_250g: "",
          price_500g: "",
          price_1kg: "",
        });
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">
        Add New Product
      </h2>

      <div className="bg-white rounded-xl p-6 border border-brand-gold-light/10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Product Name *"
              required
              className="input-field"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Slug"
              className="input-field"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
            />

            <input
              type="text"
              placeholder="Hindi Name"
              className="input-field"
              value={form.hindi_name}
              onChange={(e) => update("hindi_name", e.target.value)}
            />
          </div>

          {/* Descriptions */}
          <textarea
            placeholder="Short Description"
            className="input-field h-20 resize-none"
            value={form.short_description}
            onChange={(e) => update("short_description", e.target.value)}
          />

          <textarea
            placeholder="Full Description"
            className="input-field h-28 resize-none"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />

          {/* Category Section */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <select
                className="input-field appearance-none pr-10 cursor-pointer"
                value={form.store_type}
                onChange={(e) => update("store_type", e.target.value)}
                required
              >
                <option value="">Select Store Type</option>
                <option value="dryfruits">Dry Fruits</option>
                <option value="spices">Spices</option>
              </select>

              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-brand-brown-dark">
                ▼
              </div>
            </div>

            <div className="relative">
              <select
                className="input-field appearance-none pr-10 cursor-pointer"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                disabled={!form.store_type}
                required
              >
                <option value="">Select Category</option>

                {form.store_type &&
                  categoryOptions[form.store_type]?.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-brand-brown-dark">
                ▼
              </div>
            </div>

            <input
              type="text"
              placeholder="Subcategory"
              className="input-field"
              value={form.subcategory}
              onChange={(e) => update("subcategory", e.target.value)}
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-brand-brown-dark mb-2 block">
              Product Image *
            </label>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="input-field cursor-pointer text-left"
              >
                {imageFile ? imageFile.name : "Choose Product Image"}
              </button>

              {imageFile && (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    fileInputRef.current.value = "";
                  }}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="font-semibold text-brand-brown-dark mb-1">
              Pricing (₹)
            </h3>
            <p className="text-xs text-brand-brown-light/60 mb-3">
              Enter 100g price — other weights auto-calculate. You can still
              edit them manually.
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-brand-brown-light/60 mb-1 block">
                  100g *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 120"
                  className="input-field"
                  required
                  value={form.price_100g}
                  onChange={(e) => update("price_100g", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-brand-brown-light/60 mb-1 block">
                  250g (auto)
                </label>
                <input
                  type="number"
                  placeholder="—"
                  className="input-field bg-brand-cream/40"
                  value={form.price_250g}
                  onChange={(e) => update("price_250g", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-brand-brown-light/60 mb-1 block">
                  500g (auto)
                </label>
                <input
                  type="number"
                  placeholder="—"
                  className="input-field bg-brand-cream/40"
                  value={form.price_500g}
                  onChange={(e) => update("price_500g", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-brand-brown-light/60 mb-1 block">
                  1kg (auto)
                </label>
                <input
                  type="number"
                  placeholder="—"
                  className="input-field bg-brand-cream/40"
                  value={form.price_1kg}
                  onChange={(e) => update("price_1kg", e.target.value)}
                />
              </div>
            </div>
            {form.price_100g > 0 && (
              <div className="mt-2 flex gap-3 flex-wrap">
                {[
                  { label: "100g", val: form.price_100g },
                  { label: "250g", val: form.price_250g },
                  { label: "500g", val: form.price_500g },
                  { label: "1kg", val: form.price_1kg },
                ].map(({ label, val }) => (
                  <span
                    key={label}
                    className="text-xs bg-brand-cream px-3 py-1 rounded-full text-brand-brown-dark"
                  >
                    {label}: <strong>₹{val}</strong>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          {/* <div className="grid md:grid-cols-2 gap-4">
                        <input type="number" step="0.1" max="5"
                            placeholder="Rating (0-5)"
                            className="input-field"
                            value={form.rating}
                            onChange={e => update("rating", e.target.value)} />

                        <input type="number"
                            placeholder="Review Count"
                            className="input-field"
                            value={form.review_count}
                            onChange={e => update("review_count", e.target.value)} />
                    </div> */}

          {/* Toggles */}
          {/* <div className="flex flex-wrap gap-6 text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox"
                                checked={form.in_stock}
                                onChange={e => update("in_stock", e.target.checked)} />
                            In Stock
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox"
                                checked={form.is_featured}
                                onChange={e => update("is_featured", e.target.checked)} />
                            Featured
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox"
                                checked={form.is_bestseller}
                                onChange={e => update("is_bestseller", e.target.checked)} />
                            Bestseller
                        </label>
                    </div> */}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-3 text-base"
          >
            {loading ? "Saving Product..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

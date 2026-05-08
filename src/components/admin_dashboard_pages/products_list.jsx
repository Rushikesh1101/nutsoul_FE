import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { API_URL } from "../../config";

export default function Products_List() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error("Failed to fetch products");
            }

            setProducts(data.products);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Toggle Stock (API)
    const toggleStock = async (id, currentStock) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/products/${id}/stock`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    in_stock: !currentStock,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error("Failed to update stock");
            }

            setProducts((prev) =>
                prev.map((p) =>
                    p._id === id ? { ...p, in_stock: !currentStock } : p
                )
            );

            toast.success("Stock updated!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ Delete Product (API)
    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error("Failed to delete product");
            }

            setProducts((prev) => prev.filter((p) => p._id !== id));
            toast.success("Product deleted");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-brand-cream rounded" />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-brand-brown-dark">
                    Products ({products.length})
                </h2>
                <Link
                    to="/admin/add-product"
                    className="btn-primary !py-2 !px-4 text-sm"
                >
                    + Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-brand-gold-light/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-brand-cream/50">
                                <th className="text-left px-4 py-3 font-semibold">Product</th>
                                <th className="text-left px-4 py-3 font-semibold">Category</th>
                                <th className="text-left px-4 py-3 font-semibold">Store</th>
                                <th className="text-left px-4 py-3 font-semibold">Price (250g)</th>
                                <th className="text-left px-4 py-3 font-semibold">Stock</th>
                                <th className="text-left px-4 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((p) => (
                                <tr
                                    key={p._id}
                                    className="border-t border-brand-gold-light/10 hover:bg-brand-cream/20"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={p.image_url}
                                                alt={p.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-brand-brown-dark">
                                                    {p.name}
                                                </p>
                                                <p className="text-xs text-brand-brown-light/50">
                                                    {p.hindi_name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-brand-brown-light/70">
                                        {p.category}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="badge text-[10px] bg-brand-gold/10 text-brand-gold-dark">
                                            {p.store_type}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 font-semibold">
                                        {formatPrice(p.price_250g)}
                                    </td>

                                    {/* ✅ Stock Column */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => toggleStock(p._id, p.in_stock)}
                                            className={`badge text-[10px] cursor-pointer ${p.in_stock
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {p.in_stock ? "In Stock" : "Out of Stock"}
                                        </button>
                                    </td>

                                    {/* ✅ Actions Column */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => deleteProduct(p._id)}
                                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
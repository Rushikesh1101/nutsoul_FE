import { useState, useRef, useEffect } from "react";
import { API_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { INDIAN_STATES } from "../../utils/helpers";
import toast from "react-hot-toast";


export default function Addresses() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ label: 'Home', name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', pincode: '', is_default: false });

    // Fetch addresses on load
    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user?.email) return;

            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/get_addresses?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!response.ok || !data.success) throw new Error(data.error || "Failed to fetch addresses");

                setAddresses(data.addresses || []);
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchAddresses();
    }, [user?.email]);

    const handleAdd = async () => {
        try {
            const token = localStorage.getItem("token");

            const payload = {
                name: user.name,
                email: user.email,
                role: user.role,
                ...form
            };

            const response = await fetch(`${API_URL}/add_address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to add address");
            }

            // Optionally update local state
            setAddresses(prev => [...prev, data.address]);
            setShowForm(false);
            setForm({ label: "Home", name: "", phone: "", address_line1: "", address_line2: "", city: "", state: "", pincode: "", is_default: false });
            toast.success("Address added!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/delete_address/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.error || "Failed to delete address");

            setAddresses(prev => prev.filter(a => a.id !== id));
            toast.success("Address deleted!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-brand-brown-dark">My Addresses</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary !py-2 !px-4 text-sm">+ Add Address</button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl p-6 border border-brand-gold-light/10 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1 block">Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" /></div>
                        <div><label className="text-sm font-medium mb-1 block">Phone *</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" /></div>
                    </div>
                    <div className="mt-4"><label className="text-sm font-medium mb-1 block">Address *</label><input type="text" value={form.address_line1} onChange={e => setForm({ ...form, address_line1: e.target.value })} className="input-field" /></div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div><label className="text-sm font-medium mb-1 block">City *</label><input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input-field" /></div>
                        <div><label className="text-sm font-medium mb-1 block">State *</label>
                            <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="input-field"><option value="">Select</option>{INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select>
                        </div>
                        <div><label className="text-sm font-medium mb-1 block">Pincode *</label><input type="text" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} className="input-field" maxLength={6} /></div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleAdd} className="btn-primary !py-2">Save</button>
                        <button onClick={() => setShowForm(false)} className="btn-outline !py-2">Cancel</button>
                    </div>
                </div>
            )}

            {addresses.length === 0 && !showForm ? (
                <div className="text-center py-12">
                    <span className="text-5xl mb-3 block">📍</span>
                    <p className="text-brand-brown-light/60">No addresses saved</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {addresses.map(addr => (
                        <div key={addr.id} className="flex items-start justify-between p-4 bg-white rounded-xl border border-brand-gold-light/10">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-brand-brown-dark">{addr.name}</span>
                                    <span className="badge-gold text-[10px]">{addr.label}</span>
                                    {addr.is_default ? <span className="badge-green text-[10px]">Default</span> : null}
                                </div>
                                <p className="text-sm text-brand-brown-light/70 mt-1">{addr.address_line1}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                <p className="text-sm text-brand-brown-light/50">Phone: {addr.phone}</p>
                            </div>
                            <button onClick={() => handleDelete(addr.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
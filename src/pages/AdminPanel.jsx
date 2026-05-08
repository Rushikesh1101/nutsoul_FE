import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getAllProducts } from '../data/products';
import { formatPrice, getOrderStatusColor, getPaymentStatusColor } from '../utils/helpers';
import Add_Items from "../components/admin_dashboard_pages/add_products";
import Products_List from "../components/admin_dashboard_pages/products_list";


function AdminNav() {
  const location = useLocation();
  const links = [
    { to: '/admin', label: 'Dashboard', icon: '📊' },
    { to: '/admin/orders', label: 'Orders', icon: '📦' },
    { to: '/admin/products', label: 'Products', icon: '🏷️' },
    { to: '/admin/customers', label: 'Customers', icon: '👥' },
    { to: '/admin/add-product', label: 'Add Product', icon: '🗂️' },
  ];

  return (
    <div className="bg-brand-brown-dark rounded-2xl p-4 text-brand-cream">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-brand-cream/10">
        <div className="w-10 h-10 rounded-full bg-brand-spice flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
        <div>
          <p className="font-semibold text-sm">Admin Panel</p>
          <p className="text-[10px] text-brand-cream/50">Shubham Dry Fruits</p>
        </div>
      </div>
      <nav className="flex lg:flex-col gap-1 overflow-x-auto">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              location.pathname === link.to ? 'bg-brand-cream/20 text-brand-gold' : 'text-brand-cream/70 hover:bg-brand-cream/10'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('sdf_all_orders') || '[]');
    const users = JSON.parse(localStorage.getItem('sdf_users') || '[]');
    const allProducts = getAllProducts();

    const paidOrders = allOrders.filter(o => o.payment_status === 'paid');
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
    const customers = users.filter(u => u.role === 'customer');
    const pendingOrders = allOrders.filter(o => ['placed', 'confirmed'].includes(o.order_status)).length;
    const pendingPayments = allOrders.filter(o => o.payment_status === 'verification_pending').length;

    setStats({
      stats: {
        totalOrders: allOrders.length,
        totalRevenue,
        totalCustomers: customers.length,
        totalProducts: allProducts.length,
        pendingOrders,
        pendingPayments
      },
      recentOrders: allOrders.slice(0, 10)
    });
    setLoading(false);
  }, []);

  if (loading) return <div className="animate-pulse space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-brand-cream rounded-xl" />)}</div>;
  if (!stats) return <p>Failed to load dashboard</p>;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: stats.stats.totalOrders, color: 'text-blue-600' },
          { label: 'Revenue (Paid)', value: formatPrice(stats.stats.totalRevenue), color: 'text-green-600' },
          { label: 'Customers', value: stats.stats.totalCustomers, color: 'text-purple-600' },
          { label: 'Products', value: stats.stats.totalProducts, color: 'text-brand-gold-dark' },
          { label: 'Pending Orders', value: stats.stats.pendingOrders, color: 'text-orange-600' },
          { label: 'Pending Payments', value: stats.stats.pendingPayments, color: 'text-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-brand-gold-light/10 shadow-sm">
            <p className="text-sm text-brand-brown-light/60">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <h3 className="font-serif text-lg font-semibold text-brand-brown-dark mb-3">Recent Orders</h3>
      <div className="bg-white rounded-xl border border-brand-gold-light/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-cream/50">
                <th className="text-left px-4 py-3 font-semibold text-brand-brown-dark">Order ID</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown-dark">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown-dark">Total</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown-dark">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown-dark">Payment</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-brown-dark">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order.order_id} className="border-t border-brand-gold-light/10 hover:bg-brand-cream/20">
                  <td className="px-4 py-3 font-medium text-brand-gold-dark">{order.order_id}</td>
                  <td className="px-4 py-3">{order.customer_name}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3"><span className={`badge text-[10px] ${getOrderStatusColor(order.order_status)}`}>{order.order_status}</span></td>
                  <td className="px-4 py-3"><span className={`badge text-[10px] ${getPaymentStatusColor(order.payment_status)}`}>{order.payment_status}</span></td>
                  <td className="px-4 py-3 text-brand-brown-light/60">{new Date(order.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    let allOrders = JSON.parse(localStorage.getItem('sdf_all_orders') || '[]');
    if (filter) {
      allOrders = allOrders.filter(o => o.order_status === filter);
    }
    setOrders(allOrders);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const updateOrder = (orderId, updates) => {
    let allOrders = JSON.parse(localStorage.getItem('sdf_all_orders') || '[]');
    allOrders = allOrders.map(o => o.order_id === orderId ? { ...o, ...updates, updated_at: new Date().toISOString() } : o);
    localStorage.setItem('sdf_all_orders', JSON.stringify(allOrders));

    const order = allOrders.find(o => o.order_id === orderId);
    if (order) {
      let userOrders = JSON.parse(localStorage.getItem(`sdf_orders_${order.user_id}`) || '[]');
      userOrders = userOrders.map(o => o.order_id === orderId ? { ...o, ...updates, updated_at: new Date().toISOString() } : o);
      localStorage.setItem(`sdf_orders_${order.user_id}`, JSON.stringify(userOrders));
    }

    toast.success('Order updated!');
    fetchOrders();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-4">Manage Orders</h2>
      <div className="flex gap-2 mb-6 flex-wrap">
        {['', 'placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filter === s ? 'bg-brand-gold text-white' : 'bg-white text-brand-brown border border-brand-gold-light/20'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      {loading ? <div className="animate-pulse space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-brand-cream rounded" />)}</div> : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.order_id} className="bg-white rounded-xl border border-brand-gold-light/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                  <p className="font-bold text-brand-gold-dark">{order.order_id}</p>
                  <p className="text-xs text-brand-brown-light/50">{order.customer_name} ({order.customer_email})</p>
                  <p className="text-xs text-brand-brown-light/50">{new Date(order.created_at).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                  <p className="text-xs text-brand-brown-light/50">Payment: {order.payment_method}</p>
                </div>
              </div>

              <div className="text-sm mb-3">
                {order.items?.map((item, i) => (
                  <span key={i} className="inline-block mr-3 text-brand-brown-light/70">{item.product_name} ({item.weight} x{item.quantity})</span>
                ))}
              </div>

              {order.shipping_name && (
                <p className="text-xs text-brand-brown-light/50 mb-3">Ship to: {order.shipping_name}, {order.shipping_address}, {order.shipping_city} - {order.shipping_pincode}</p>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium mr-2">Order:</span>
                {['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateOrder(order.order_id, { order_status: s })}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${order.order_status === s ? getOrderStatusColor(s) : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                  >
                    {s.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs font-medium mr-2">Payment:</span>
                {['pending', 'paid', 'failed', 'verification_pending'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateOrder(order.order_id, { payment_status: s })}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${order.payment_status === s ? getPaymentStatusColor(s) : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                  >
                    {s.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
              {order.payment_screenshot && (
                <p className="text-xs text-orange-600 mt-2">UPI Ref: {order.payment_screenshot}</p>
              )}
            </div>
          ))}
          {orders.length === 0 && <p className="text-center text-brand-brown-light/60 py-8">No orders found</p>}
        </div>
      )}
    </div>
  );
}

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('sdf_users') || '[]');
    const allOrders = JSON.parse(localStorage.getItem('sdf_all_orders') || '[]');
    const customerList = users.filter(u => u.role === 'customer').map(u => {
      const userOrders = allOrders.filter(o => o.user_id === u.id && o.payment_status === 'paid');
      return {
        ...u,
        order_count: userOrders.length,
        total_spent: userOrders.reduce((sum, o) => sum + o.total, 0)
      };
    });
    setCustomers(customerList);
    setLoading(false);
  }, []);

  if (loading) return <div className="animate-pulse space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-brand-cream rounded" />)}</div>;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">Customers ({customers.length})</h2>
      <div className="bg-white rounded-xl border border-brand-gold-light/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-cream/50">
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Phone</th>
                <th className="text-left px-4 py-3 font-semibold">Orders</th>
                <th className="text-left px-4 py-3 font-semibold">Total Spent</th>
                <th className="text-left px-4 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-t border-brand-gold-light/10 hover:bg-brand-cream/20">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-brand-brown-light/70">{c.email}</td>
                  <td className="px-4 py-3">{c.phone || '-'}</td>
                  <td className="px-4 py-3 font-semibold">{c.order_count}</td>
                  <td className="px-4 py-3 font-semibold text-brand-gold-dark">{formatPrice(c.total_spent)}</td>
                  <td className="px-4 py-3 text-brand-brown-light/60">{new Date(c.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else if (!isAdmin) { toast.error('Admin access required'); navigate('/'); }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <AdminNav />
        </div>
        <div className="lg:col-span-4">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/products" element={<Products_List />} />
            <Route path="/customers" element={<AdminCustomers />} />
            <Route path="/add-product" element={<Add_Items />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatPrice, getOrderStatusColor, getPaymentStatusColor } from '../utils/helpers';
import { API_URL } from '../config';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${API_URL}/order_confirm?order_id=${orderId}&email=${user.email}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setOrder(data.order);
        } else {
          setOrder(null);
        }
      } catch (err) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-20 w-20 rounded-full bg-brand-cream mx-auto mb-4" />
        <div className="h-6 bg-brand-cream rounded w-1/2 mx-auto mb-2" />
        <div className="h-4 bg-brand-cream rounded w-1/3 mx-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-brown-dark">Order not found</h2>
        <Link to="/" className="btn-primary mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-dark mb-2">Order Placed!</h1>
        <p className="text-brand-brown-light/70">Thank you for your order. We'll notify you with updates.</p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-brand-gold-light/10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-brand-brown-light/60">Order ID</p>
            <p className="font-bold text-brand-gold-dark text-lg">{order.order_id}</p>
          </div>
          <div className="text-right">
            <span className={`badge ${getOrderStatusColor(order.order_status)}`}>{order.order_status.replace(/_/g, ' ').toUpperCase()}</span>
            <span className={`badge ${getPaymentStatusColor(order.payment_status)} ml-2`}>{order.payment_status.replace(/_/g, ' ').toUpperCase()}</span>
          </div>
        </div>

        <hr className="border-brand-gold-light/20 mb-4" />

        {/* Items */}
        <div className="space-y-3 mb-4">
          {order.items?.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div>
                <p className="font-medium text-brand-brown-dark">{item.product_name}</p>
                <p className="text-brand-brown-light/50">{item.weight} x {item.quantity}</p>
              </div>
              <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <hr className="border-brand-gold-light/20 mb-4" />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{order.shipping_fee === 0 ? 'FREE' : formatPrice(order.shipping_fee)}</span></div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-brand-gold-light/20">
            <span>Total</span><span className="text-brand-gold-dark">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        {order.shipping_name && (
          <div className="mt-6 p-4 bg-brand-cream/50 rounded-xl">
            <h3 className="text-sm font-semibold text-brand-brown-dark mb-1">Delivery Address</h3>
            <p className="text-sm text-brand-brown-light/70">
              {order.shipping_name}, {order.shipping_phone}<br />
              {order.shipping_address}, {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
          <p className="font-medium">Payment: {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method === 'upi_qr' ? 'UPI Payment' : 'Online Payment'}</p>
          {order.payment_status === 'verification_pending' && (
            <p className="mt-1 text-orange-700">Your UPI payment is being verified. We'll confirm your order shortly.</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8 justify-center">
        <Link to="/dashboard/orders" className="btn-outline">View All Orders</Link>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}

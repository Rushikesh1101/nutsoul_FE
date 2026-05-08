import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // if (form.password.length < 6) {
    //   toast.error('Password must be at least 6 characters');
    //   return;
    // }
    try {
      setLoading(true);
      await register(form.name, form.email, form.phone, form.password);
      toast.success('Registration successful! Welcome!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (form.password !== form.confirmPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }
  //   if (form.password.length < 6) {
  //     toast.error('Password must be at least 6 characters');
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${API_URL}/signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: form.name,
  //         email: form.email,
  //         phone: form.phone,
  //         password: form.password,
  //       }),
  //     });
  
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.error || "Registration failed");
  //     }
  //     toast.success("Registration successful! Welcome!");
  //     navigate("/");
  //   } catch (err) {
  //     toast.error(err.message || "Registration failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold to-brand-almond flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-serif font-bold text-2xl">S</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-brown-dark">Create Account</h1>
          <p className="text-brand-brown-light/60 text-sm mt-1">Join us for premium dry fruits & spices</p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-brand-gold-light/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Full Name *</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="input-field" placeholder="Your full name" required />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Email *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="input-field" placeholder="your@email.com" required />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Phone</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="input-field" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Password *</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} className="input-field" placeholder="Min 6 characters" required />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Confirm Password *</label>
              <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className="input-field" placeholder="Re-enter password" required />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary !py-3.5 text-base">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-brand-brown-light/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-gold hover:text-brand-gold-dark font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

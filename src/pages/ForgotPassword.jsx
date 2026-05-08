import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { findUserByEmail } from '../data/users';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetting, setResetting] = useState(false);

  const handleSendReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = findUserByEmail(email);
      if (!user) {
        toast.error('No account found with this email');
        return;
      }
      toast.success('Email verified! Set your new password.');
      setSent(true);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return; }
    try {
      setResetting(true);
      const users = JSON.parse(localStorage.getItem('sdf_users') || '[]');
      const idx = users.findIndex(u => u.email === email);
      if (idx === -1) { toast.error('User not found'); return; }
      users[idx].password = newPassword;
      localStorage.setItem('sdf_users', JSON.stringify(users));
      toast.success('Password reset successful! Please login.');
      window.location.href = '/login';
    } catch {
      toast.error('Reset failed');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-brand-brown-dark">{sent ? 'Reset Password' : 'Forgot Password'}</h1>
          <p className="text-brand-brown-light/60 text-sm mt-1">
            {sent ? 'Enter your new password' : 'Enter your email to reset your password'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-brand-gold-light/10">
          {!sent ? (
            <form onSubmit={handleSendReset} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" required />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Verifying...' : 'Verify Email'}</button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-brown-dark mb-1 block">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field" placeholder="Min 6 characters" required />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-field" placeholder="Re-enter password" required />
              </div>
              <button type="submit" disabled={resetting} className="w-full btn-primary">{resetting ? 'Resetting...' : 'Reset Password'}</button>
            </form>
          )}

          <p className="text-center text-sm text-brand-brown-light/60 mt-6">
            <Link to="/login" className="text-brand-gold hover:text-brand-gold-dark font-medium">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

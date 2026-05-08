import { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, findUserByEmail, getNextUserId, initializeUsers } from '../data/users';
import { API_URL } from '../config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeUsers();
    const savedUser = localStorage.getItem('sdf_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('sdf_current_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }
    // Save token
    localStorage.setItem("token", data.token);
    localStorage.setItem("sdf_current_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const register = async (name, email, phone, password) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }
  
    // If backend returns token (recommended)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  
    // Save user in state
    if (data.user) {
      setUser(data.user);
      localStorage.setItem("sdf_current_user", JSON.stringify(data.user));
    }
  
    return data;
  };
 

  const updateProfile = async (name, phone) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx].name = name;
      users[idx].phone = phone;
      localStorage.setItem('sdf_users', JSON.stringify(users));
    }
    const updated = { ...user, name, phone };
    setUser(updated);
    localStorage.setItem('sdf_current_user', JSON.stringify(updated));
    return { user: updated };
  };

  const changePassword = async (currentPassword, newPassword) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) throw new Error('User not found');
    if (users[idx].password !== currentPassword) {
      throw new Error('Current password is incorrect.');
    }
    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters.');
    }
    users[idx].password = newPassword;
    localStorage.setItem('sdf_users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, changePassword, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

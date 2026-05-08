const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@shubhamdryfruits.com',
    phone: '9999999999',
    password: 'Admin@123456',
    role: 'admin',
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '9876543210',
    password: 'Demo@123456',
    role: 'customer',
    created_at: '2024-01-01T00:00:00.000Z'
  }
];

export function initializeUsers() {
  const existing = localStorage.getItem('sdf_users');
  if (!existing) {
    localStorage.setItem('sdf_users', JSON.stringify(DEFAULT_USERS));
  }
}

export function getUsers() {
  initializeUsers();
  return JSON.parse(localStorage.getItem('sdf_users') || '[]');
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getNextUserId() {
  const users = getUsers();
  return Math.max(...users.map(u => u.id), 0) + 1;
}

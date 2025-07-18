// src/data/users.js
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin', // في بيئة الإنتاج، يجب أن تكون كلمات المرور مشفرة
    role: 'admin',
    email: 'admin@example.com',
    lastLogin: '2025-07-01 10:00:00',
  },
  {
    id: 2,
    username: 'editor',
    password: 'password123',
    role: 'editor',
    email: 'editor@example.com',
    lastLogin: '2025-06-28 14:30:00',
  },
  {
    id: 3,
    username: 'viewer',
    password: 'viewer123',
    role: 'viewer',
    email: 'viewer@example.com',
    lastLogin: '2025-06-29 09:15:00',
  },
];

export default users;

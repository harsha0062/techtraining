import React, { useState, useEffect } from 'react';
import {
    Users as UsersIcon,
    PlusCircle,
    AlertCircle
} from 'lucide-react';

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/user/all');
            if (response.ok) {
                const data = await response.json();
                setAllUsers(data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                setIsUserModalOpen(false);
                setNewUser({ name: '', email: '', password: '', role: 'USER' });
                fetchUsers();
            }
        } catch (error) {
            console.error("Error registering user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="data-section">
            <div className="data-header">
                <h3>User Directory ({allUsers.length})</h3>
                <button className="primary-btn" style={{ backgroundColor: '#10b981' }} onClick={() => setIsUserModalOpen(true)}>
                    <PlusCircle size={18} />
                    Register New User
                </button>
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.length > 0 ? allUsers.map((user) => (
                            <tr key={user.id}>
                                <td>#{user.id}</td>
                                <td style={{ fontWeight: '500' }}>{user.name || 'N/A'}</td>
                                <td>{user.email || 'N/A'}</td>
                                <td>
                                    <span className="badge" style={{ backgroundColor: '#e2e8f0', color: '#475569' }}>
                                        {user.role || 'USER'}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <AlertCircle size={32} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                                    <p style={{ color: '#64748b' }}>No users registered yet.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* User Registration Modal */}
            {isUserModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '32px', borderRadius: '16px',
                        width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Register New User</h2>
                        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.925rem' }}>Enter user details below.</p>

                        <form onSubmit={handleRegisterUser}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Full Name</label>
                                <input
                                    type="text" required placeholder="John Doe"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Email Address</label>
                                <input
                                    type="email" required placeholder="john@example.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Password</label>
                                <input
                                    type="password" required placeholder="••••••••"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button
                                    type="button" onClick={() => setIsUserModalOpen(false)}
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '600' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" disabled={isSubmitting}
                                    style={{ flex: 2, padding: '12px', borderRadius: '8px', backgroundColor: '#10b981', color: 'white', fontWeight: '600', opacity: isSubmitting ? 0.7 : 1 }}
                                >
                                    {isSubmitting ? 'Registering...' : 'Register User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;

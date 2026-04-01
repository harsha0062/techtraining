import React, { useState, useEffect } from 'react';
import {
    Users,
    ShieldCheck,
    FileText,
    PlusCircle,
    AlertCircle
} from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        licenses: 0,
        documents: 0
    });
    const [recentLicenses, setRecentLicenses] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    const fetchData = async () => {
        try {
            const [usersRes, licenseRes, docCountRes] = await Promise.all([
                fetch('/api/user/all').catch(() => null),
                fetch('/api/license/all').catch(() => null),
                fetch('/api/documents/count').catch(() => null)
            ]);

            const usersData = usersRes && usersRes.ok ? await usersRes.json() : [];
            const licenseData = licenseRes && licenseRes.ok ? await licenseRes.json() : [];
            const docCount = docCountRes && docCountRes.ok ? await docCountRes.json() : 0;

            setStats({
                users: usersData.length,
                licenses: licenseData.length,
                documents: docCount
            });

            setRecentLicenses(licenseData.slice(-5).reverse());
            setRecentUsers(usersData.slice(-5).reverse());

        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* Key Metrics Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <Users size={28} />
                    </div>
                    <div className="stat-info">
                        <h3>Total Users</h3>
                        <p>{stats.users}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}>
                        <ShieldCheck size={28} />
                    </div>
                    <div className="stat-info">
                        <h3>Active Licenses</h3>
                        <p>{stats.licenses}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#d1fae5', color: '#10b981' }}>
                        <FileText size={28} />
                    </div>
                    <div className="stat-info">
                        <h3>Documents Uploaded</h3>
                        <p>{stats.documents}</p>
                    </div>
                </div>
            </div>

            {/* Recent Licenses Table */}
            <div className="data-section">
                <div className="data-header">
                    <h3>Recent Licenses</h3>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>License ID</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Applicant ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLicenses.length > 0 ? recentLicenses.map((lic) => (
                                <tr key={lic.id}>
                                    <td>#{lic.id}</td>
                                    <td>{lic.licenseType || 'Commercial'}</td>
                                    <td>
                                        <span className={`badge ${lic.status === 'APPROVED' ? 'badge-success' : lic.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`}>
                                            {lic.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>{lic.userId}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <AlertCircle size={32} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                                        <p style={{ color: '#64748b' }}>No recent licenses found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Users Table */}
            <div className="data-section">
                <div className="data-header">
                    <h3>Recent Users</h3>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.length > 0 ? recentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>#{user.id}</td>
                                    <td style={{ fontWeight: '500' }}>{user.name || 'N/A'}</td>
                                    <td>{user.email || 'N/A'}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <AlertCircle size={32} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                                        <p style={{ color: '#64748b' }}>No users registered yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

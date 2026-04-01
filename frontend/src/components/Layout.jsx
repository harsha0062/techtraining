import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FileText,
    Users,
    ShieldCheck,
    LayoutDashboard,
    Settings,
    Search,
    Bell,
    FileCheck2,
    LogOut
} from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <ShieldCheck size={28} color="#3b82f6" />
                    <h2>LicensePro</h2>
                </div>
                <nav className="nav-menu">
                    <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link to="/users" className={`nav-item ${isActive('/users') ? 'active' : ''}`}>
                        <Users size={20} />
                        Users
                    </Link>
                    <Link to="/licenses" className={`nav-item ${isActive('/licenses') ? 'active' : ''}`}>
                        <FileCheck2 size={20} />
                        Licenses
                    </Link>
                    <Link to="/documents" className={`nav-item ${isActive('/documents') ? 'active' : ''}`}>
                        <FileText size={20} />
                        Documents
                    </Link>
                    <div style={{ flex: 1 }}></div>
                    <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
                        <Settings size={20} />
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="nav-item logout-btn" style={{ marginTop: 'auto', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                {/* Top Navbar */}
                <header className="topbar">
                    <h1 className="page-title">
                        {isActive('/') && 'Dashboard Overview'}
                        {isActive('/users') && 'User Management'}
                        {isActive('/licenses') && 'License Management'}
                        {isActive('/documents') && 'Document Repository'}
                        {isActive('/settings') && 'Settings'}
                    </h1>
                    <div className="user-profile">
                        <Search size={20} color="#64748b" style={{ cursor: 'pointer' }} />
                        <Bell size={20} color="#64748b" style={{ cursor: 'pointer', margin: '0 16px' }} />
                        <div className="avatar" title={user.email}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
                        <div className="user-info-text" style={{ marginLeft: '12px' }}>
                            <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>{user.name || 'User'}</span>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>{user.role || 'Member'}</span>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content Area */}
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;

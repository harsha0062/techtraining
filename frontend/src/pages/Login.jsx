import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const user = await response.json();

            if (user && user.id) {
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('Connection failed. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <ShieldCheck size={40} color="#3b82f6" />
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Login to manage your licenses with ease.</p>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="label-row">
                            <label>Password</label>
                            <a href="#" className="forgot-link">Forgot?</a>
                        </div>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            <>
                                Sign In
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Create one now</Link></p>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
        </div>
    );
};

export default Login;

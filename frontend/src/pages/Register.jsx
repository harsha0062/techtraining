import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, UserPlus, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                setError('Registration failed. Email might already be in use.');
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
                    <h1>Join LicensePro</h1>
                    <p>Create your account and start managing licenses.</p>
                </div>

                <form onSubmit={handleRegister} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn register-btn" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            <>
                                Create Account
                                <UserPlus size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign in here</Link></p>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
        </div>
    );
};

export default Register;

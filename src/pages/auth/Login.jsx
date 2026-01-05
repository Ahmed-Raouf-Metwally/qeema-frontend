import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Login = () => {
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(formData.phone, formData.password);
        setLoading(false);

        if (result.success) {
            try {
                const storedUser = localStorage.getItem('user');
                let user = null;
                if (storedUser && storedUser !== "undefined") {
                    user = JSON.parse(storedUser);
                }

                if (user?.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } catch (e) {
                console.error("Login redirect error", e);
                navigate('/'); // Fallback
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Phone Number"
                    name="phone"
                    type="text"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Button type="submit" className="w-full mt-2" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-700 font-medium hover:underline">
                    Register (Student)
                </Link>
            </div>
        </div>
    );
};

export default Login;

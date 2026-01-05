import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        class: '',
        year: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        const result = await register({
            fullName: formData.fullName,
            phone: formData.phone,
            password: formData.password,
            class: formData.class,
            year: formData.year
        });
        setLoading(false);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Class"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        placeholder="e.g. 10A"
                    />
                    <Input
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="e.g. 2024"
                    />
                </div>

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Register'}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-700 font-medium hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const StudentProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        class: '',
        year: '',
        profileImage: '' // URL or base64
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        // Populate form with user data, better to fetch fresh
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('/profile');
            setFormData(res.data.data);
        } catch (e) {
            console.error("Fetch profile error", e);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await axios.put('/profile', formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                <p className="text-slate-500 mt-1">Manage your personal information.</p>
            </div>

            <div className="card p-6 md:p-8">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg text-sm border ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Preview Area */}
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                            {formData.profileImage ? (
                                <img src={formData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold text-2xl">
                                    {formData.fullName?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <Input
                                label="Profile Image URL"
                                name="profileImage"
                                value={formData.profileImage || ''}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                            <p className="text-xs text-slate-500 mt-1">Enter a valid image URL to verify preview.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            disabled // Often unique ID, disable or require strict validation
                            className="opacity-75 bg-slate-50"
                        />
                        <Input
                            label="Class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                        />
                        <Input
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentProfile;

import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AdminSchoolProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        logo: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSchool();
    }, []);

    const fetchSchool = async () => {
        try {
            const res = await axios.get('/admin/school');
            // Assuming endpoint returns the singleton school object
            if (res.data.data) setFormData(res.data.data);
        } catch (e) { console.error("Fetch school error", e); }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.put('/admin/school', formData);
            setMessage('School profile updated successfully!');
        } catch (error) {
            setMessage('Failed to update school profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">School Profile</h1>

            <div className="card p-8">
                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm border ${message.includes('success')
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Logo Preview */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-24 w-24 bg-slate-100 rounded-xl overflow-hidden mb-4 border border-slate-200 flex items-center justify-center">
                            {formData.logo ? (
                                <img src={formData.logo} alt="Logo" className="h-full w-full object-contain" />
                            ) : (
                                <span className="text-slate-400 text-xs">No Logo</span>
                            )}
                        </div>
                        <Input
                            label="Logo URL"
                            name="logo"
                            value={formData.logo || ''}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

                    <Input
                        label="School Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Contact Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSchoolProfile;

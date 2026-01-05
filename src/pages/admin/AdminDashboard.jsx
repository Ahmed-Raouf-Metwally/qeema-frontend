import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalLessons: 0,
        totalFavorites: 0
    });

    useEffect(() => {
        // Determine if we have a single stats endpoint or need to aggregate
        // Assuming /admin/dashboard/stats exists or we fetch counts
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get('/admin/stats');
            if (res.data.data) {
                setStats(res.data.data);
            }
        } catch (error) {
            console.error("Fetch stats error", error);
        }
    };

    const StatCard = ({ label, value, colorClass }) => (
        <div className="card p-6 border-l-4" style={{ borderLeftColor: colorClass }}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Students"
                    value={stats.totalStudents}
                    colorClass="#2563eb" // blue-600
                />
                <StatCard
                    label="Total Lessons"
                    value={stats.totalLessons}
                    colorClass="#ea580c" // orange-600
                />
                <StatCard
                    label="Total Favorites"
                    value={stats.totalFavorites}
                    colorClass="#ec4899" // pink-500
                />
            </div>
        </div>
    );
};

export default AdminDashboard;

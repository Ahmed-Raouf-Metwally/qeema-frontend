import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [page]); // Add search to deps if server-side search

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/admin/students?page=${page}&limit=10`); // Assume Pagination API
            setStudents(res.data.data.students || []); // Adjust based on API structure
        } catch (e) {
            console.error("Fetch students error", e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await axios.delete(`/admin/students/${id}`);
            setStudents(prev => prev.filter(s => s.id !== id));
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete student");
        }
    };

    const columns = [
        { label: 'Full Name', key: 'fullName' },
        { label: 'Phone', key: 'phone' },
        { label: 'Class', key: 'class' },
        { label: 'Year', key: 'year' },
    ];

    // Client-side filtering for demo if API doesn't support search yet
    const filteredStudents = students.filter(s =>
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.phone?.includes(search)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Students Management</h1>
                <div className="w-64">
                    <Input
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Table
                columns={columns}
                data={filteredStudents}
                actions={(row) => (
                    <Button variant="ghost" onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900">
                        Delete
                    </Button>
                )}
            />

            {/* Pagination Controls (Simplified) */}
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    variant="secondary"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    Previous
                </Button>
                <span className="flex items-center px-4 font-bold text-slate-600">Page {page}</span>
                <Button
                    variant="secondary"
                    onClick={() => setPage(p => p + 1)}
                    disabled={students.length < 10} // Simple check
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AdminStudents;

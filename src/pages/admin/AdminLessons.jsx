import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext'; // Optional if needed

const AdminLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', image: '', rating: 5 });

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            const res = await axios.get('/admin/lessons'); // or shared /lessons endpoint
            // Backend returns { page, limit, total, lessons: [] } in res.data.data
            setLessons(res.data.data.lessons || []);
        } catch (e) { console.error(e); }
    };

    const handleEdit = (lesson) => {
        setEditingLesson(lesson);
        setFormData({
            name: lesson.name,
            description: lesson.description,
            image: lesson.image,
            rating: lesson.rating
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this lesson?")) return;
        try {
            await axios.delete(`/admin/lessons/${id}`);
            setLessons(prev => prev.filter(l => l.id !== id));
        } catch (e) { alert("Failed to delete"); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingLesson) {
                const res = await axios.put(`/admin/lessons/${editingLesson.id}`, formData);
                // Update local state
                setLessons(prev => prev.map(l => l.id === editingLesson.id ? { ...l, ...formData } : l));
            } else {
                const res = await axios.post('/admin/lessons', formData);
                setLessons(prev => [...(Array.isArray(prev) ? prev : []), res.data.data]);
            }
            setIsModalOpen(false);
            setEditingLesson(null);
            setFormData({ name: '', description: '', image: '', rating: 5 });
        } catch (e) {
            alert("Operation failed");
        }
    };

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Rating', key: 'rating', render: (l) => `${l.rating}/5` },
        { label: 'Description', key: 'description', render: (l) => <span className="line-clamp-1">{l.description}</span> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Lessons Management</h1>
                <Button onClick={() => { setEditingLesson(null); setIsModalOpen(true); }}>
                    + Add New Lesson
                </Button>
            </div>

            <Table
                columns={columns}
                data={lessons}
                actions={(row) => (
                    <div className="flex gap-2 justify-end">
                        <Button variant="secondary" onClick={() => handleEdit(row)} className="px-3 py-1 text-xs">Edit</Button>
                        <Button variant="ghost" onClick={() => handleDelete(row.id)} className="px-3 py-1 text-xs text-red-600">Delete</Button>
                    </div>
                )}
            />

            {/* Simple Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold">{editingLesson ? 'Edit Lesson' : 'Create Lesson'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <div>
                                <label className="label">Description</label>
                                <textarea
                                    className="input-field min-h-[100px]"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <Input label="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />

                            {formData.image && (
                                <div className="h-32 bg-slate-100 rounded overflow-hidden">
                                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}

                            <Input
                                label="Rating (1-5)"
                                type="number" min="1" max="5"
                                value={formData.rating}
                                onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                required
                            />

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">{editingLesson ? 'Save Changes' : 'Create Lesson'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLessons;

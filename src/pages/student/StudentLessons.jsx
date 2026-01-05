import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import LessonCard from '../../components/LessonCard';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

const StudentLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [favorites, setFavorites] = useState([]); // IDs of favorite lessons
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchLessons();
        fetchFavorites();
    }, []);

    const fetchLessons = async () => {
        try {
            const res = await axios.get('/lessons');
            setLessons(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch lessons", error);
        } finally {
            if (favorites) setLoading(false);
            // simple logic to wait both, usually Promise.all
        }
    };

    const fetchFavorites = async () => {
        try {
            const res = await axios.get('/favorites');
            // Assuming API returns list of favorite objects or user w/ favorites
            // Adjust based on Backend API. Let's assume it returns array of Favorite objects { lessonId: ... }
            const favIds = res.data.data?.map(f => f.lessonId) || [];
            setFavorites(favIds);
        } catch (error) {
            console.error("Failed to fetch favorites", error);
        }
    };

    const toggleFavorite = async (lessonId) => {
        try {
            if (favorites.includes(lessonId)) {
                await axios.delete(`/favorites/${lessonId}`); // or body { lessonId } depending on API
                setFavorites(prev => prev.filter(id => id !== lessonId));
            } else {
                await axios.post('/favorites', { lessonId });
                setFavorites(prev => [...prev, lessonId]);
            }
        } catch (error) {
            console.error("Error toggling favorite", error);
            alert("Action failed. Please try again.");
        }
    };

    const filteredLessons = lessons.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Available Lessons</h1>
                    <p className="text-slate-500 mt-1">Browse and watch your educational content.</p>
                </div>
                <div className="w-full md:w-64">
                    <Input
                        placeholder="Search lessons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading lessons...</div>
            ) : filteredLessons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map(lesson => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            isFavorite={favorites.includes(lesson.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <h3 className="text-lg font-medium text-slate-900">No lessons found</h3>
                    <p className="text-slate-500">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    );
};

export default StudentLessons;

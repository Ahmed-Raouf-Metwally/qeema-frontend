import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import LessonCard from '../../components/LessonCard';

const StudentFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/favorites');
            // Assuming endpoint returns full lesson details nested or we map them
            // If endpoint returns { id, lesson: { ... } }
            setFavorites(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch favorites", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (lessonId) => {
        // Optimistic update
        const previousFavorites = [...favorites];
        setFavorites(prev => prev.filter(f => f.lessonId !== lessonId));

        try {
            await axios.delete(`/favorites/${lessonId}`);
        } catch (error) {
            console.error("Error removing favorite", error);
            setFavorites(previousFavorites); // Rollback
            alert("Failed to remove favorite.");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Favorites</h1>
                <p className="text-slate-500 mt-1">Lessons you have saved for later.</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading favorites...</div>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(fav => (
                        <LessonCard
                            key={fav.lessonId}
                            lesson={fav.lesson}
                            isFavorite={true}
                            onToggleFavorite={() => removeFavorite(fav.lessonId)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <h3 className="text-lg font-medium text-slate-900">No favorites yet</h3>
                    <p className="text-slate-500">Mark lessons as favorite to see them here.</p>
                </div>
            )}
        </div>
    );
};

export default StudentFavorites;

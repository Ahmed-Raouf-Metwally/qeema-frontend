import React from 'react';
import Button from './Button';

const LessonCard = ({ lesson, isFavorite, onToggleFavorite }) => {
    return (
        <div className="card overflow-hidden flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                    src={lesson.image}
                    alt={lesson.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2">
                    <button
                        onClick={() => onToggleFavorite(lesson.id)}
                        className={`px-2 py-1 rounded text-xs font-bold shadow-sm backdrop-blur-sm transition-colors ${isFavorite
                                ? 'bg-red-500/90 text-white'
                                : 'bg-white/90 text-slate-600 hover:bg-white'
                            }`}
                    >
                        {isFavorite ? 'FAVORITE' : 'ADD TO FAVORITES'}
                    </button>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{lesson.name}</h3>
                    <span className="flex-shrink-0 bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                        {lesson.rating}/5
                    </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {lesson.description}
                </p>

                <Button variant="secondary" className="w-full mt-auto">
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default LessonCard;

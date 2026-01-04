const LessonCard = ({ lesson, onToggleFavorite }) => {
    return (
        <div className="border p-4 space-y-2">
            <img
                src={lesson.image}
                alt={lesson.name}
                className="w-full h-40 object-cover border"
            />

            <h3 className="text-lg font-semibold">{lesson.name}</h3>
            <p className="text-sm text-gray-600">{lesson.description}</p>

            <div className="flex justify-between items-center text-sm">
                <span>Rating: {lesson.rating}/5</span>

                <button
                    onClick={() => onToggleFavorite(lesson)}
                    className={`px-3 py-1 border ${lesson.isFavorite ? "bg-black text-white" : ""
                        }`}
                >
                    {lesson.isFavorite ? "Favorited" : "Add to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default LessonCard;

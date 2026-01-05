const Lessons = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Lessons
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Browse all available lessons
                    </p>
                </div>

                {/* Lesson Card */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden w-80 shadow-sm hover:shadow-md transition">

                    {/* Image */}
                    <div className="h-40 bg-gradient-to-r from-indigo-500 to-blue-600"></div>

                    <div className="p-5 space-y-3">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Math Basics
                        </h3>

                        <p className="text-sm text-slate-600">
                            Introduction to Math
                        </p>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">
                                Rating: 5 / 5
                            </span>

                            <button className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 transition">
                                Add to Favorites
                            </button>
                            <div className="bg-green-600 text-white p-6">
                                TAILWIND IS WORKING
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lessons;

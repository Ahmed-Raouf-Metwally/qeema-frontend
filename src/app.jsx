import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthLayout from "./components/Layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// Placeholders for now
import Lessons from "./pages/Lessons";
import StudentLayout from "./components/Layout/StudentLayout";
import StudentLessons from "./pages/student/StudentLessons";
import StudentFavorites from "./pages/student/StudentFavorites";
import StudentProfile from "./pages/student/StudentProfile";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminLessons from "./pages/admin/AdminLessons";
import AdminSchoolProfile from "./pages/admin/AdminSchoolProfile";

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (role && user.role !== role) {
        // If Admin tries to access Student routes (like /), send to Admin Dashboard
        if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
        // If Student tries to access Admin routes, send to Home
        if (user.role === 'STUDENT') return <Navigate to="/" replace />;

        return <Navigate to="/" replace />;
    }

    return children;
};

// Public Route (Accessible only if NOT logged in)
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (user) {
        if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
            </Route>

            {/* Student Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute role="STUDENT">
                        <StudentLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<StudentLessons />} />
                <Route path="favorites" element={<StudentFavorites />} />
                <Route path="profile" element={<StudentProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="lessons" element={<AdminLessons />} />
                <Route path="school" element={<AdminSchoolProfile />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

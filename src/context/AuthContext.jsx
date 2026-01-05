import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Configure global axios defaults
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const storedUser = localStorage.getItem("user");
                    if (storedUser && storedUser !== "undefined") {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Auth init failed", error);
                    // Corrupt data, clear it
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, [token]);

    const login = async (phone, password) => {
        try {
            const response = await axios.post("/auth/login", { phone, password });
            const data = response.data.data || response.data;
            const token = data.token;
            // Backend returns 'safeUser', map it to 'user' state
            const userData = data.safeUser || data.user;

            setToken(token);
            setUser(userData);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post("/auth/register", userData);
            // Auto login after register or redirect to login? 
            // Requirement says: Student Portal -> Register and Login.
            // Usually register -> login.
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
    };

    const isAdmin = user?.role === "ADMIN";

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

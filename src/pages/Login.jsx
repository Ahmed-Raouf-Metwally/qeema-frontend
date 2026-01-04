import { useState } from "react";
import api from "../api/axios";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { phone, password });
            console.log("LOGIN RESPONSE 👉", res.data);

            localStorage.setItem("token", res.data.data.token);
            window.location.href = "/";
        } catch (err) {
            console.error("LOGIN ERROR 👉", err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 w-80 space-y-4 border" onSubmit={submit}>
                <h2 className="text-xl font-semibold text-center">Student Login</h2>

                <input
                    className="border w-full p-2"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    className="border w-full p-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white py-2">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

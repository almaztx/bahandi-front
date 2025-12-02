import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/signup",
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json", // ← ЭТО КЛЮЧЕВАЯ СТРОКА!
                    },
                }
            );

            // setMessage(response.data.message);
            navigate("/nodelogin");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Signup failed");
            }
        }
    };

    return (
        <div className="bg-linear-to-tl from-slate-800 to-zinc-800 text-white max-w-[640px] my-0 mx-auto py-6 px-12 rounded-xl flex flex-col items-center">
            <h2 className="py-4 text-center text-3xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label className="block text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="blocktext-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                >
                    Sign Up
                </button>
            </form>
            <p className="py-2 text-sm">
                Already have an account?{" "}
                <Link className="text-cyan-200" to="/nodelogin">
                    Log in
                </Link>
            </p>

            {message && <p>{message}</p>}
        </div>
    );
}

export default SignupForm;

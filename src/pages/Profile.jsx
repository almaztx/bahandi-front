import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("http://localhost:5000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setProfile(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/logout");

            localStorage.removeItem("token");

            navigate("/nodelogin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <p>Welcome, {profile.username}</p>
            ) : (
                <p>No profile data</p>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;

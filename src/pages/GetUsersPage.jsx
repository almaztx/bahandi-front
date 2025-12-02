import { useEffect, useState } from "react";
import axios from "axios";

function GetUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.name} - {u.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetUsersPage;

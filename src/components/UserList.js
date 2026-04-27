import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h3>Users List</h3>

      {}
      <input
        placeholder="Search user..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {}
      {users
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>

            {}
            <button onClick={() => navigate(`/user/${user.id}`)}>
              View
            </button>

            <hr />
          </div>
        ))}
    </div>
  );
}
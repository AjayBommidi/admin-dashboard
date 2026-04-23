// import { useEffect, useState } from "react";
// import { getUsers } from "../services/api";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     getUsers().then((data) => {
//       setUsers(data);
//     });
//   }, []);

//   return (
//     <div>
//       <h3>Users List</h3>

//       {users.map((user) => (
//         <div key={user.id}>
//           <p>{user.name}</p>
//           <p>{user.email}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }










// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getUsers } from "../services/api";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUsers().then((data) => {
//       setUsers(data);
//     });
//   }, []);

//   return (
//     <div>
//       <h3>Users List</h3>

//       {/* 🔍 SEARCH INPUT */}
//       <input
//         placeholder="Search user..."
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <br /><br />

//       {/* 👇 FILTER + DISPLAY USERS */}
//       {users
//         .filter((user) =>
//           user.name.toLowerCase().includes(search.toLowerCase())
//         )
//         .map((user) => (
//           <div key={user.id}>
//             <p>{user.name}</p>
//             <p>{user.email}</p>
//             {/* <button>View</button> */}
//             <button onClick={() => navigate("/user/1")}>
//   View
// </button>
//             <hr />
//           </div>
//         ))}
//     </div>
//   );
// }





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

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search user..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {/* 👇 USERS LIST */}
      {users
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>

            {/* 🔥 BUTTON */}
            <button onClick={() => navigate(`/user/${user.id}`)}>
              View
            </button>

            <hr />
          </div>
        ))}
    </div>
  );
}
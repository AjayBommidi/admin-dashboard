// import { useEffect, useState } from "react";
// import { getUsers } from "../services/api";

// export default function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     getUsers().then((res) => {
//       setUsers(res.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>User List</h2>

//       {users.map((user) => (
//         <div key={user.id}>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }








// export default function Dashboard() {
//   return (
//     <div>
//       <h2>Welcome to Dashboard 🎉</h2>
//     </div>
//   );
// }



// export default function Dashboard() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Welcome to Dashboard 🎉</h2>
//     </div>
//   );
// }







// export default function Dashboard() {
//   return <h2>Dashboard Working 🎉</h2>;
// }












import UserList from "../components/UserList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ width: "100%" }}>
        <Header />

        <div style={{ padding: "20px" }}>
          <h2>Welcome to Dashboard 🎉</h2>
          <UserList />
        </div>
      </div>
    </div>
  );
}
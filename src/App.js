// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Layout>
//       <Dashboard />
//     </Layout>
//   );
// }

// export default App;





// // import Login from "./pages/Login";

// // function App() {
// //   return <Login />;
// // }

// // export default App;




// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



// function App() {
//   return <h1>Working ✅</h1>;
// }

// export default App;





import UserDetails from "./pages/UserDetails";
import FormPage from "./pages/FormPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


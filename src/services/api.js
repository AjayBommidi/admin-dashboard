// import axios from "axios";

// export const getUsers = () => {
//   return axios.get("https://jsonplaceholder.typicode.com/users");
// };




export const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

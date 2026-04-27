import axios from "axios";

export const searchCars = async (query) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return res.data;
};

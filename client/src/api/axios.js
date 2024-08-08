import axios from "axios";

const URL = "https://spa-tasks-server.onrender.com/api";
//const URL = "localhost:4000/api";

const instanceAxios = axios.create({
  baseURL: URL,
  withCredentials: true
});

export default instanceAxios;
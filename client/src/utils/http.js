import axios from "axios";

const token = localStorage.getItem("authToken");

const Http = axios.create({
  baseURL: "http://51.79.67.83:5000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default Http;

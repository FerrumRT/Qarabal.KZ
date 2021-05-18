import axios from "axios";

// base url
const locaclhost = "8001";
const instance = axios.create({
  baseURL: `http://localhost:${locaclhost}`,
});

export default instance;
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const instance = axios.create({
  baseURL: process.env.ROOT_URL,
});

export default instance;

import axios from "axios";

export const remoteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REMOTE_API_BASE_URL,
});

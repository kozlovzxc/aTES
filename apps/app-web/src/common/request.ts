import axios from "axios";

export const request = axios;

export const authRequest = axios.create();
authRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token == null) {
    throw new Error("Access token is undefined");
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

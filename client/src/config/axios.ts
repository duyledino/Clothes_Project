import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const myAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

myAxios.interceptors.response.use(
  (response) => {
    return response.data ? response : response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      // toast.error("Cần đăng nhập để thực hiện thao tác này");
      // window.location.href="/login";
    } else if (error.response.status === 403) {
      // toast.error("Không đủ quyền truy cập");
      localStorage.removeItem("user");
      // window.location.href="/";
    }
    return Promise.reject(error);
  }
);

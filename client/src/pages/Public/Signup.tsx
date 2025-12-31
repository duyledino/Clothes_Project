import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signupSchema } from "@/schema/auth";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { signup } from "@/slice/AuthSlice";
import Loading from "@/components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { createChat } from "@/slice/ChatSlice";
import { setStore } from "@/slice/StoreSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { data, errorUser, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const { errorChat, loadingChat } = useAppSelector((state) => state.ChatSlice);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = signupSchema.safeParse(formData);
    // Add signup logic here
    console.log("check: ",check);
    if (!check.success) {
      toast.error(JSON.parse(check.error?.message as string)[0].message);
    } else {
      const { type } = await dispatch(
        signup({ email: formData.email, name: formData.name,password: formData.password,phone: formData.phone })
      );
      console.log(type);
      if (type.search("reject")==-1) {
        console.log("move to login");
        router("/login");
      }
    }
  };

  useEffect(() => {
    if (data && !errorUser) {
      // dispatch(
      //   setStore({
      //     key: "user",
      //     value: {
      //       token: data?.token,
      //       admin: data?.admin,
      //       email: data.email,
      //       id: data.id,
      //     },
      //   })
      // );
      //get from localStorage after save it
      const localStore = localStorage.getItem("user");
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      // const { token, id } = JSON.parse(localStore);
      // dispatch(createChat({ token: token, userId: id }));
      toast.success(data.Message);
      router("/");
    }
    if (errorUser) {
      toast.error(errorUser);
    }
    if (errorChat) {
      toast.error(errorChat);
    }
  }, [data, errorUser]);

  return (
    <>
      {loadingUser || loadingChat ? <Loading /> : ""}
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="container mx-auto p-8 my-16 max-w-md bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/Login" className="text-gray-900 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

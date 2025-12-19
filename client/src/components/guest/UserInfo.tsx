import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { updateUserSchema, updatePasswordSchema } from "@/schema/auth";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchUpdateUser, fetchUserById, resetUserState } from "@/slice/UserSlice";
import Loading from "../ui/Loading";
import type { user } from "@/type/types.frontend";

const UserInfo = ({ user_id, email, name, address }: user) => {
  const dispatch = useAppDispatch();
  const { Message, errorUser, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const [newName, setName] = useState(name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newAddress, setAddress] = useState(address);
  useEffect(()=>{
    setName(name);
    setAddress(address)
},[name,address])
  console.log(
    "name,password,confirmPassword,address: ",
    name,
    password,
    confirmPassword,
    address
  );
  const handleUpdateUser = (
    userId: string,
    password: string,
    confirmPassword: string,
    address: string,
    name: string
  ) => {
    console.log(
      "name,password,confirmPassword,address: ",
      name,
      password,
      confirmPassword,
      address
    );
    const check = updateUserSchema.safeParse({
      address: newAddress,
      name: newName,
    });
    const checkPass = updatePasswordSchema.safeParse({
      password,
      confirmPassword,
    });
    if (check.success || checkPass.success) {
      dispatch(
        fetchUpdateUser({
          address: newAddress,
          user_id: user_id,
          password: password,
          name: newName,
        })
      );
    } else {
      if (!check.success) {
        console.log(
          "check: ",
          JSON.parse(check.error?.message as string)[0].message
        );
        toast.error(JSON.parse(check.error?.message as string)[0].message);
        return;
      }
      if (!checkPass.success) {
        console.log(
          "checkPass: ",
          JSON.parse(checkPass.error?.message as string)[0].message
        );
        toast.error(JSON.parse(checkPass.error?.message as string)[0].message);
        return;
      }
    }
  };
  useEffect(() => {
    if (errorUser) {
      toast.error(errorUser);
    }
    if (Message && !errorUser) {
      // toast.success(Message);
      dispatch(fetchUserById({ user_id: user_id }));
      dispatch(resetUserState());
      setPassword("");
      setConfirmPassword("");
    }
  }, [errorUser, Message]);
  return (
    <>
      {loadingUser && <Loading />}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <Label
            htmlFor="id"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ID:
          </Label>
          <Input
            type="text"
            id="id"
            value={user_id}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Adress:
          </Label>
          <Input
            type="text"
            id="address"
            value={newAddress}
            placeholder={"Enter address to be ordered"}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </Label>
          <Input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="confirm"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password:
          </Label>
          <Input
            type="password"
            id="confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            onClick={() =>
              handleUpdateUser(user_id, password, confirmPassword, newName, email)
            }
            className=" bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
          >
            Change
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;

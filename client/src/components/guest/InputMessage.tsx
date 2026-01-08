import React, { useState } from "react";
import type { FormEvent, SetStateAction } from "react";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { socket } from "@/config/socket";
import type { Message } from "@/type/types.frontend";
import { useAppSelector } from "@/hooks/hooks";

const InputMessage = ({
  chat_id,
  setCurrent,
}: {
  setCurrent: React.Dispatch<SetStateAction<Message[]>>;
  chat_id: string;
}) => {
  const {user} = useAppSelector((state) => state.AuthSlice);
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("message, chatId: ", message, chat_id);
    if (message === "") {
      toast.error("Type something...");
      return;
    }
    const message_id = Date.now().toString() + "123".slice(0, 5);
    socket.emit("message", JSON.stringify({
      message_id: message_id,
        message: message,
        chat_id: chat_id,
        from_id: user!.user.user_id,
      }));
    setCurrent((prev) => [
      ...prev,
      {
        chat_id: chat_id,
        message_id: message_id,
        user_id: user!.user.user_id,
        message: message,
        isAdmin: false
      },
    ]);
    setMessage("");
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="w-full"
        />
      </form>
    </div>
  );
};

export default InputMessage;

import type { ChatAdmin, ChatUser, Message } from "@/type/types.frontend";
import React, { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";


const ChatSidebarAdmin = ({
  setCurrent,
  chats,
  singleChat,
  setSingleChat,
}: {
  setCurrent: React.Dispatch<SetStateAction<Message[]>>;
  chats: ChatAdmin[] ;
  singleChat: ChatAdmin|null;
  setSingleChat: Dispatch<SetStateAction<ChatAdmin|null>>;
}) => {
  const [click, setClick] = useState<string>("");
  useEffect(() => {
    if (click !== "") {
      const foundChat = chats.find((item) => item.chat_id === click);
      if (foundChat) {
        setCurrent([]);
        setSingleChat(foundChat);
      }
    }
  }, [click]);
  console.log("chats", chats);
  return (
    <div className="md:w-64 w-32 border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <ul className="md:w-full flex flex-col gap-2.5">
          {chats.length > 0
            ? chats.map((item) => (
                <li
                  onClick={() => setClick(item.chat_id)}
                  key={item.chat_id}
                  className={`cursor-pointer p-3 text-center overflow-hidden md:w-full sm:w-full md:text-[16px] text-[12px] ${
                    singleChat?.chat_id === item.chat_id
                      ? "text-white bg-gray-900"
                      : "text-gray-400 bg-gray-100"
                  } `}
                >
                  {item.chat_user?.name === null
                    ? "Không có tên"
                    : item.chat_user?.name}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebarAdmin;

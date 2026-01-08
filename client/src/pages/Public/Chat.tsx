import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/guest/ChatSidebar";
import ChatMessageArea from "@/components/guest/ChatMessageArea";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { fetchChatsByUserId } from "@/slice/ChatSlice";
import { useNavigate } from "react-router-dom";
import type { ChatUser, Message } from "@/type/types.frontend";
import { socket } from "@/config/socket";
import Loading from "@/components/ui/Loading";

const ChatPublicPage = () => {
  const dispatch = useAppDispatch();
  const { chatUser, loadingChat } = useAppSelector((state) => state.ChatSlice);
  const [current, setCurrent] = useState<Message[]>([]);
  const [singleChat, setSingleChat] = useState<ChatUser | null>(null);
  const { user } = useAppSelector((state) => state.AuthSlice);
  // console.log("user: ", user!.user);
  useEffect(()=>{
    if (user && user.user) {
      console.log("user: ", user.user);
      dispatch(fetchChatsByUserId({ user_id: user.user.user_id }));
    }
  },[]);
  useEffect(() => {
    if (user && user.user) {
      console.log("user: ", user.user);
      // dispatch(fetchChatsByUserId({ user_id: user.user.user_id }));
      socket.on("connection", () => {
        console.log("✅Client websocket is connected");
      });
    }
    return () => {
      socket.off("connection");
    };
  }, []);
  useEffect(() => {
    if (chatUser) {
      setSingleChat(chatUser[0]);
    }
  }, [chatUser]);
  useEffect(() => {
    if (singleChat) {
      socket.emit(
        "register",
        JSON.stringify({
          from_id: singleChat.user_id_user,
          chat_id: singleChat.chat_id,
          to_id: singleChat.user_id_admin,
        })
      );
    }
    socket.on("register", (data) => {
      console.log("✅Client websocket is connected");
    });
    return () => {
      socket.off("register");
    };
  }, [singleChat]);
  useEffect(() => {
    socket.on("message", (data) => {
      console.log("received from server: ", data);
      const { message_id, message, from_id, chat_id,isAdmin } = JSON.parse(data);
      setCurrent((prev) => [
        ...prev,
        {
          message_id: message_id,
            message: message,
          user_id: from_id,
          chat_id: chat_id,
          isAdmin: isAdmin
        },
      ]);
    });
    return () => {
      socket.off("message");
    };
  }, []);
  console.log("chats: ", chatUser);
  console.log("currnet: ", current);
  return (
    <>
      {loadingChat && <Loading />}
      <div className="flex flex-1 h-[86vh] bg-white text-gray-900 border-b-2">
        <ChatSidebar
          setCurrent={setCurrent}
          chats={chatUser || []}
          setSingleChat={setSingleChat}
          singleChat={singleChat}
        />
        {singleChat && singleChat?.chat_id !== "default" && user ? (
          <ChatMessageArea
            setCurrent={setCurrent}
            current={current}
            chat_id={singleChat!.chat_id}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ChatPublicPage;

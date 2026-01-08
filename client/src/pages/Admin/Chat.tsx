import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/guest/ChatSidebar";
import ChatMessageArea from "@/components/guest/ChatMessageArea";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { fetchChatByUserAdmin } from "@/slice/ChatSlice";
import { useNavigate } from "react-router-dom";
import type { ChatAdmin, Message } from "@/type/types.frontend";
import ChatSidebarAdmin from "@/components/admin/ChatSidebarAdmin";
import Loading from "@/components/ui/Loading";
import { socket } from "@/config/socket";

function ChatAdminPage() {
  const dispatch = useAppDispatch();
  const { chatAdmin, loadingChat } = useAppSelector((state) => state.ChatSlice);
  const { user } = useAppSelector((state) => state.AuthSlice);
  const [current, setCurrent] = useState<Message[]>([]);
  const [singleChat, setSingleChat] = useState<ChatAdmin | null>(null);
  console.log("single Chat: ", singleChat);
  useEffect(() => {
    if (user && user.user !== null) {
      dispatch(fetchChatByUserAdmin({ user_id: user.user.user_id }));
    }
  }, []);
  useEffect(() => {
    socket.on("message", (data) => {
      console.log("received from server: ", data);
      const { message_id, message, from_id, chat_id, isAdmin } = JSON.parse(data);
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
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedUser = localStorage.getItem("user");
  //     setLocalStore(storedUser);
  //   }
  //   socketRef.current = new WebSocket(`${import.meta.env.VITE_SOCKET}`);
  //   socketRef.current.onopen = () => {
  //     console.log("✅Client websocket is connected");
  //   };
  //   socketRef.current.onmessage = (e) => {
  //     console.log("received from server: ", e.data);
  //     const { messageId, message, fromId, chatId } = JSON.parse(e.data);
  //     setCurrent((prev) => [
  //       ...prev,
  //       { messageId, content: message, userId: fromId, chatId },
  //     ]);
  //   };
  //   socketRef.current.onclose = (e) => {
  //     console.log("Websocket is closed");
  //   };
  //   socketRef.current.onerror = (e) => {
  //     console.error("websocket error: ", e);
  //   };
  //   return () => {
  //     if (socketRef.current) socketRef.current.close();
  //   };
  // }, []);

  useEffect(() => {
    if (chatAdmin) {
      setSingleChat(chatAdmin[0]);
    }
  }, [chatAdmin]);
  useEffect(() => {
    if (singleChat) {
      socket.emit(
        "register",
        JSON.stringify({
          from_id: singleChat.user_id_admin,
          chat_id: singleChat.chat_id,
          to_id: singleChat.user_id_user,
        })
      );
      socket.on("register", (data) => {
        console.log("✅Client websocket is connected");
      });
      return () => {
        socket.off("register");
      };
    }
  }, [singleChat]);
  console.log("chatAdmin", chatAdmin);
  console.log("message", current);
  return (
    <>
      {loadingChat && <Loading />}
      <div className="flex flex-1 h-[81.5vh] bg-white text-gray-900 border-b-2">
        <ChatSidebarAdmin
          setCurrent={setCurrent}
          chats={chatAdmin || []}
          setSingleChat={setSingleChat}
          singleChat={singleChat}
        />
        {singleChat && singleChat?.chat_id !== "default" ? (
          <ChatMessageArea
            current={current}
            setCurrent={setCurrent}
            chat_id={singleChat.chat_id}
          />
        ) : (
          // <ChatMessageArea
          // current={current}
          //   setCurrent={setCurrent}
          //   socketRef={socketRef}
          //   chat_id={singleChat.chat_id}
          // />
          ""
        )}
      </div>
    </>
  );
}

export default ChatAdminPage;

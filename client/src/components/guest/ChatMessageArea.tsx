import React, { useEffect, useRef, useState } from "react";
import type { SetStateAction } from "react";
import InputMessage from "./InputMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { FetchGetAllMessageFromChatId } from "@/slice/ChatSlice";
import Loading from "../ui/Loading";
import type { Message } from "@/type/types.frontend";
import dompurify from "dompurify";
import { socket } from "@/config/socket";

const Dompurify = ({
  rawHtml,
  className,
}: {
  rawHtml: string;
  className: string;
}) => {
  const cleanHtml = dompurify.sanitize(rawHtml);
  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

const ChatMessageArea = ({
  chat_id,
  current,
  setCurrent,
}: {
  setCurrent: React.Dispatch<SetStateAction<Message[]>>;
  chat_id: string;
  current: Message[];
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const dispatch = useAppDispatch();
  const { messages, loadingChat } = useAppSelector((state) => state.ChatSlice);
  const { user } = useAppSelector((state) => state.AuthSlice);
  console.log("Chat_ID: ", chat_id);
  useEffect(() => {
    if (chat_id !== "default") {
      dispatch(FetchGetAllMessageFromChatId({ chat_id: chat_id }));
    }
  }, [chat_id]);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, current,isTyping]);
  useEffect(() => {
    socket.on("typing", (data) => {
      if (data || data !== undefined) {
        const { chat_id, user_id, isTyping } = JSON.parse(data);
        // if(chat_id && user_id!==user?.user.user_id){
        //   setIsTyping(isTyping);
        // }
        setIsTyping(isTyping);
      }
    });
    return () => {
      socket.off("typing");
    };
  }, []);
  console.log("message[]", messages);
  console.log("user.user: ", user?.user.user_id);
  return (
    <>
      {loadingChat && <Loading />}
      <div className="flex-1 p-4 flex flex-col">
        <div className="text-lg font-semibold mb-2">Chat</div>
        <div className="overflow-y-scroll flex-1 flex flex-col items-start gap-3 px-2">
          {messages && messages.length > 0 && user
            ? messages.map((item) =>
                item.message.search("<div") !== -1 ? (
                  <Dompurify
                    className={`rounded-3xl md:text-[18px] text-[12px] 
    ${
      user.user.role === "admin"
        ? "self-end p-3 max-w-xl bg-gray-900 text-white"
        : "p-3 max-w-xl bg-gray-300 text-gray-900"
    }`}
                    key={item.message_id}
                    rawHtml={item.message}
                  />
                ) : (
                  <p
                    ref={messageRef}
                    className={`rounded-3xl md:text-[18px] text-[12px] ${
                      item.user_id === user.user.user_id
                        ? "self-end p-3 max-w-xl bg-gray-900 text-white"
                        : "p-3 max-w-xl bg-gray-300 text-gray-900"
                    }`}
                    key={item.message_id}
                  >
                    {item.message}
                  </p>
                )
              )
            : ""}
          {current && current.length > 0 && user
            ? current.map((item) =>
                item.user_id !== "AI" ? (
                  <p
                    ref={messageRef}
                    className={`rounded-3xl md:text-[18px] text-[12px] ${
                      item.user_id === user.user.user_id
                        ? "self-end p-3 max-w-xs bg-gray-900 text-white"
                        : "p-3 max-w-xs bg-gray-300 text-gray-900"
                    }`}
                    key={item.message_id}
                  >
                    {item.message}
                  </p>
                ) : (
                  <Dompurify
                    className={`
                      rounded-3xl md:text-[18px] text-[12px] 
    ${
      user.user.role === "admin"
        ? "self-end p-3 max-w-xs bg-gray-900 text-white"
        : "p-3 max-w-xl bg-gray-300 text-gray-900"
    }`}
                    key={item.message_id}
                    rawHtml={item.message}
                  />
                )
              )
            : ""}
          {isTyping && (
            <>
              <p 
              key={"Tin nhắn đang soạn"}
              ref={messageRef}
              className="rounded-3xl md:text-[18px] text-[12px] p-3 max-w-xl bg-gray-300 text-gray-900">
                Đang soạn tin nhắn
              </p>
            </>
          )}
        </div>

        <InputMessage setCurrent={setCurrent} chat_id={chat_id} />
      </div>
    </>
  );
};

export default ChatMessageArea;

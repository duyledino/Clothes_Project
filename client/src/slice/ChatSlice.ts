import { chatService } from "@/service/chat.service";
import type { ChatAdmin, ChatUser, Message } from "@/type/types.frontend";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { da } from "zod/v4/locales";


type ChatState = {
  loadingChat: boolean;
  chatUser: ChatUser[];
  chatAdmin: ChatAdmin[];
  messages: Message[] ;
};

const initialState: ChatState = {
  loadingChat: false,
  chatAdmin: [],
  chatUser: [],
  messages: [],
};

export const fetchChatByUserAdmin = createAsyncThunk(
    "chat/fetchChatByUserAdmin",
    async ({ user_id }:{user_id:string}, { rejectWithValue }) => {
        try {
            console.log("chat/fetchChatByUserAdmin: ", user_id);
            const response = await chatService.getChatByUserAdmin(user_id);
            console.log("response.data.chats: ", response.data);
            return response.chats;
        } catch (error: any) {
            const message = error.response?.data?.Message || "Something went wrong";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
)

export const fetchChatsByUserId = createAsyncThunk(
  "chat/fetchChatsByUserId",
  async ({user_id}: {user_id:string}, { rejectWithValue }) => {
    try {
      console.log("chat/fetchChatsByUserId: ", user_id);
      const response = await chatService.getChatByUserId(user_id);
      return response.chats;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      console.log("message: ", message);
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// export const createMessage = createAsyncThunk(
//   "chat/createMessage",
//   async (
//     data: { chatId: string; userId: string; content: string; token: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${baseUrl}/chat/createMessage?chatId=${data.chatId}&userId=${data.userId}`,
//         { content: data.content }, // Access content from data parameter
//         {
//           headers: {
//             Authorization: `Bearer ${data.token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       const message = error.response?.data?.Message || "Something went wrong";
//       return rejectWithValue(message);
//     }
//   }
// );

export const FetchGetAllMessageFromChatId = createAsyncThunk(
  "FetchGetAllMessageFromChatId/get",
  async ({chat_id}:{ chat_id: string}, { rejectWithValue }) => {
    console.log("chatId, token: ", chat_id);
    try {
      const response = await chatService.getAllMessageFromChatId(chat_id);
      console.log("response message: ", response.data);
      return response.messages;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchGetAllMessageFromChatId.pending, (state) => {
      state.loadingChat = true;
    })
    .addCase(FetchGetAllMessageFromChatId.fulfilled, (state, action) => {
      state.loadingChat = false;
      state.messages = action.payload as Message[];
    })
    .addCase(FetchGetAllMessageFromChatId.rejected, (state, action) => {
      state.loadingChat = false;
    })
    .addCase(fetchChatByUserAdmin.pending, (state) => {
      state.loadingChat = true;
    })
    .addCase(fetchChatByUserAdmin.fulfilled, (state, action) => {
      state.loadingChat = false;
      state.chatAdmin = action.payload as ChatAdmin[];
    })
    .addCase(fetchChatByUserAdmin.rejected, (state, action) => {
      state.loadingChat = false;
    })
    .addCase(fetchChatsByUserId.pending, (state) => {
      state.loadingChat = true;
    })
    .addCase(fetchChatsByUserId.fulfilled, (state, action) => {
      state.loadingChat = false;
      state.chatUser = action.payload as ChatUser[];
    })
    .addCase(fetchChatsByUserId.rejected, (state, action) => {
      state.loadingChat = false;
    })
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;

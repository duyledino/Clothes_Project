import { myAxios } from "@/config/axios";


export const chatService = {
    getChatByUserId:async(user_id: string)=> {
        const response = await myAxios.get(`/chat/getChatByUserId?user_id=${user_id}`)
        return response.data;
    },
    getChatByUserAdmin:async(user_id: string)=> {
        const response = await myAxios.get(`/chat/getChatByUserAdmin?user_id=${user_id}`)
        return response.data;
    },
    createMessage:async(data: { user_id: string; chat_id: string; message: string }) => {
        const response = await myAxios.post(`/chat/createMessage`, data)
        return response.data;
    },
    getAllMessageFromChatId:async(chat_id: string)=> {
        const response = await myAxios.get(`/chat/getAllMessageFromChatId?chat_id=${chat_id}`)
        return response.data;
    }
}
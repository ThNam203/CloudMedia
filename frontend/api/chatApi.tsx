import ApiManager from "./ApiManager";

export default {
    getAllChatRooms: function(userId: string, token: string) {
        return ApiManager(`${userId}/chatroom`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getMessagesFromAChatRoom: function(token: string, chatRoomId: string) {
        return ApiManager(`/chatroom/${chatRoomId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};

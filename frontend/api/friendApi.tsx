import ApiManager from "./ApiManager";

export default {
    getFriendRequests: function(userId: string, token: string) {
        return ApiManager(`/${userId}/friend-request/received`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
    },
    // getAllFriends: function(userId: string, token: string) {
    //     return ApiManager(`${userId}/friend`)
    // },
};

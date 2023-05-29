import ApiManager from './ApiManager';

export const getAllNotifications = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/notification`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

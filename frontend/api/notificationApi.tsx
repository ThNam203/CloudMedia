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

export const readNotification = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/notification`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

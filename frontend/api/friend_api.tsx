import ApiManager from './ApiManager';

export const createRequestByEmail = async (
  data: any,
  userId: any,
  token: any,
) => {
  try {
    const result = await ApiManager(`/${userId}/friend-request`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        receiverEmail: data,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

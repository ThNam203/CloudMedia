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

export const replyRequestFr = async (
  data: any,
  userId: any,
  requestId: any,
  token: any,
) => {
  try {
    const result = await ApiManager(
      `/${userId}/friend-request/received/${requestId}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: {
          response: data,
        },
      },
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllFrOfUser = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/friend`, {
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

export const getAllFrRequestOfUser = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/friend-request/received`, {
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

export const unfriendApi = async (data: any, userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/friend/${data}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getRecommendFr = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/friend-recommend`, {
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

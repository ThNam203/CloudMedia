import ApiManager from './ApiManager';

export const getAStatusPostById = async (
  userId: any,
  token: any,
  statusPost: any,
) => {
  try {
    const result = await ApiManager(`/${userId}/post/${statusPost}`, {
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

export const getAllStatusPostOfUser = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/post`, {
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

export const createNewPost = async (data: any, userId: any, token: any) => {
  try {
    const {mediaFiles, description} = data;
    const dataForm = new FormData();

    for (let i = 0; i < mediaFiles.length; i++)
      dataForm.append('media-files', mediaFiles[i]);

    dataForm.append('description', description);
    const result = await ApiManager(`/${userId}/post`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      data: dataForm,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const updateStatusPostApi = async (
  data: any,
  userId: any,
  token: any,
  statusPost: any,
) => {
  try {
    const result = await ApiManager(`/${userId}/post/${statusPost}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteAStatusPostApi = async (
  userId: any,
  token: any,
  statusPost: any,
) => {
  try {
    const result = await ApiManager(`/${userId}/post/${statusPost}`, {
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

export const toggleLikeStatusApi = async (
  userId: any,
  token: any,
  statusPost: any,
) => {
  try {
    const result = await ApiManager(`/${userId}/post/${statusPost}`, {
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

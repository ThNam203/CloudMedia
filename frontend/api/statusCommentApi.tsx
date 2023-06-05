import ApiManager from './ApiManager';

export const getAllComments = async (statusPostId: any, token: any) => {
  try {
    const result = await ApiManager(`/s/${statusPostId}/comment`, {
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

export const createComment = async (
  data: any,
  statusPostId: any,
  token: any,
) => {
  try {
    const {mediaFile, content, userId} = data;
    const dataForm = new FormData();

    dataForm.append('media-file', mediaFile);
    dataForm.append('content', content);
    dataForm.append('userId', userId);
    const result = await ApiManager(`/s/${statusPostId}/comment`, {
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

export const deleteComment = async (
  statusPostId: any,
  commentId: any,
  token: any,
) => {
  try {
    const result = await ApiManager(`/s/${statusPostId}/comment/${commentId}`, {
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

export const toggleLikeCommentApi = async (
  statusPostId: any,
  commentId: any,
  token: any,
) => {
  try {
    const result = await ApiManager(`/s/${statusPostId}/comment/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

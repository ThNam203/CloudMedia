import ApiManager from './ApiManager';

export const getStoryById = async (storyId: any, token: any) => {
  try {
    const result = await ApiManager(`/s/${storyId}`, {
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

export const getAllStoryBy = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/story`, {
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

export const createStory = async (data: any, userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/story`, {
      method: 'POST',
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

export const likeStory = async (authorId: any, storyId: any, token: any) => {
  try {
    const result = await ApiManager(`/${authorId}/story/${storyId}`, {
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

export const deleteStory = async (userId: any, storyId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/story`, {
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

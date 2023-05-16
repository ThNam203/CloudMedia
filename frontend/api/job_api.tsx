import ApiManager from './ApiManager';

export const get1Job = async (userId: any, token: any, jobId: any) => {
  try {
    const result = await ApiManager(`/${userId}/jobpost/${jobId}`, {
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

export const getAllJobOfUser = async (userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/jobpost/`, {
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

export const post1Job = async (data: any, userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/jobpost/`, {
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

export const update1Job = async (
  data: any,
  userId: any,
  token: any,
  jobId: any,
) => {
  try {
    const result = await ApiManager(`/${userId}/jobpost/${jobId}`, {
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

export const delete1Job = async (userId: any, token: any, jobId: any) => {
  try {
    const result = await ApiManager(`/${userId}/jobpost/${jobId}`, {
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

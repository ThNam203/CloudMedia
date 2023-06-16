import ApiManager from './ApiManager';

export const userLogin = async (data: any) => {
  try {
    const result = await ApiManager('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const userSignup = async (data: any) => {
  try {
    const result = await ApiManager('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const userLogout = async (token: any) => {
  try {
    const result = await ApiManager('/logout', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getInfoUser = async (data: any) => {
  try {
    const result = await ApiManager(`/${data}`, {
      method: 'GET',
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const postAvatarImg = async (dataForm: any, userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/profile-image`, {
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

export const postBackgrImg = async (dataForm: any, userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}/background-image`, {
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

export const user_update = async (data: any, userId: any, token: any) => {
  try {
    const result = await ApiManager(`/${userId}`, {
      method: 'PATCH',
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

import ApiManager from './ApiManager';

export const SearchUsersByEmail = async (
  query: any,
  userId: any,
  token: any,
) => {
  try {
    const result = await ApiManager('/email-search', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        query: query,
        userId: userId,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const SearchUsersByName = async (
  query: any,
  userId: any,
  token: any,
) => {
  try {
    const result = await ApiManager('/name-search', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        query: query,
        userId: userId,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const UploadImage = async (formData: FormData, token: string) => {
  try {
    const result = await ApiManager('/upload-image', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    return result;
  } catch (error) {
    console.log('cai deo gi day ' + JSON.stringify(error));
    return error;
  }
};

export const changePassword = async (data: any) => {
  try {
    const result = await ApiManager('/change-password', {
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

export const resetPassword = async (data: any) => {
  try {
    const result = await ApiManager('/reset-password', {
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

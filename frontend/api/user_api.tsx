import ApiManager from './ApiManager';

export const user_login = async (data: any) => {
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

export const user_signup = async (data: any) => {
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

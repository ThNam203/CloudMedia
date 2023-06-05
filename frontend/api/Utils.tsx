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

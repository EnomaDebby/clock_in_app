import Promise from 'bluebird';
import reqwest from 'reqwest';
import ApiError from './ApiError';

export const getResource = url => {
  return new Promise((resolve, reject) => {
    reqwest({
      url,
      type: 'json',
      method: 'get',
      success(response) {
        resolve(response);
      },
      error(error) {
        reject(error);
      },
    });
  });
};

export const postResource = (url, data) => {
  const token = $('meta[name="csrf-token"]').attr('content');
  return new Promise((resolve, reject) => {
    reqwest({
      url,
      type: 'json',
      method: 'post',
      data,
      headers: {
        'X-CSRF-Token': token,
      },

      success(response) {
        resolve(response);
      },
      error(response) {
        const errors = new ApiError(response);
        reject(errors.formErrors());
      },
    });
  });
};

export const updateResource = (url, data) => {
  const token = $('meta[name="csrf-token"]').attr('content');
  return new Promise((resolve, reject) => {
    reqwest({
      url,
      type: 'json',
      method: 'put',
      data,
      headers: {
        'X-CSRF-Token': token,
      },

      success(response) {
        resolve(response);
      },
      error(response) {
        const errors = new ApiError(response);
        reject(errors.formErrors());
      },
    });
  });
};

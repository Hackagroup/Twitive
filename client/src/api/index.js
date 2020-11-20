import axios from 'axios';
import { API_ENDPOINTS } from '../constants';
import isEmpty from '../utils/isEmpty';

const createURL = (baseURL = '', urlParam = '', queryParam = {}) => {
  return `${baseURL}/${urlParam}?${new URLSearchParams(queryParam).toString()}`;
};

const createErrorMessage = (err) => ({
  message: !isEmpty(err?.response?.data?.message) ? err?.response?.data?.message : 'Failed to connect to server!'
});

const API = {
  search: {
    get: async (urlParam = '', queryParam = {}) => {
      const { SEARCH: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.get(createURL(BaseURL, urlParam, queryParam));
        return { ...res.data };
      } catch (err) {
        return createErrorMessage(err);
      }
    },
  },
};

export default API;
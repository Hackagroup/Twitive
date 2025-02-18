import axios from 'axios'
import { API_ENDPOINTS } from '../constants'
import isEmpty from '../utils/isEmpty'

const createURL = (baseURL = '', urlParam = '', queryParam = {}) => {
  const userCredentials = JSON.parse(localStorage.userCredentials)
  const queryParamsWithAuth = {
    access_token_key: userCredentials.oauth_token,
    access_token_secret: userCredentials.oauth_token_secret,
    ...queryParam,
  }
  return `${baseURL}/${urlParam}?${new URLSearchParams(queryParamsWithAuth).toString()}`
}

const createErrorMessage = (err) => ({
  message: !isEmpty(err?.response?.data?.message)
    ? err?.response?.data?.message
    : 'Failed to connect to server!',
})

const API = {
  tweet: {
    get: async (urlParam = '', queryParam = {}) => {
      const { TWEET: BaseURL } = API_ENDPOINTS
      try {
        const res = await axios.get(createURL(BaseURL, urlParam, queryParam))
        return { ...res.data }
      } catch (err) {
        return createErrorMessage(err)
      }
    },
    post: async (data = {}, urlParam = '', queryParam = {}) => {
      const { TWEET: BaseURL } = API_ENDPOINTS
      try {
        const res = await axios.post(createURL(BaseURL, urlParam, queryParam), data)
        return { ...res.data }
      } catch (err) {
        return createErrorMessage(err)
      }
    },
  },
  user: {
    get: async (urlParam = '', queryParam = {}) => {
      const { USER: BaseURL } = API_ENDPOINTS
      try {
        const res = await axios.get(createURL(BaseURL, urlParam, queryParam))
        return { ...res.data }
      } catch (err) {
        return createErrorMessage(err)
      }
    },
  },
}

export default API

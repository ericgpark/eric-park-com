import axios from 'axios'

const setAxiosDefaults = async () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
}

export default setAxiosDefaults

import axios from 'axios'

const setAxiosDefaults = async () => {
  const base = import.meta.env.VITE_API_URL
  axios.defaults.baseURL = base
}

export default setAxiosDefaults

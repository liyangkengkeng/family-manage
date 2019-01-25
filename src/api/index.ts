import axios from "axios";
const baseURL = process.env.VUE_APP_BASE_URL;

export const apiCreator = () => {
  return axios.create({
    baseURL: `/${baseURL}/api`,
    timeout: 3000
  })
}
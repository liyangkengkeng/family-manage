import axios from "axios";
const baseURL = process.env.BASE_URL;

export const apiCreator = () => {
  return axios.create({
    baseURL: `${baseURL}api`,
    timeout: 60000,
    //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  })
}
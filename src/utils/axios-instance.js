import axios from 'axios'
import router from '../router'

const service = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

service.interceptors.response.use((response) => {
  return response;
}, function (error) {
  console.log(error);
  if (error.response.status === 401) {
      console.log('unauthorized, logging out ...');
      router.replace('/login');
  } 
  //return Promise.reject(error.response);
});

export default service
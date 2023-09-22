// import axios from "axios"
// import {Session} from "next-auth"

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:5000/",
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

// axiosInstance.interceptors.request.use(
//     config => {
        
//         return config
//     },
//     error => {
//         Promise.reject(error)
//     }
// )

// export default axiosInstance

import axios from 'axios';
import { getSession } from 'next-auth/react';


const baseURL = process.env.API_URL 

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.access_token}`;
    }

    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error?.response?.data);
      return Promise.reject({
        data: error?.response?.data,
        status: error?.response?.status,
      });
    },
  );

  return instance;
};

export default ApiClient();
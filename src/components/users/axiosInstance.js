import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { Navigate } from "react-router-dom";


const baseURL =`${process.env.REACT_APP_API_SERVER}`


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("interceptor use")
    const token = localStorage.getItem('access') ? localStorage.getItem('access') : null
    console.log('Token: ',token)
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
      config.headers["Authorization"] = 'JWT ' + token; //For My Django Development -  MSQ
      console.log('access token exist in request.use')
    }else {
      console.log('access token do not exist in request.use')
    }
    return config;

  },
  (error) => {
    console.log('error en request.use',error)
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
      <Navigate to="/login" replace={true} />
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh');
      const user = jwt_decode(refreshToken)
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  
      if(!isExpired) {
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access', response.data.access);
							localStorage.setItem('refresh', response.data.refresh);
							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', user.exp);
          <Navigate to="/login" replace={true} />
				}
			} else {
				console.log('Refresh token not available.');
        <Navigate to="/login" replace={true} />
			}
		}
);

export default axiosInstance;
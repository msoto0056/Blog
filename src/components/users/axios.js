import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { Navigate } from 'react-router-dom';

const BASE_URL  =`${process.env.REACT_APP_API_SERVER}`

const axiosInstance = axios.create({
	baseURL: BASE_URL,
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
	async (error) => {
        console.log('Error in interceptor response',error)
		const originalConfig = error.config;
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
                'Verify BackEnd server is running. ' +
				'or CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}
        console.log("Config.url",originalConfig.url);
        if (
			error.response.status === 401 &&
			originalConfig.url === BASE_URL + 'token/refresh/'
		) {
			// window.location.href = '/login/';
			// return Promise.reject(error);
            console.log('Refresh token is expired');
			return <Navigate to='/login' replace />
		}

        if (originalConfig.url !== BASE_URL + "/token/" && error.response) {
            // Access Token was expired
		    if (
			    error.response.status === 401 &&
			    originalConfig.url === BASE_URL + '/token/refresh/' && 
                !originalConfig._retry
		    ) {
                originalConfig._retry = true;    //Avoid infintely loops Flag
    			const refreshToken = localStorage.getItem('refresh');
    		    if (refreshToken) {
                    const user = jwt_decode(refreshToken)
                    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
				    console.log(user.exp);
				    if (!isExpired) {
                        try {
                            const response = await axios.post(`${BASE_URL}/token/refresh/`, {
                                refresh: localStorage.getItem('refresh'),
                                withCredentials: true
                            });
							localStorage.setItem('access', response.data.access);
							localStorage.setItem('refresh', response.data.refresh);
							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalConfig.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalConfig);
						} catch (error) {
                            if (error.response && error.response.data) {
                                return Promise.reject(error.response.data);
                            }   
                            return Promise.reject(error);
                        }
					} else {
					console.log('Refresh token is expired', user.exp);
					return <Navigate to='/login' replace />
				    }
			    } else {
				    console.log('Refresh token not available.');
				    return <Navigate to='/login' replace />
			    }
		    }
        
		// specific error handling done elsewhere
		return Promise.reject(error);
	    }
    }
);

export default axiosInstance;


import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL =`${process.env.REACT_APP_API_SERVER}`

// let authTokens = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : null


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access')
			? 'JWT ' + localStorage.getItem('access')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});


axiosInstance.interceptors.request.use(async req => {
    if(!access){
        req.headers.Authorization = localStorage.getItem('access')
			? 'JWT ' + localStorage.getItem('access')
			: null
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `JWT ${response.data.access}`
    return req
})

// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;

// 		if (typeof error.response === 'undefined') {
// 			alert(
// 				'A server/network error occurred. ' +
// 					'Looks like CORS might be the problem. ' +
// 					'Sorry about this - we will get it fixed shortly.'
// 			);
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.status === 401 &&
// 			originalRequest.url === baseURL + 'token/refresh/'
// 		) {
// 			window.location.href = '/login/';
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.data.code === 'token_not_valid' &&
// 			error.response.status === 401 &&
// 			error.response.statusText === 'Unauthorized'
// 		) {
// 			const refreshToken = localStorage.getItem('refresh_token');

// 			if (refreshToken) {
// 				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

// 				// exp date in token is expressed in seconds, while now() returns milliseconds:
// 				const now = Math.ceil(Date.now() / 1000);
// 				console.log(tokenParts.exp);

// 				if (tokenParts.exp > now) {
// 					return axiosInstance
// 						.post('/token/refresh/', { refresh: refreshToken })
// 						.then((response) => {
// 							localStorage.setItem('access_token', response.data.access);
// 							localStorage.setItem('refresh_token', response.data.refresh);

// 							axiosInstance.defaults.headers['Authorization'] =
// 								'JWT ' + response.data.access;
// 							originalRequest.headers['Authorization'] =
// 								'JWT ' + response.data.access;

// 							return axiosInstance(originalRequest);
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				} else {
// 					console.log('Refresh token is expired', tokenParts.exp, now);
// 					window.location.href = '/login/';
// 				}
// 			} else {
// 				console.log('Refresh token not available.');
// 				window.location.href = '/login/';
// 			}
// 		}

// 		// specific error handling done elsewhere
// 		return Promise.reject(error);
// 	}
// );

export default axiosInstance;
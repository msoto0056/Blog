// Este Axios no espera para que se de el error de que el Token se expiro lo refresca cada vez que se usa, por el eso el interceptor
// se llama en el request y no en el response. El problema es que se incrementa considerablemente la Base de Datos de Black Listed Tokens.

import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL =`${process.env.REACT_APP_API_SERVER}`

let authTokens = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : null


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
    if(!authTokens){
      authTokens = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : null
      req.headers.Authorization = `Bearer ${authTokens}`
  }

    const user = jwt_decode(authTokens)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: JSON.parse(localStorage.getItem('refresh'))
      });

    localStorage.setItem('access', JSON.stringify(response.data.access))
    localStorage.setItem('refresh', JSON.stringify(response.data.refresh))
    req.headers.Authorization = `JWT ${response.data.access}`
    return req
})


export default axiosInstance;
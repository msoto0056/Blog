import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const baseURL =`${process.env.REACT_APP_API_SERVER}`


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers:{
        Authorization: localStorage.getItem('access')
		? 'JWT ' + localStorage.getItem('access')
		: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.request.use(async req => {
    

    if (!localStorage.getItem('access')) return req

    const user = jwt_decode(localStorage.getItem('access'))
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: localStorage.getItem('refresh')
      });

    localStorage.setItem('access', JSON.stringify(response.data.access))
    localStorage.setItem('refresh', JSON.stringify(response.data.refresh))
    req.headers.Authorization = `JWT ${response.data.access}`
    return req
})


export default axiosInstance;
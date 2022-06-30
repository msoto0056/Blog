import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useUserState} from '../../context/users/UserStore';


const baseURL =`${process.env.REACT_APP_API_SERVER}`


const useAxios = () => {
    const [{accessToken, refreshToken}, dispatch] = useUserState()

    const axiosInstance = axios.create({
        baseURL: baseURL,
        timeout: 5000,
        headers: {
            Authorization: accessToken ? 'JWT ' + accessToken : null,
            'Content-Type': 'application/json',
            accept: 'application/json', 
        },
    });

    

    axiosInstance.interceptors.request.use(async req => {
    
        const user = jwt_decode(accessToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: refreshToken
          });
    
        //localStorage.setItem('authTokens', JSON.stringify(response.data))
        // setAuthTokens(response.data)
        // setUser(jwt_decode(response.data.access))

        dispatch({type: 'field', fieldName: 'accessToken', payload:response.data.access}) ;
        dispatch({type: 'field', fieldName: 'refreshToken', payload:response.data.refresh}) ;
        
        req.headers.Authorization = `JWT ${response.data.access}`
        return req
    })
    
    return axiosInstance
}

export default useAxios;


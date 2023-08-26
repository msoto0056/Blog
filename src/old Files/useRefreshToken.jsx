import axios from './axios';
// import useAuth from './useAuth';
import { useUserState } from '../../context/users/UserStore';


const useRefreshToken = () => {
    //const { setAuth } = useAuth();
    const [{ auth },dispatch] = useUserState();
    const refresh = async () => {
        const response = await axios.get('/token/refresh/', {
            withCredentials: true
        });

        dispatch({type: 'field', fieldName: 'auth.accessToken', payload: response.data.accessToken,});

        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;

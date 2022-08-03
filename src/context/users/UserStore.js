import {makeStore2} from "../../custom-hooks";
import {initialState} from "./initialState";
import {actions} from '../Types';
import UserReducer from "./UserReducer";
import axiosInstance from "../../components/users/axios";
import jwt_decode from "jwt-decode";


const url = `${process.env.REACT_APP_API_SERVER}`
const msgActivationErr ='Activation Failed!.Sever unavailable';
const msgActivation ='Activation Successful!';
const msgLoginErr ='Login Error!';
const [
  UserProvider,
  useUserState
  ] = makeStore2(UserReducer, initialState)

export { UserProvider, useUserState }

export const load_user = async (dispatch,globalDispatch) => {
        if (localStorage.getItem('access')) {
        try {
            const res = await axiosInstance.get('/auth/users/me/');
            //if successful will get all mandatory user information 
            dispatch({
                type: actions.USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: actions.USER_LOADED_FAIL
            });
            globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
                {message: `Loading User Error: ${err.message}` ,isOpen:true, type:'error'}});  
        }
    } else {
        dispatch({
            type: actions.USER_LOADED_FAIL
        });
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
            {message: `Error in Local Storage access Token...!` ,isOpen:true, type:'error'}});  
    }
};

export const googleAuthenticate = (state, code,accessToken,dispatch) => async dispatch => {

    if (state && code && !accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axiosInstance.post(`${url}/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: actions.GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: actions.GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const facebookAuthenticate = (state, code, accessToken) => async dispatch => {
    if (state && code && !accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axiosInstance.post(`${url}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: actions.FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: actions.FACEBOOK_AUTH_FAIL
            });
        }
    }
};

export const checkAuthenticated = async (accessToken, dispatch) => {
    if (accessToken) {
        const body = JSON.stringify({ token: accessToken });
        try {
            const res = await axiosInstance.post('/token/verify/', body)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: actions.AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: actions.AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: actions.AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: actions.AUTHENTICATED_FAIL
        });
    }
};

export const login = async(formData, dispatch, globalDispatch) => {
    console.log("Login Function")
    const {email,password}={...formData}
    const body = JSON.stringify({ email, password });
    try {
        const res = await axiosInstance.post('/token/', body);  // --> Use my Custom Token pair with encoded user data & avoid another DB Access
        // const res = await axiosInstance.post('/auth/jwt/create/', body); --> use this if working with djoser
        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: res.data
        });
        // user data comes encoded in the token in object userInfo... validate this is the case and all information needed is encoded in the backend
        // other alternative is to use Djoser scheme, if so uncomment below dispatch and comment the following
        // dispatch(load_user(dispatch,globalDispatch));
        const jwtData =jwt_decode(res.data.access)
        console.log("userInfo",jwtData.userInfo)
        dispatch({
            type: actions.USER_LOADED_SUCCESS,
            payload: jwtData.userInfo
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: actions.LOGIN_FAIL
        })
        dispatch({
            type: actions.USER_LOADED_FAIL
        })
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
        {message: `${msgLoginErr}: ${err.message} - ${err.response.data.detail}` ,isOpen:true, type:'error'}})
    }
};

export const signup = async(formData,dispatch,globalDispatch) => {
    console.log('sign-up')
    try {
        const res = await axiosInstance.post(`/user/create/`, {
        email: formData.email,
		user_name: formData.username,
		password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
    });
        dispatch({
            type: actions.SIGNUP_SUCCESS,
            payload: res.data
        });
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
            {message: `${msgActivation}` ,isOpen:true, type:'success'}}); 
    } catch (err) {
        dispatch({type: actions.SIGNUP_FAIL, payload:err.message});
        globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload: 
        {message: `${msgActivationErr} or ${err.message}` ,isOpen:true, type:'error'}});  
    }
};

export const verify = async (uid, token, dispatch) => {
    const body = JSON.stringify({ uid, token });
    try {
        await axiosInstance.post('/auth/users/activation/', body);
        dispatch({
            type: actions.ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: actions.ACTIVATION_FAIL
        })
    }
};

export const resetPassword = async (email, dispatch) => {
    const body = JSON.stringify({ email });
    try {
        await axiosInstance.post('/auth/users/reset_password/', body);
        dispatch({
            type: actions.PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: actions.PASSWORD_RESET_FAIL
        });
    }
};

export const resetPasswordConfirm = async (uid, token, new_password, re_new_password, dispatch) => {
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
        await axiosInstance.post('/auth/users/reset_password_confirm/', body);
        dispatch({
            type: actions.PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: actions.PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = (dispatch) => {
    dispatch({
        type: actions.LOGOUT
    });
};



// Old Code kept for reference with to old methodology
// export const getData = async (dispatch) => {
//   try {
//       const response = await axios.get(url);
//       dispatch({type: actions.On_SUCCESS, payload:response.data})
//    } catch (error) {
//       dispatch({type: actions.On_FAILURE, payload: error.message})
//   }
// }

// //Update Task
// export const updateData = async (dispatch, newData)=> {
//   const data={...newData, text: newData.text, day: newData.day.toString(), reminder:newData.reminder}
//   try{
//     await axios.put(`${url}/${newData.id}`,data)
//     dispatch({type:actions.UPDATE_TASK, payload:data})
//   } catch (error) { 
//     dispatch({type:actions.UPDATE_ERROR, payload:error.message})
//   }
// }

// //Update Reminder
// export const updateReminder = async (dispatch, newData)=> {
//   const data={...newData, reminder:!newData.reminder}
//   try{
//     await axios.put(`${url}/${newData.id}`,data)
//     dispatch({type:actions.UPDATE_TASK, payload:data})
//   } catch (error) { 
//     dispatch({type:actions.UPDATE_ERROR, payload:error.message})
//   }
// }

//  // Delete Task
// export const deleteData = async (dispatch,id) => {
//   try{
//     await axios.delete(`${url}/${id}`)
//     dispatch({type:actions.FIELDS, fieldName: 'notify', payload: {message:'Deleted Successfully',isOpen:true, type:'error'}})
//     dispatch ({type:actions.REMOVE_TASK, payload:id})
//     dispatch ({type:actions.SET_COUNT, payload:-1})
//   } catch (error){
//     dispatch({type:actions.DELETE_ERROR, payload:error.message})
//   }
// }

// //Add Task
// ***** Usage ===> addData(dispatch,data);
// export const addData = async(dispatch,newData) => {
//   const updatedData={text: newData.text, day: newData.day.toString(), reminder:newData.reminder}
//   try{
//     const data= await axios.post(url,updatedData)
//     dispatch({type:actions.ADD_TASK, payload:data})
//     dispatch ({type:actions.SET_COUNT, payload:1})
//   } catch (error){
//     dispatch({type:actions.ADD_ERROR, payload:error.message})
//   }
// }


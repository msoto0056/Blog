import {makeStore2} from "../../custom-hooks";
import {initialState} from "./initialState";
import {actions} from '../Types';
import UserReducer from "./UserReducer";
import axiosInstance from "../../components/users/axiosInstance";



const url = `${process.env.REACT_APP_API_SERVER}`
const msgActivationErr ='Activation Failed!.Sever unavailable';
const msgActivation ='Activation Successful!';
const msgLoginErr ='Login Error!';
const [
  UserProvider,
  useUserState
  ] = makeStore2(UserReducer, initialState)

export { UserProvider, useUserState }

export const Load_user = async (dispatch,globalDispatch) => {
    const axiosInstance = useAxios();
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 
        try {
            const res = await axiosInstance.get(`/token/`, config);
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
    const axiosInstance = useAxios();
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

            dispatch(Load_user());
        } catch (err) {
            dispatch({
                type: actions.GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const facebookAuthenticate = (state, code, accessToken) => async dispatch => {
    const axiosInstance = useAxios();
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

            dispatch(Load_user());
        } catch (err) {
            dispatch({
                type: actions.FACEBOOK_AUTH_FAIL
            });
        }
    }
};

export const checkAuthenticated = (accessToken) => async dispatch => {
    const axiosInstance = useAxios();
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: accessToken });

        try {
            const res = await axiosInstance.post(`${url}/auth/jwt/verify/`, body, config)

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



export const Signup = async(formData,dispatch,globalDispatch) => {
    const axiosInstance = useAxios();
    console.log('sign-up')
    const conf = {
        headers: {
            Authorization: null,
            'Content-Type': 'application/json',
            accept: 'application/json',
        }
    };
    try {
        const res = await axiosInstance.post(`/user/create/`, {
        email: formData.email,
		user_name: formData.username,
		password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
    }, conf);
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

export const verify = (uid, token) => async dispatch => {
    const axiosInstance = useAxios();
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axiosInstance.post(`${url}/auth/users/activation/`, body, config);

        dispatch({
            type: actions.ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: actions.ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const axiosInstance = useAxios();
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axiosInstance.post(`${url}/auth/users/reset_password/`, body, config);

        dispatch({
            type: actions.PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: actions.PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const axiosInstance = useAxios();
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axiosInstance.post(`${url}/auth/users/reset_password_confirm/`, body, config);

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


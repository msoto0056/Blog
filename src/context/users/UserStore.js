import {makeStore2} from "react-crud-plus-state-management";
import {initialState} from "./initialState";
import {actions} from '../Types';
import UserReducer from "./UserReducer";
import axios from 'axios';

const url = `${process.env.REACT_APP_API_SERVER}`

const [
  UserProvider,
  useUserState
  ] = makeStore2(UserReducer, initialState)

export { UserProvider, useUserState }

export const load_user = () => async (accessToken,dispatch) => {
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`,
                'Accept': 'application/json'
            }
        }; 
        try {
            const res = await axios.get(`${url}/user/create/`, config);
            dispatch({
                type: actions.USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: actions.USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: actions.USER_LOADED_FAIL
        });
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
            const res = await axios.post(`${url}/auth/o/google-oauth2/?${formBody}`, config);

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
            const res = await axios.post(`${url}/auth/o/facebook/?${formBody}`, config);

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

export const checkAuthenticated = (accessToken) => async dispatch => {
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: accessToken });

        try {
            const res = await axios.post(`${url}/auth/jwt/verify/`, body, config)

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

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${url}/auth/jwt/create/`, body, config);

        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: actions.LOGIN_FAIL
        })
    }
};

export const signup = ({user}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({...user });

    try {
        const res = await axios.post(`${url}/user/create/`, body, config);

        dispatch({
            type: actions.SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: actions.SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${url}/auth/users/activation/`, body, config);

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
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${url}/auth/users/reset_password/`, body, config);

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
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${url}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: actions.PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: actions.PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
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


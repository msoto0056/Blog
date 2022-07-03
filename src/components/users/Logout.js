import React, { useEffect } from 'react';
import axiosInstance from "./axiosInstance";
import {Navigate}  from "react-router-dom";
import { useUserState,logout} from '../../context/users/UserStore';



export default function Logout() {
	const [{refreshToken},dispatch]=useUserState();
    console.log("RefreshToken", refreshToken)
	useEffect(() => {
		axiosInstance.post('/token/blacklist/', {
			refresh_token:refreshToken
		});
		logout(dispatch);
		axiosInstance.defaults.headers['Authorization'] = null;
	}, []);

	return <Navigate to='/login' replace />	;
}


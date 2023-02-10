import React, { useEffect } from 'react';
import axiosInstance from "./axios";
import {Navigate}  from "react-router-dom";
import { useUserState,logout} from '../../context/users/UserStore';
import { useGlobalDispatch } from '../../context/GlobalStore';
import { actions } from '../../context/Types';
import { useTranslation } from 'react-i18next';


export default function Logout() {
	const { t } = useTranslation()
	const msgLogout = t('msg_logout');
	const [{refreshToken},dispatch]=useUserState();
	const globalDispatch=useGlobalDispatch();
	useEffect(() => {
		// axiosInstance.post('/token/blacklist/', {
		// 	refresh_token:refreshToken
		// });
		logout(dispatch);
		globalDispatch({type:actions.FIELDS, fieldName: 'notify', payload:  {message:msgLogout ,isOpen:true, type:'success'}});
		axiosInstance.defaults.headers['Authorization'] = null;
	}, []);

	return <Navigate to='/login' replace />	;
}


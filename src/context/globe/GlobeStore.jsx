import {makeStore2} from "../../custom-hooks";
import {initialState} from "./initialState";
import GlobeReducer from "./GlobeReducer";
import {actions} from '../Types';

const [
  GlobeProvider,
  useGlobeState
  ] = makeStore2(GlobeReducer, initialState)

export { GlobeProvider, useGlobeState }


export const setUserConfig = (userConfig,dispatch) => {
    dispatch({ type: actions.SET_USER_CONFIG, payload: userConfig });
};
export const setUserPref = (userPref, dispatch) => {
    dispatch ({type: actions.SET_USER_PREF, payload:userPref })
};
export const setIsMasterAppLoading = (isMasterAppLoading,dispatch) => {
	dispatch({type: actions.SET_MASTER_APP_LOADING,
	payload: isMasterAppLoading})
};


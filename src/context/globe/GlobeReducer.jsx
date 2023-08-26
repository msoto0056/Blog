import {actions} from '../Types';


const GlobeReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_COUNT:
          return {
            ...state,
            taskCount: state.taskCount+action.payload
          };
        case actions.FIELDS: {
          return {
            ...state,
            [action.fieldName]: action.payload,
          }
        }
        case actions.SET_USER_CONFIG:
            return {
                ...state,
                userConfig: action.userConfig,
            };
        case actions.SET_USER_PREF:
            return {
                ...state,
                userPref: action.userPref,
            };
        case actions.SET_MASTER_APP_LOADING:
            return {
                ...state,
                isMasterAppLoading: action.isMasterAppLoading,
            };
      default:
        return state;
    }
  };
  export default GlobeReducer
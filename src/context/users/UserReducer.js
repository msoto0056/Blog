  import {actions} from '../Types';
  
  const UserReducer = (state, action) => {
    switch (action.type) {
      case actions.AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case actions.LOGIN_SUCCESS:
        case actions.GOOGLE_AUTH_SUCCESS:
        case actions.FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh
            }
        case actions.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isAccountCreated: true
            }
        case actions.USER_LOADED_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case actions.AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case actions.USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                accessToken: null,
                refreshToken: null
            }
        case actions.GOOGLE_AUTH_FAIL:
        case actions.FACEBOOK_AUTH_FAIL:
        case actions.LOGIN_FAIL:
        case actions.SIGNUP_FAIL:
        case actions.LOGOUT:  
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                isAccountCreated:false,
                user: null,
                isLoading: false,
                isError:true,
                errorMsg:`Login Failed...!. The error message received!: ${action.payload}` 
            }
        case actions.PASSWORD_RESET_SUCCESS:
        case actions.PASSWORD_RESET_FAIL:
        case actions.PASSWORD_RESET_CONFIRM_SUCCESS:
        case actions.PASSWORD_RESET_CONFIRM_FAIL:
        case actions.ACTIVATION_SUCCESS:
        case actions.ACTIVATION_FAIL:
            return {
                ...state,
            }
      case actions.INCREMENT:
        return {...state,
          count: state.count + 1 
        }
      case actions.DECREMENT:
        return {...state,
          count: state.count - 1 
        }
      
      case actions.UPDATE_ERROR:
        return{
        ...state,  
          isLoading: false,
          isError:true,
          errorMsg:`Error Updating Data...! check url. The error message from http: ${action.payload}` 
        }
      case actions.UPDATE_TASK: 
          {
          const newItem = state.tasks.map(task => { 
            if (task.id === action.payload.id){
              const updatedItem = {
              ...task, 
              text: action.payload.text,
              day: action.payload.day,
              reminder: action.payload.reminder,
              };
              return  updatedItem;
            }
            return task;
          });
          return {...state, tasks: newItem };
        }
      case actions.ADD_TASK: 
        return {
          ...state,
          isLoading: false,
          isError:false,
          tasks: [...state.tasks,action.payload]
        }
      case actions.ADD_ERROR:
        return{
          ...state,  
          isLoading: false,
          isError:true,
          errorMsg:`Error Inserting Data...! check url. The error message from http: ${action.payload}`
        }
      case actions.REMOVE_TASK: 
        return {
          ...state,
          tasks: state.tasks.filter(
            (task) => task.id !== action.payload
          )
        };
      case actions.DELETE_ERROR:
        return{
          ...state,  
          isLoading: false,
          isError:true,
          errorMsg:`Error Deleting Data...! check url. The error message from http: ${action.payload}`
        }
      case actions.On_SUCCESS:  
          return {  
            ...state,
            isLoading: false,  
            tasks: action.payload, 
            taskCount: action.payload.length,
            isError: false, 
            errorMsg: ''  
          };
        case actions.On_FAILURE:  
          return {  
            ...state,
            isLoading: false,
            isError:true,
            tasks: [],  
            // errorMsg:, 
            errorMsg: `Error loading Data...! check url. The error message from http: ${action.payload}`
          };
        case actions.SET_COUNT:
          return {
            ...state,
            taskCount: state.taskCount+action.payload
          };
        case actions.FIELDS: {
          return {
            ...state,
            [action.fieldName]: action.payload,
            //usage i.e  onChange={(e) => dispatch({type: 'field', fieldName: 'username', payload: e.currentTarget.value,}) };,
          }
        }
      default:
        return state;
    }
  };
  export default UserReducer
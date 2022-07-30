import {makeStore} from "../custom-hooks";
import {actions} from './Types';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';

export const initialState = {
  // define elements to use in the app 
  confirmationDialog:{
      "confirmDel":false, 
      "isOpen":false,
      "title":'',
      "subTitle":'',
      "onConfirm": ()=>{console.log("deleting")},
    },
    notify:{
      "isOpen":false,
      "message":'',
      "type":'info'
    },
    appName:"BlogMe",
    appNameDrawer:"BlogMe App",
    // Menu Items:
    "drawerWidth": 240,
    "anchor": 'left', // options:  top, left, bottom, right 
    // Menu Options for All user including Guest
    menuItems: [
      {
        text:"Blog",
        icon:<ArticleOutlinedIcon color="secondary" />, 
        path:"/"
      },
      {
        text:"Item 2",
        icon:<ArchiveOutlinedIcon color="secondary" />, 
        path:"/anyPage"
      },
      {
        text:"Item 3",
        icon:<MoveToInboxOutlinedIcon color="secondary" />, 
        path:"/"
      },
      {
        text:"Item 4",
        icon:<MoveToInboxOutlinedIcon color="secondary" />, 
        path:"/"
      },
      {
        text:"Item 5",
        icon:<AcUnitIcon color="primary" />, 
        path:"/settings"
      },
    ],

    
    // Menu Options for login users 
    privateMenuItems: [
      {
        text:"Create Blog",
        icon:<NoteAddOutlinedIcon color="secondary" />, 
        path:"/addBlog/"
      },
      {
        text:"All Mail",
        icon:<EmailOutlinedIcon color="primary" />, 
        path:"/anyPage"
      },
      {
        text:"Trash",
        icon:<ArchiveOutlinedIcon color="secondary" />, 
        path:"/addBlog/"
      },
      {
        text:"Spam",
        icon:<MoveToInboxOutlinedIcon color="secondary" />, 
        path:"/"
      },
    ]

    


};
const GlobalReducer = (state, action) => {
    switch (action.type) {
        case actions.FIELDS: {
          return {
            ...state,
            [action.fieldName]: action.payload,
          }
        }
      default:
        return state;
    }
  };

const [
  GlobalProvider,
  useGlobalStore,
  useGlobalDispatch
] = makeStore(GlobalReducer, initialState)

export { GlobalProvider, useGlobalStore, useGlobalDispatch }
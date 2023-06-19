import axiosInstance from '../components/users/axios';
// import axios from 'axios';
import {Container} from  '../layout/Container'
import Alert from '@mui/material/Alert';
import {makeStore} from "../custom-hooks";
import {actions} from './Types';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import Flag from 'react-world-flags'

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
    title:'BlogmeUp',

    // Menu Items & Drawer
    "drawerWidth": 240,
    "drawerState":false,  // Manage the State of the Drawer (Open =true / Close - false)
    "openSubMenu":false, // Manage the State of the SubMenu of Register users (Open =true / Close - false)
    "clickonSubMenu":false, // Control if the last click was on the option to open submenu for Register users
    "anchor": 'left', // options:  top, left, bottom, right 
    // Display or not promotionMessages if promotions are in DB if not it won't display anything
    'displayPromotionMsg':false,
    // Pagination size if pagination is selected
    "pageSize" : 4, 
    // Menu Options for All user including Guest
    menuItems: [
      {
        text:"Blog",
        icon:<ArticleOutlinedIcon color="secondary" />, 
        path:"/"
      },
      {
        text:"Products",
        icon:<ProductionQuantityLimitsOutlinedIcon color="primary" />, 
        path:"/Products"
      },
      {
        text:"Any Page",
        icon:<ArchiveOutlinedIcon color="secondary" />, 
        path:"/anyPage"
      },
      {
        text:"Maps",
        icon:<LanguageIcon color="primary" />, 
        path:"/map"
      },
      {
        text:"Mapa d3",
        icon:<LanguageIcon color="third" />, 
        path:"/mapa"
      },
      {
        text:"Mapita d3 - Spring",
        icon:<LanguageIcon color="warning" />, 
        path:"/mapita"
      },
      {
        text:"Settings",
        icon:<AcUnitIcon color="primary" />, 
        path:"/settings"
      },
      {
        text:"D3 GlobeMap - Zoom Pan Rotate",
        icon:<LanguageIcon color="warning" />, 
        path:"/d3GlobeMap"
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
    ],

    // Languages Enabled for the Application 
    languages : [
      {
        code: "fr",
        name: "Français",
        country_code: "fr",
        iconFlag: <Flag code="fr" height="16"  />
      },
      {
        code: "en",
        name: "English",
        country_code: "gb",
        iconFlag: <Flag code="gb" height="16" />
      },
      {
        code: "es",
        name: "Español",
        country_code: 'cr',
        iconFlag: <Flag code="cr" height="16" />
      },
      {
        code: "it",
        name: "Italiano",
        country_code: 'it',
        iconFlag: <Flag code="it" height="16" />
      },
      {
        code: "pt",
        name: "Português",
        country_code: 'br',
        iconFlag: <Flag code="br" height="16"  />
      },
      {
        code: 'de',
        name: "German",
        // dir: 'rtl',
        country_code: 'de',
        iconFlag: <Flag code="de" height="16" />
      },
      {
        code: 'ru',
        name: "Русский",
        // dir: 'rtl',
        country_code: 'ru',
        iconFlag: <Flag code="ru" height="16" />
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



export const InitialDataLoad = async ({url, dispatch, arrayName}) => {
  try {
    const response = await axiosInstance.get(url);
    dispatch({type:actions.FIELDS, fieldName: arrayName, payload:response.data})
  } catch (errorMsg) {
    <Container>
      <Alert severity="error">{errorMsg.message}</Alert>
    </Container>
  }
  
}


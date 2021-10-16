export const initialState = {
    UserCount:0,
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:0,
    authenticationMethod:'JWT',
    accessToken:'',
    refreshToken:'',
    isAuthenticated:null,
    user: {
      'email': "",
      'username': "",
      'password': "",
      'firstName':"",
      'lastName':"",
      're_password':''
    },
    url: 'http://localhost:8000/api/'
};



export const initialState = {
    UserCount:0,
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:0,
    authenticationMethod:'JWT',
    accessToken:'',
    refreshToken:'',
    isAuthenticated:false,
    isAccountCreated:false,
    user: {
      'email': "",
      'username': "",
      'password': "",
      'firstName':"",
      'lastName':"",
      're_password':'',
      'idiom':'',
      'is_active': null,
      'is_staff': null,
    }
};



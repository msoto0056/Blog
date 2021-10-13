export const initialState = {
    blogCount:0,
    blog: {
      "title": "",
      "author": 0,
      "excerpt": "",
      "content":"",
      "status":"",
      // "published":new Date(),
      "active": true
    },
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:0,
    url: 'http://localhost:8000/blog/api/'
};

        
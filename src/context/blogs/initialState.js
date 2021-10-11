export const initialState = {
    blogCount:10,
    blog: {
      "title": "",
      "author": 0,
      "excerpt": "",
      "content":"",
      "status":'',
      "published":new Date(),
    },
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:0,
    url: 'http://localhost:8000/blog/api/'
};
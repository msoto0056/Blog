export const initialState = {
    blogCount:0,
    blog: {
      "id": null,
      "title": "",
      "author": 0,
      "excerpt": "",
      "content":"",
      "status":"",
      // "published":new Date(),
      "active": true,
      "slug":''
    },
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:0,
    url: 'http://localhost:8000/api/blog/'
};

        
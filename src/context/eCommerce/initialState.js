export const initialState = {
    productCount:0,  
    product: {
      "id": null,
      "title": "",
      "description": "",
      "price":null,
      "cost":null,
      "image":null,
      "upload":null,
      "active": true,
      "slug":'',
      'rating':null,
      'productImages':[],
      'qty':0
    },
    showCart: false,
    cartItems: [],
    category:'All Products',
    categoryId:0,
    categories:[],
    promotionMessages:null,
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:1,
    productCountInCart: 0,
    url: 'http://localhost:8000/api/product/',
    urlPromo: 'http://localhost:8000/api/promotions/', 
    urlCategories: 'http://localhost:8000/api/categories/',
};



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
      'qty':null
    },
    showCart: false,
    cartItems: [],
    promotionMessages:null,
    promotionMessagescopy:null,
    isLoading: false,  
    isError: false,
    errorMsg: '',
    count:0,
    url: 'http://localhost:8000/api/product/',
    urlPromo: 'http://localhost:8000/api/promotions/', 
    productCountInCart:0,  
};



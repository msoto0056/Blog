//usage see read.me
import axios from 'axios';
import {useQuery} from "react-query";

export const useRetrieve = (keyItem,url,onSuccess=null) => {
  const useGetData = async ({ queryKey }) => {
    /* eslint-disable no-unused-vars */
    const [_key, { url }] = queryKey;
    const { data } = await axios.get(url);
    return data;
  };
    // return data
    return useQuery([keyItem, { url }], useGetData,  { onSuccess: onSuccess});
};




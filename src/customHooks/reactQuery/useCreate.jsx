//usage see read.me
import axios from 'axios';
import { useMutation, useQueryClient } from "react-query"

export const useCreate = (keyItem,url,onSuccess=null) => {
  const queryClient = useQueryClient()
  const addData = async ({url,...data}) => {
    return await axios.post(url,data);
  };
  const { mutateAsync, isLoading,error, isError } = useMutation(addData,{ onSuccess: onSuccess})
  const create = async (data) => {
    await mutateAsync( {url,...data})
    queryClient.invalidateQueries(keyItem)
  }
  return {isLoading, create,error, isError}
}   
 

 
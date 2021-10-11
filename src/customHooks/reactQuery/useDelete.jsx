//usage  useDelete("Valid QueryKey",valid -Url);
import axios from 'axios';
import { useMutation, useQueryClient } from "react-query"

export const useDelete = (keyItem,url,onSuccess=null,onMutate=null) => {
  const queryClient = useQueryClient()
  const deleteData = async (url) => {
    const { data } = await axios.delete(url);
    return data;
  };
  const { mutateAsync, isLoading,error, isError } = useMutation(deleteData,{ onSuccess: onSuccess, onMutate:onMutate})
  const remove = async (id) => {
    const uri = `${url}/${id}`
    await mutateAsync(uri)
    queryClient.invalidateQueries(keyItem)
  }
  return {isLoading, remove, error, isError}
}   
 
  

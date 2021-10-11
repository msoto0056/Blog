//usage see read.me
import axios from 'axios';
import { useMutation, useQueryClient } from "react-query"

export const useUpdate = (keyItem,url,onSuccess=null) => {
  const queryClient = useQueryClient()
  const updateData = async ({uri,...data}) => {
    return await axios.put(uri,data);
  };
  const { mutateAsync, isLoading, error, isError } = useMutation(updateData,{ onSuccess: onSuccess})
  const update = async (data) => {
    const uri = `${url}/${data.id}`
    await mutateAsync( {uri,...data})
    queryClient.invalidateQueries(keyItem)
  }
  return {isLoading, update, error, isError}
}   
 
import {updateFavoritePost} from '../../api';
import queryClient from '../../api/queryClient';
import {queryKeys} from '../../constants';
import {UseMutationCustomOptions} from '../../types/common';
import {useMutation} from '@tanstack/react-query';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.FAVORITE, queryKeys.GET_FAVORIES],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;

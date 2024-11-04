import {deletePost} from '../../api';
import queryClient from '../../api/queryClient';
import {queryKeys} from '../../constants';
import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '../../types/common';

function useMutateDel(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateDel;

import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '../../types/common';
import queryClient from '../../api/queryClient';
import {queryKeys} from '../../constants';
import {updatePost} from '../../api';

function useMutateUpdat(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.GET_CALENDAR_POSTS,
          new Date(newPost.date).getFullYear(),
          new Date(newPost.date).getMonth() + 1,
        ],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateUpdat;

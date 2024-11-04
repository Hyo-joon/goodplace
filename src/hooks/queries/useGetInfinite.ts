import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {getPosts, ResponsePost} from '../../api';
import {queryKeys} from '../../constants';
import {ResponseError} from '../../types/common';
function useGetInfinite(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastpage, allPages) => {
      const lastPost = lastpage[lastpage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinite;

import { getPosts } from '@/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';

function useGetInfinitePost() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: [queryKeys.GET_POSTS, queryKeys.POST],
    initialPageParam: 1, // 초기 페이지 번호 파라미터
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1]; // 마지막 페이지의 마지막 포스트
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}
export default useGetInfinitePost;

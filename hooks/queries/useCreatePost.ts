import { queryKeys } from '@/constants';
import queryClient from '@/api/queryClient';
import { createPost } from '@/api/post';
import { useMutation } from '@tanstack/react-query';
import { router, Router } from 'expo-router';
function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace('/');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      }); // 서버에서 새 데이터를 불러와 캐시를 업데이트
    },
  });
}

export default useCreatePost;

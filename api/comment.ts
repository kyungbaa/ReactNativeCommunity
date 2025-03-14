import { CreateCommentDto } from '@/types';
import axiosInstance from './axios';

async function createComment(body: CreateCommentDto) {
  const { data } = await axiosInstance.post('/comments', body);
  return data;
}

async function deleteComment(id: number) {
  const { data } = await axiosInstance.delete(`/comments/${id}`);
  return data;
}

// 게시글 조회시 댓글 데이터도 함께 받아옴으로 다른 getCommet같은 함수는 필요없다

export { createComment, deleteComment };

import { postLogin, postSignup, getMe } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { removeHeader, setHeader } from '@/utils/header';
import {
  saveSeureStore,
  deleteSecureStore,
  getSecureStore,
} from '@/utils/secureStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { queryKeys } from '@/constants';

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME], // 캐시를 위한 키  개빌지기 설장함
  });

  //  사용자 정보를 가져오는 API 호출(getMe)을 수행합니다.
  // 에러가 발생하면(예: 토큰이 만료된 경우) 자동으로 인증 헤더를 제거하고 저장된 토큰을 삭제합니다.

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore('accessToken');
        setHeader('Authorization', `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      deleteSecureStore('accessToken');
    }
  }, [isError]);
  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await saveSeureStore('accessToken', accessToken);
      // 로그인 후 내 정보를 가져옴
      queryClient.fetchQuery({ queryKey: ['auth', 'getMe'] });
      router.replace('/');
    },
    onError: () => {},
  });
}
// useLogin 훅:

// 로그인 API(postLogin)를 호출하는 뮤테이션을 생성합니다.
// 로그인 성공 시:
// 응답으로 받은 토큰을 Authorization 헤더에 설정합니다.
// 토큰을 안전한 저장소에 저장합니다.
// 사용자 정보를 즉시 가져옵니다.
// 메인 페이지('/')로 리다이렉트합니다.

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace('/auth/login'),

    onError: () => {},
  });
}

// useSignup 훅:

// 회원가입 API(postSignup)를 호출하는 뮤테이션을 생성합니다.
// 회원가입 성공 시 로그인 페이지('/auth/login')로 리다이렉트합니다.

const logout = () => {
  removeHeader('Authorization');
  deleteSecureStore('accessToken');
  queryClient.resetQueries({ queryKey: ['auth'] });
};
// logout
// 인증 헤더를 제거합니다.
// 저장된 액세스 토큰을 삭제합니다.
// 인증 관련 쿼리 캐시를 초기화합니다.

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  return {
    auth: {
      id: data?.id || '',
      nickname: data?.nickname || '',
    },
    loginMutation,
    signupMutation,
    logout,
  };
}

// useAuth 훅:
// 위에서 정의한 모든 인증 관련 기능을 하나로 묶어 외부에 노출합니다.
// 사용자 ID 정보, 로그인/회원가입 뮤테이션, 로그아웃 함수를 반환합니다.

export default useAuth;

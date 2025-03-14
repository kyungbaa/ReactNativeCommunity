import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormProvider, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import DescriptionInput from '@/components/DescriptionInput';
import TitleInput from '@/components/TitleInput';
import useCreatePost from '@/hooks/queries/useCreatePost';
import { ImageUri } from '@/types';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

export default function PostWriteScreen() {
  const navigation = useNavigation();
  const createPost = useCreatePost();

  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
    },
  });
  // useForm 생성하는 함수
  // register: 폼 필드를 등록하는 함수
  // handleSubmit: 폼 제출 처리 함수
  // watch: 폼 값의 변화를 감시하는 함수
  // errors: 폼 유효성 검사 오류 객체
  // setValue: 폼 필드 값을 설정하는 함수
  // reset: 폼을 초기화하는 함수
  // 기타 여러 상태 및 메서드들

  // 프레드 연산자(...)는 이 모든 메서드와 속성을 FormProvider에 props로 전달하는 간편한 방법

  const onSubmit = (formValues: FormValues) => {
    createPost.mutate(formValues);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          varient="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {/* FormProvider로 폼 상태를 공유 */}
        {/* 이하 컴포넌트들은 useForm으로 생성한 폼 상태에 접근 가능 */}
        <TitleInput />
        <DescriptionInput />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});

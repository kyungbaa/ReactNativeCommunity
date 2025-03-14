import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormProvider, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import DescriptionInput from '@/components/DescriptionInput';
import TitleInput from '@/components/TitleInput';
import useCreatePost from '@/hooks/queries/useCreatePost';
import { ImageUri } from '@/types';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import useGetPost from '@/hooks/queries/useGetPost';
import useUpdatePost from '@/hooks/queries/useUpdatePost';
type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = useGetPost(Number(id));
  const navigation = useNavigation();
  const updatePost = useUpdatePost();

  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
    },
  });

  // post 데이터가 로딩되면 폼 값 업데이트
  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        description: post.description,
        imageUris: post.imageUris || [],
      });
    }
  }, [post]);

  const onSubmit = (formValues: FormValues) => {
    updatePost.mutate(
      { id: Number(id), body: formValues },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
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
  }, [navigation, postForm, onSubmit]);

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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

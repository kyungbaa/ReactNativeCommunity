import React from 'react';
import { View, StyleSheet } from 'react-native';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';
import useAuth from '@/hooks/queries/useAuth';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  const loginForm = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (FormValues: FormValues) => {
    console.log(FormValues);
    const { email, password } = FormValues;
    loginMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="로그인"
        onPress={loginForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 16, gap: 16 },
});

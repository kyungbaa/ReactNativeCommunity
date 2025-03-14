import InputField from '@/components/InputField';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';
import PasswordConfirmInput from '@/components/PasswordConfirmInput';
import useAuth from '@/hooks/queries/useAuth';
type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const { signupMutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (FormValues: FormValues) => {
    const { email, password } = FormValues;

    signupMutation.mutate({
      email,
      password,
    });
  };

  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label="회원가입"
        // onPress={handleSubmit}
        onPress={signupForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 16, gap: 16 },
});

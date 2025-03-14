import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';

function EmailInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return '이메일을 입력해주세요.';
          }
          if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data) === false) {
            return '이메일 형식이 올바르지 않습니다.';
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="이메일"
          placeholder="이메일을 입력해주세요."
          inputMode="email"
          returnKeyType="next"
          // inputMode="numeric"
          submitBehavior="submit"
          onSubmitEditing={() => {
            setFocus('password');
          }}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default EmailInput;

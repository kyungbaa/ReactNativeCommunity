import React, { ForwardedRef, forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
} from 'react-native';
import { colors } from '@/constants';
interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: 'filled' | 'standard' | 'outline';
  error?: string;
  rightChild?: React.ReactNode;
}

const InputField = (
  {
    label,
    variant = 'filled',
    error = '',
    rightChild = null,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          props.multiline && styles.multiline,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          ref={ref}
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          returnKeyType="next" // 키보드 모양 변경 확인에서 다음으로 변경되면 텝시 다음 인풋창으로 넘어감
          autoCapitalize="none" //자동 대문자 변환 false
          spellCheck={false} //맞춤법 틀릴경우 빨간줄 false
          autoCorrect={false} //맞춤법 틀릴경우 강제수정 false
          {...props}
        />
        {rightChild}
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: colors.GRAY_100,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 6,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {},
  outline: {},
  input: {
    padding: 0,
    fontSize: 16,
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: colors.RED_500,
    marginTop: 5,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
  multiline: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    height: 200,
  },
});

export default forwardRef(InputField);

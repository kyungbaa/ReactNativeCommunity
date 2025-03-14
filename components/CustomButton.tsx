import { colors } from '@/constants';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'medium' | 'large';
  varient?: 'standard' | 'filled';
}

export default function CustomButton({
  label,
  size = 'large', // default value 사이즈를 따로 지정하지 않았을경우 기본 값은 large
  varient = 'filled',
  ...props
}: CustomButtonProps) {
  return (
    // <Pressable style={[styles.container, styles[size], styles[varient]]}>
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[varient],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text style={styles[varient]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: '100%',
    height: 44,
  },
  medium: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  pressed: {
    opacity: 0.5,
  },
  standard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.ORANGE_600,
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import { colors } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

const FixedBottomCTA = ({ label, onPress }: FixedBottomCTAProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.fixed, { paddingBottom: inset.bottom || 12 }]}>
      {/* 아이폰의 노치 영역 침범 방지 , 안드로이드의 경우 이미 노치영역을 침범하지 않기 때문에 값이 0이 되어 버튼이 바닥에 붙는다. 그래서 대신 12를 넣어줌 */}
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  fixed: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});

export default FixedBottomCTA;

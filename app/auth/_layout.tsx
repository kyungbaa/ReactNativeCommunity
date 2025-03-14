import { Stack, Link } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';
import { colors } from '@/constants';
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '로그인',
          headerShown: true,
          headerLeft: () => (
            <Link href={'/'} replace style={{ paddingRight: 5 }}>
              <Foundation
                name="home"
                size={26}
                color={colors.BLACK}
                style={{ marginLeft: 16 }}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: '이메일 로그인',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal', // 이전의 창으로 돌아가는 버튼을 어떻게 보여줄지 결정
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: '회원가입',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal', // 이전의 창으로 돌아가는 버튼을 어떻게 보여줄지 결정
        }}
      />
    </Stack>
  );
}

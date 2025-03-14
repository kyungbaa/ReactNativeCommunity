import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

function RootNavigation() {
  const { auth } = useAuth();
  console.log('auth', auth);

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: 'success',
        text1: `${auth.nickname ?? '회원'}님 환영합니다👋`,
        text2: '로그인 되었습니다.',
        // position: 'bottom',
      });
  }, [auth.id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

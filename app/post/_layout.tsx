import { Stack, Link } from 'expo-router';
import { colors } from '@/constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: '글쓰기',
          headerShown: true,
          headerLeft: () => (
            <Link href={'/'} replace style={{ paddingRight: 5 }}>
              <Feather
                name="arrow-left"
                size={26}
                color={colors.BLACK}
                style={{ marginLeft: 16 }}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace('/')
              }
            >
              <Feather name="arrow-left" size={28} color={'black'} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: '수정',
          headerShown: true,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={28}
              color={'black'}
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}

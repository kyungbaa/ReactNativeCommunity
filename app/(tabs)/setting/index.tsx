import { Text, SafeAreaView } from 'react-native';
import AuthRoute from '@/components/AuthRoute';
import useAuth from '@/hooks/queries/useAuth';

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView>
        <Text onPress={logout}>로그아웃</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

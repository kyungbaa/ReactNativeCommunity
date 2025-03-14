import { StyleSheet, View } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import { useFocusEffect, router } from 'expo-router';
interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace('/auth'); // auth.id가 없으면 /auth 화면으로 이동
  });

  return <>{children}</>;
};

const styles = StyleSheet.create({});

export default AuthRoute;

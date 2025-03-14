import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
// import FeedItem from '@/components/FeedItem';
import FeedList from '@/components/FeedList';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function HomeScreen() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {auth.id && (
        <Pressable
          style={styles.writeButton}
          android_ripple={{
            color: 'rgba(255, 255, 255, 0.3)',
            borderless: false,
            radius: 30,
          }}
          onPress={() => {
            router.push('/post/write');
          }}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  writeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 3, // 안드로이드 전용 그림자
  },
});

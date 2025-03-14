import { useState, useRef } from 'react';
import AuthRoute from '@/components/AuthRoute';
import FeedItem from '@/components/FeedItem';
import InputField from '@/components/InputField';
import { colors } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { useLocalSearchParams } from 'expo-router';
import useCreateComment from '@/hooks/queries/useCreateComment';
import CommentItem from '@/components/CommentItem';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { set } from 'react-hook-form';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  if (isPending || isError) {
    return <></>;
  }
  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content: content,
    };
    createComment.mutate(commentData);
    setContent('');
    // (댓글이 추가되면 스크롤이 하단으로 이동) 최신 댓글을 확인할 수 있음
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>
            {post.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment} // 사용자가 키보드에서 "완료" 또는 "전송(Submit)" 버튼(주로 엔터 키)을 눌렀을 때 호출되는 함수
              onChangeText={(text) => setContent(text)}
              placeholder="댓글을 입력해주세요."
              rightChild={
                <Pressable
                  disabled={!content}
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    width: '100%',
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    padding: 16,
    bottom: 0,
    position: 'absolute',
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});

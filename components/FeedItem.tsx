import { colors } from '@/constants';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Octicons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Post } from '@/types';
import Profile from './profile';
import useAuth from '@/hooks/queries/useAuth';
import { useActionSheet } from '@expo/react-native-action-sheet';
import useDeletePost from '@/hooks/queries/useDeletePost';
import { router } from 'expo-router';
interface FeedItemProps {
  post: Post;
  isDetail?: boolean;
}

const FeedItem = ({ post, isDetail = false }: FeedItemProps) => {
  const { auth } = useAuth();
  const likeUsers = post.likes?.map((like) => Number(like.userId)); //게시물에 좋아요를 누른 사용자들의 ID 배열을 생성 -> 각 좋아요 객체에서 userId를 추출하고 Number()로 숫자 타입으로 변
  const isLiked = likeUsers?.includes(Number(auth.id));
  //  현재 로그인한 사용자(auth.id)가 이 게시물에 좋아요를 눌렀는지 확인합니다.
  // likeUsers 배열에 현재 사용자의 ID가 포함되어 있는지 체크합니다.
  // auth.id도 숫자로 변환하여 타입을 맞춥니다.
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();

  const handlePressOption = () => {
    const options = ['삭제', '수정', '취소'];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 0;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedindex?: number) => {
        switch (selectedindex) {
          case destructiveButtonIndex:
            deletePost.mutate(post.id);
            break;
          case 1:
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          onPress={() => {}}
          option={
            auth.id === post.author.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        {/* // 글자가 3줄을 넘어가면 ... 으로 표시 */}
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.descripttion}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Octicons
            name={isLiked ? 'heart-fill' : 'heart'}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes?.length || '좋아요'}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || '댓글'}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />

          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: '600',
    marginVertical: 8,
  },
  descripttion: {
    fontSize: 16,
    color: colors.GRAY_600,
    marginBottom: 8,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '33.3333%',
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  activeMenuText: {
    fontWeight: '500',
    color: colors.ORANGE_600,
  },
});

export default FeedItem;

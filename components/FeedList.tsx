import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import FeedItem from './FeedItem';
import { colors } from '@/constants';
import useGetInfinitePost from '@/hooks/queries/useGetInfinitePost';
import { useScrollToTop } from '@react-navigation/native';

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePost();
  const [isRefetching, setIsRefetching] = useState(false);

  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const handleEndReached = () => {
    // 다음 페이지가 있고, 현재 페이지를 불러오는 중이 아닐 때만 다음 페이지를 불러옴
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()} // pages.flat()을 사용하여 2차원 배열을 1차원 배열로 변환
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefetching} // flatList에게 현재 새로고침중인지 알려줌 true: 로딩 인디케이터(스피너) 표시 false: 아무것도 표시하지 않음
      onRefresh={handleRefresh} // 당겨서 새로고침(pull-to-refresh)을 사용할 때 호출되는 함수
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;

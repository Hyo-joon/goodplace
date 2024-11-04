import {FlatList, StyleSheet, Text, View} from 'react-native';
import useGetInfinite from '../hooks/queries/useGetInfinite';
import React, {useState} from 'react';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '../hooks/queries/useGetFavorite';

function FeedFavoirteList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoirteList;

import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';

import {FeedStackParamList} from '../../stack/FeedStackNavigator';
import useGetPost from '../../hooks/queries/useGetPost';
import {
  colors,
  feedNavigations,
  mainNavigations,
  mapNavigations,
} from '../../constants';
import {getDateLocaleFormat} from '../../utils/date';
import PreviewImageList from '../../component/PreviwImage';
import CustomButton from '../../component/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainDrawerParamList} from '../../navigation/drawer/MainDrawerNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import useLocationStore from '../../store/useLocationStore';
import useModal from '../../hooks/userModal';
import FeedOption from '../../component/FeedOption';
import usePostStore from '../../store/usePostStore';
import useMutateFavoritePost from '../../hooks/queries/useMutateFavorite';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const options = useModal();
  const favorite = useMutateFavoritePost();
  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);
  const insets = useSafeAreaInsets();
  const {setMoveLocation} = useLocationStore();
  const {setPost} = usePostStore();

  useEffect(() => {
    post && setPost(post);
  }, [post]);
  if (isPending || isError) {
    return <></>;
  }
  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };
  const handlePressFavorite = () => {
    favorite.mutate(post.id);
  };
  return (
    <>
      <ScrollView
        scrollIndicatorInsets={{right: 1}}
        style={
          insets.bottom
            ? [styles.container, {marginBottom: insets.bottom + 50}]
            : [styles.container, styles.scrollNoInsets]
        }>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <Octicons
              name="arrow-left"
              size={30}
              color={colors.WHITE}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="ellipsis-vertical"
              size={30}
              color={colors.WHITE}
              onPress={options.show}
            />
          </View>
        </SafeAreaView>

        <View style={styles.imageContainer}>
          {post.images.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: post.images[0].uri,
              }}
              resizeMode="cover"
            />
          )}
          {post.images.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
        {post.images.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUris={post.images} zoomEnable />
          </View>
        )}
        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Octicons name="location" size={10} color={colors.GRAY_400} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문날짜</Text>
                <Text style={styles.infoColumnValueText}>
                  {getDateLocaleFormat(post.date)}
                </Text>
              </View>
              <View style={styles.infoColumn}></View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}></View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
      </ScrollView>
      <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
        <View
          style={[
            styles.tabContainer,
            insets.bottom === 0 && styles.tabContainerNoInsets,
          ]}>
          <Pressable
            style={({pressed}) => [
              pressed && styles.bookmarkPressedContainer,
              styles.bookmarkContainer,
            ]}
            onPress={handlePressFavorite}>
            <Octicons
              name="star-fill"
              size={30}
              color={post.isFavorite ? colors.YELLOW_400 : colors.GRAY_100}
            />
          </Pressable>
          <CustomButton
            label="위치보기"
            variant="filled"
            onPress={handlePressLocation}
          />
        </View>
      </View>

      <FeedOption isVisible={options.isVisible} hideOption={options.hide} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  headerContainer: {
    top: 0,
    zIndex: 1,
    width: '100%',
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumnKeyText: {
    color: colors.BLACK,
  },
  infoColumnValueText: {
    color: colors.GREEN_500,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_400,
    fontSize: 12,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tabContainerNoInsets: {
    marginBottom: 10,
  },
  bookmarkContainer: {
    backgroundColor: colors.GREEN_700,
    height: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 3,
  },
  bookmarkPressedContainer: {
    opacity: 0.5,
  },
  scrollNoInsets: {
    marginBottom: 65,
  },
});

export default FeedDetailScreen;

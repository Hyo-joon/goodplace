import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ImageUri} from '../types/domain';
import {colors, feedNavigations} from '../constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FeedStackParamList} from '../stack/FeedStackNavigator';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  showOption?: boolean;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  zoomEnable?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  showOption = false,
  onChangeOrder,
  zoomEnable = false,
}: PreviewImageListProps) {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const handlePressImage = (index: number) => {
    if (zoomEnable) {
      navigation.navigate(feedNavigations.IMAGE_ZOOM, {
        index,
      });
    }
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => {
          return (
            <View key={uri} style={styles.imageContainer}>
              <Pressable onPress={() => handlePressImage(index)}>
                <Image
                  style={styles.image}
                  source={{
                    uri: uri,
                  }}
                  resizeMode="cover"
                />

                {showOption && (
                  <>
                    <Pressable
                      style={[styles.imageButton, styles.deleteButton]}
                      onPress={() => onDelete && onDelete(uri)}>
                      <Ionicons name={'close'} size={16} color={colors.WHITE} />
                    </Pressable>

                    {index > 0 && (
                      <Pressable
                        style={[styles.imageButton, styles.moveLeftButton]}
                        onPress={() =>
                          onChangeOrder && onChangeOrder(index, index - 1)
                        }>
                        <Ionicons
                          name={'arrow-back-outline'}
                          size={16}
                          color={colors.WHITE}
                        />
                      </Pressable>
                    )}
                    {index < imageUris.length - 1 && (
                      <Pressable
                        style={[styles.imageButton, styles.moveRightButton]}
                        onPress={() =>
                          onChangeOrder && onChangeOrder(index, index + 1)
                        }>
                        <Ionicons
                          name={'arrow-forward-outline'}
                          size={16}
                          color={colors.WHITE}
                        />
                      </Pressable>
                    )}
                  </>
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

export default PreviewImageList;
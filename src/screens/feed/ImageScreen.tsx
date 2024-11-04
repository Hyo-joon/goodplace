import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {FeedStackParamList} from '../../stack/FeedStackNavigator';
import {feedNavigations} from '../../constants';
import usePostStore from '../../store/usePostStore';
import ImageCarousel from '../../component/ImageSelect';

type ImageScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

function ImageScreen({route}: ImageScreenProps) {
  const {index} = route.params;
  const {detailPost} = usePostStore();

  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
}

export default ImageScreen;

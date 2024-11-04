import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {MapStackParamList} from '../../stack/MapStackNavigator';
import PostForm from '../../component/PostForm';
import {mapNavigations} from '../../constants';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {} = route.params;

  return <PostForm location={location} />;
}

export default AddPostScreen;

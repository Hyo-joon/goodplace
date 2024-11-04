import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {feedNavigations} from '../../constants';
import {FeedStackParamList} from '../../stack/FeedStackNavigator';
import PostForm from '../../component/PostForm';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostForm location={location} isEdit />;
}

export default EditPostScreen;

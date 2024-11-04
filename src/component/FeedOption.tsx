import React from 'react';
import {CompoundOption} from './CompoundOption';
import useMutateDel from '../hooks/queries/useMutateDel';
import usePostStore from '../store/usePostStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../stack/FeedStackNavigator';
import {feedNavigations} from '../constants';

interface FeedOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedOption({isVisible, hideOption}: FeedOptionProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const delPost = useMutateDel();
  const {detailPost} = usePostStore();

  const handleDelPost = () => {
    if (!detailPost) {
      return;
    }
    delPost.mutate(detailPost.id, {
      onSuccess: () => {
        hideOption();
        navigation.goBack();
      },
    });
  };

  const handleEditPost = () => {
    if (!detailPost) {
      return;
    }

    navigation.navigate(feedNavigations.EDIT_POST, {
      location: {
        latitude: detailPost.latitude,
        longitude: detailPost.longitude,
      },
    });
    hideOption();
  };
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger onPress={handleDelPost}>
            삭제하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={handleEditPost}>
            수정하기
          </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default FeedOption;

import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

import {colors, mapNavigations} from '../constants';
import {ScrollView} from 'react-native-gesture-handler';
import InputField from '../component/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../component/CustomButton';
import useForm from '../hooks/useForm';
import {validateAddPost} from '../utils';
import AddPostHeader from '../component/AddPostHeader';
import useMutateCreat from '../hooks/queries/useMutateCreat';
import {MarkerColor} from '../types/domain';
import useGetAddress from '../hooks/useGetAddress';
import DatePickerOption from '../component/DatePickerOption';
import {getDateWithSeparator} from '../utils/date';
import useModal from '../hooks/userModal';
import ImageInput from '../component/ImageInput';
import usePermission from '../hooks/usePermission';
import useImagePicker from '../hooks/useImagePicker';
import PreviewImageList from '../component/PreviwImage';
import {useNavigation} from '@react-navigation/native';
import {FeedStackParamList} from '../stack/FeedStackNavigator';
import {LatLng} from 'react-native-maps';
import usePostStore from '../store/usePostStore';
import useMutateUpdat from '../hooks/queries/useMutateUp';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostForm({location, isEdit = false}: PostFormProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const {detailPost} = usePostStore();
  const isEditMode = isEdit && detailPost;
  const createPost = useMutateCreat();
  const updatePost = useMutateUpdat();
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const [score, setsCore] = useState(5);
  const [markerColor, setMarkerColor] = useState<MarkerColor>('GREEN');
  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const dateOption = useModal();
  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
  });
  usePermission('PHOTO');

  console.log(imagePicker.imageUris);

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };
  const address = useGetAddress(location);

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => {
            navigation.goBack();
          },
        },
      );
      return;
    }
    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeader(handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inContainer}>
          <InputField
            value={address}
            icon={<Octicons name="location" size={12} color={colors.BLACK} />}
          />
          <View style={styles.image}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.deleteImageUri}
              onChangeOrder={imagePicker.changeImageUrisOrder}
              showOption
            />
          </View>
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked || isEdit
                ? `${getDateWithSeparator(date, '. ')}`
                : '날짜 선택'
            }
            onPress={dateOption.show}
          />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하실 내용을 입력하세요. (선택사항)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <DatePickerOption
            date={date}
            isVisible={dateOption.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inContainer: {
    gap: 20,
    marginBottom: 20,
  },
  image: {
    flexDirection: 'row',
  },
});

export default PostForm;

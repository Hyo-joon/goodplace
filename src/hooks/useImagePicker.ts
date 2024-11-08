import {useState} from 'react';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import useMutateImages from './queries/useMutateImage';
import {getFormDataImages} from '../utils';
import {ImageUri} from '../types/domain';
import Toast from 'react-native-toast-message';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 20) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 20개입니다.');
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 20,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages('images', images);
        console.log(formData);
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '갤러리 열람 불가',
            text2: '권한을 확인해 주세요',
            position: 'bottom',
          });
        }
      });
  };

  return {
    imageUris,
    handleChange,
    deleteImageUri,
    changeImageUrisOrder,
  };
}

export default useImagePicker;

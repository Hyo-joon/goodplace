import React from 'react';
import HeaderButton from './HeaderButton';

function AddPostHeader(onSubmit: () => void) {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
}

export default AddPostHeader;

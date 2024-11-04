import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import useUserLocation from '../../hooks/useUserLocation';
import useSearchLocation from '../../hooks/useSearchLocation';
import SearchInput from '../../component/SearchInput';
import SearchRegionResult from '../../component/SearchRegionResult';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력하세요."
        onSubmit={() => Keyboard.dismiss()}
      />
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;

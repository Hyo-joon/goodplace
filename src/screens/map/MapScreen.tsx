import React, {useEffect, useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useGetMarkers from '../../hooks/queries/useGetMarkers';
import {alerts, colors, mapNavigations} from '../../constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '../../stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../../navigation/drawer/MainDrawerNavigator';
import useUserLocation from '../../hooks/useUserLocation';
import usePermission from '../../hooks/usePermission';
import mapStyle from '../../style/mapStyle';
import CustomMarker from '../../component/CustomMarker';
import MarkerModal from '../../component/MarkerModal';
import useModal from '../../hooks/userModal';
import Config from 'react-native-config';
import useLocationStore from '../../store/useLocationStore';
import useMoveMap from '../../hooks/useMoveMap';
import Toast from 'react-native-toast-message';

console.log(Config.TEST);
console.log('안녕');
type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const {data: markers = []} = useGetMarkers();
  const markerModal = useModal();
  const {moveLocation} = useLocationStore();
  const {mapRef, moveMapView} = useMoveMap();
  usePermission('LOCATION');

  const handleLongPress = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };
  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(alerts.NOT_SELECTED_LOCATION.TITLE);
    }
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한 허용 필요',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };
  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);
  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };
  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        onLongPress={handleLongPress}
        customMapStyle={mapStyle}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <Ionicons name="search" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.GREEN_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.GREEN_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;

import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, feedNavigations} from '../constants';
import FeedScreen from '../screens/feed/FeedScreen';
import FeedHomeHeader from '../component/FeedHomeHeader';
import FeedDetailScreen from '../screens/feed/FeedDetailScreen';
import {LatLng} from 'react-native-maps';
import EditPostScreen from '../screens/feed/EditPostScreen';
import ImageScreen from '../screens/feed/ImageScreen';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeader(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;

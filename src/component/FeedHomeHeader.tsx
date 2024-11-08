import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from './HeaderButton';
import {colors} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../navigation/drawer/MainDrawerNavigator';
import {FeedStackParamList} from '../stack/FeedStackNavigator';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeader(navigation: FeedHomeHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const styles = StyleSheet.create({});

export default FeedHomeHeader;

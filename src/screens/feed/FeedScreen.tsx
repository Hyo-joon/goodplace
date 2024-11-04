import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FeedList from '../../component/FeedList';

function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;

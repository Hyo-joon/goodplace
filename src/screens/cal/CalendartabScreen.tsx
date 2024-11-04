import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants';
import {getMonthYearDetails, getNewMonthYear} from '../../utils';
import Calendar from '../../component/Calendar';
import useGetCalendarPosts from '../../hooks/queries/useGetCalendarPosts';
import EventList from '../../component/EventList';

function CalendartabScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  if (isPending || isError) {
    return (
      <>
        <Text>로딩중..</Text>
      </>
    );
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendartabScreen;

import { useContext } from "react";
import { Alert } from "react-native";
import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { Calendar, CalendarProps, DateData, LocaleConfig } from 'react-native-calendars';
import { DateTime, Interval } from 'luxon';

import { AuthContext } from "@/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { containers } from "@/styling/common";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { calendarDarkTheme, calendarLightTheme } from "@/styling/calendarTheme";
import { ContextProp } from "react-native-calendars/src/types";

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Act', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: "Today"
};

LocaleConfig.locales['bg'] = {
  monthNames: [
    'Януари',
    'Февруари',
    'Март',
    'Април',
    'Май',
    'Юни',
    'Юли',
    'Август',
    'Септември',
    'Октомври',
    'Ноември',
    'Декември'
  ],
  monthNamesShort: ['Ян.', 'Февр.', 'Март', 'Апр.', 'Май', 'Юни', 'Юли', 'Авг.', 'Септ.', 'Окт.', 'Ное.', 'Дек.'],
  dayNames: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
  dayNamesShort: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  today: "Днес"
};

type TCalendarProps = CalendarProps & ContextProp & {
  onDaySelect: (day: DateData) => void,
}


export const TheCalendar = ({
  hideDayNames = false,
  onDaySelect,
}: TCalendarProps) => {

  const { isLoggedIn, user } = useContext(AuthContext);

  const { i18n, t } = useTranslation();

  if (!isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }

  LocaleConfig.defaultLocale = i18n.language;


  const colorScheme = useColorScheme();

  const handleOnDayPress = (day: DateData) => {

    const dayAfterToday = Interval.fromDateTimes(DateTime.now(), new Date(day.timestamp));

    if (!dayAfterToday.isValid) {
      Alert.alert(t('warning'), t('eventTimeInvalid'), [{
        text: t('close')
      }]);
    }
    onDaySelect(day);
  }

  return (
    <SafeAreaView style={[containers.flexCenter, { margin: 0, padding: 0, }]}>

      <Calendar
        hideDayNames={hideDayNames}
        style={[{ backgroundColor: 'transparent' }, { margin: 0, padding: 0, }]}
        theme={colorScheme === 'dark' ? calendarDarkTheme : calendarLightTheme}
        firstDay={i18n.language === 'bg' ? 1 : 0}
        hideExtraDays={true}
        disableAllTouchEventsForDisabledDays={true}

        onDayPress={(day) => { handleOnDayPress(day); console.log('onDayPress', day) }}
        onDayLongPress={(day) => console.log('onDayLongPress', day)}
        onMonthChange={(date) => console.log('onMonthChange', date)}
        onPressArrowLeft={(goToPreviousMonth) => {
          console.log('onPressArrowLeft'); goToPreviousMonth();
        }}
        onPressArrowRight={(goToNextMonth) => {
          console.log('onPressArrowRight'); goToNextMonth();
        }}
      />

    </SafeAreaView>
  );
}
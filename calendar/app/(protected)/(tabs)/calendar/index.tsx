import { useContext, useState } from "react";
import { Alert } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { DateTime, Interval } from 'luxon';

import { AuthContext } from "@/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles, containers } from "@/styling/common";
import { ThemedText } from "@/components/themed/themed-text";
import { DataContext } from "@/contexts/DataContext";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { calendarDarkTheme, calendarLightTheme } from "@/styling/calendarTheme";
import { ThemeButton } from "@/components/buttons/ThemeButton/ThemeButton";
import { Role } from "@/types";

const authorizedForEventCreation: Role[] = [Role.admin, Role.conductor, Role.member];
const authorizedForEventUpdate: Role[] = [Role.admin, Role.conductor, Role.member];
const authorizedForEventDeletion: Role[] = [Role.admin, Role.conductor];

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
LocaleConfig.defaultLocale = 'bg';

interface Action {

}

export default function CalendarScreen() {

  const { isLoggedIn, user } = useContext(AuthContext);

  const { t } = useTranslation();

  if (!isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }

  const [selected, setSelected] = useState({} as DateData);

  // const calendar = useRef<typeof Calendar>()


  const { data } = useContext(DataContext);


  const colorScheme = useColorScheme();

  const router = useRouter();


  const handleOnDayPress = (day: DateData) => {

    const dayAfterToday = Interval.fromDateTimes(DateTime.now(), new Date(day.timestamp));

    if (!dayAfterToday.isValid) {
      Alert.alert(t('warning'), t('eventTimeInvalid'), [{
        text: t('close')
      }]);
    }
    setSelected(day);
    // {"dateString": "2026-03-11", "day": 11, "month": 3, "timestamp": 1773187200000, "year": 2026}
  }

  return (
    <SafeAreaView style={containers.mainContainer}>
      <ThemeButton
        buttonStyle={[commonStyles.themedButtonWithIcon]}
        handler={() => router.navigate({pathname: '/(protected)/(tabs)/calendar/add-event', params: { date: selected.dateString}})}
        iconName="add"
        iconSize={26}
        iconColor={commonStyles.themedButtonWithIcon.color}
        textStyle={commonStyles.subtitle}
        buttonText={t('add_event')}
      />

      <Calendar
        style={[{ backgroundColor: 'transparent' }]}
        theme={colorScheme === 'dark' ? calendarDarkTheme : calendarLightTheme}
        firstDay={1}
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
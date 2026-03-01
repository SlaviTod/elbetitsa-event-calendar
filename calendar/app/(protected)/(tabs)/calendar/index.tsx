import { useContext } from "react";
import { Alert } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { AuthContext } from "@/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { containers } from "@/styling/common";
import { ThemedText } from "@/components/themed/themed-text";
import { DataContext } from "@/contexts/DataContext";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { calendarDarkTheme, calendarLightTheme } from "@/styling/calendarTheme";


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


export default function CalendarScreen() {

  const { isLoggedIn } = useContext(AuthContext);

  const { t } = useTranslation();

  const { data } = useContext(DataContext);


  if (!isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }



  const colorScheme = useColorScheme();




  return (
    <SafeAreaView style={containers.mainContainer}>
      <ThemedText>Календар</ThemedText>

      <Calendar
        style={[{ backgroundColor: 'transparent' }]}
        theme={colorScheme === 'dark' ? calendarDarkTheme : calendarLightTheme}
        firstDay={1}
      />

    </SafeAreaView>
  );
}
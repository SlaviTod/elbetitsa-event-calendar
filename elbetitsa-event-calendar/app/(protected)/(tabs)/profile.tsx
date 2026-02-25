import { useContext } from "react";
import { StyleSheet, Alert } from 'react-native';
import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/contexts/AuthContext";


export default function TabTwoScreen() {

    const { isLoggedIn } = useContext(AuthContext);
    const { t } = useTranslation();
  
  
  
    if (!isLoggedIn) {
      Alert.alert(t('actionNeed'), t('notauth_sub'), [{
        text: t('goLogin')
      }]);
      return (<Redirect href="/login" />);
    }
  
  
  return (<></>);
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

import { useContext } from "react";
import { Alert } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/contexts/AuthContext";


export default function Calendar() {

  const { isLoggedIn } = useContext(AuthContext);

  const { t } = useTranslation();


  if (!isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }



  return (
    <></>
  );
}
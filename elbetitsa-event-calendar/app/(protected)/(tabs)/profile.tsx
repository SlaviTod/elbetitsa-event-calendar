import { useContext, useState } from "react";
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/contexts/AuthContext";
import { ThemedView } from "@/components/themed-components/themed-view";
import { ThemedText } from "@/components/themed-components/themed-text";
import { commonFlexStyles, commonStyles, containers } from "@/styling/common";
import { UserProfileForm } from "@/components/UserProfileForm/UserProfileForm";
import { IconButton } from "@/components/buttons/IconButton";
import { ChangePass } from "@/components/ChangePassForm/ChangePassForm";

const apiHost = process.env.EXPO_PUBLIC_API_URL;

export default function Profile() {

  const { user, isLoggedIn, isReady } = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const { t } = useTranslation();


  if (isReady && !isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }


  return (<>
    <SafeAreaView>
      <ScrollView>
        <ThemedView style={[containers.mainContainer]}>
          <ThemedView style={[containers.titleWithIconButton, { gap: 50 }]}>
            <ThemedText type={'subtitle'}>{t('profile_sub')}</ThemedText>
            <ThemedView style={commonFlexStyles.row}>
            <IconButton type="FontAwesome6" name="edit" size={26} onPressHandler={() => setIsEditable(st => !st)} />
            <IconButton name="lock-open" size={26} onPressHandler={() => setChangePass(st => !st)} />
            </ThemedView>
          </ThemedView>
          <ThemedView style={containers.avatarContainer}>
            <Image
              source={user.avatar ? `${apiHost}${user.avatar}`
                : require('@/assets/images/2025-4-Al-Nevski-0.jpg')}
              style={commonStyles.avatarPhoto}
            />
          </ThemedView>
          <ThemedText type={'subtitle'}>{user.firstName} {user.lastName}</ThemedText>
          <ThemedText type={'defaultSemiBold'}>{t(user.role)} </ThemedText>
          <ThemedText type={'default'}>{user.email} </ThemedText>
          {user.voice && <ThemedText type={'default'}>{user.voice} </ThemedText>}

          {isEditable && <UserProfileForm handleSuccess={() => setIsEditable(false)} />}
          
          {changePass && <ChangePass handleSuccess={() => setChangePass(false)} />}

        </ThemedView>

      </ScrollView>
    </SafeAreaView>
  </>);
}

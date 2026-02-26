import React, { useContext } from "react";
import { StyleSheet } from 'react-native';
import { router, useRouter } from "expo-router";
import { Image } from 'expo-image';

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/styling/theme";
import { ThemedView } from "../themed/themed-view";
import { appThemeColor, commonStyles, containers } from "@/styling/common";
import { ProfileImage } from "../buttons/ProfileImage";
import { AuthContext } from "@/contexts/AuthContext";
import { ThemeButton } from "../buttons/ThemeButton/ThemeButton";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  title: string,
  showBackButton?: boolean,
  rightComponents?: React.ReactNode[],
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightComponents = [],
}) => {

  const insets = useSafeAreaInsets();

  const { user, logOut } = useContext(AuthContext);

  const router = useRouter();
  const { t } = useTranslation();

  const colors = Colors.dark;

  const handleBackPress = () => {
    router.back();
  };



  return (
    <SafeAreaView style={[containers.mainContainer, styles.header]}>
      <ThemedView style={styles.headerContainer}>

        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedView style={containers.avatarContainer}>
            <Image
              source={require('@/assets/img/logo.png')}
              style={[styles.avatarPhoto, { borderColor: appThemeColor }]}
            />
          </ThemedView>
          <ThemedView style={containers.avatarContainer}>
            <Image
              source={require('@/assets/img/logo-name.png')}
              style={[styles.logoName]}
            />
          </ThemedView>
        </ThemedView>

        <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end" }}>

            <ThemeButton
              buttonStyle={[commonStyles.themedButtonWithIcon, { minWidth: 50}]}
              handler={logOut}
              iconName="log-out-outline"
              iconSize={26}
              iconColor={commonStyles.themedButtonWithIcon.color}
              textStyle={commonStyles.default}
              buttonText={t('login')}
            />
          <ProfileImage
            avatarUrl={user.avatar}
            imageStyle={[styles.avatarPhoto, { borderColor: appThemeColor }]}
            iconSize={50}
            handler={() => router.navigate('/profile')}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
  },
  headerContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 5,

  },
  avatarPhoto: {
    maxWidth: 50,
    maxHeight: 50,
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 25,
    borderWidth: 2,
  },
  logoName: {
    maxHeight: 50,
    maxWidth: 300,
    height: 50,
    width: 140,
    objectFit: 'cover',
  }
})
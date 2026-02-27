import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Image } from 'expo-image';
import { commonStyles, containers } from '@/styling/common';
import { IconButton } from '@/components/buttons/IconButton';
import { RegisterForm } from '@/components/RegisterForm/RegisterForm';


export default function Register() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/img/Al-nevski.jpg')}
          style={commonStyles.headerImage}
        />
      }>
      <ThemedView style={containers.mainContainer}>

      <ThemedView style={containers.titleWithIconButton}>
        <ThemedText type="title" style={commonStyles.title}>{t('register_sub')}</ThemedText>
        <IconButton name="return-up-back" size={26} onPressHandler={() => navigation.goBack()}/>
      </ThemedView>

        <RegisterForm />

      </ThemedView>
    </ParallaxScrollView>
  );
}
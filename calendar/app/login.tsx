import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Image } from 'expo-image';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import { commonStyles, containers } from '@/styling/common';
import { IconButton } from '@/components/buttons/IconButton';
import { useRouter } from 'expo-router';



export default function LogIn() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/img/2025-4-Al-Nevski-0.jpg')}
          style={commonStyles.headerImage}
        />
      }>
      <ThemedView style={containers.mainContainer}>

        <ThemedView style={containers.titleWithIconButton}>
          <ThemedText type="title" style={commonStyles.title}>{t('login_sub')}</ThemedText>
          <IconButton name="return-up-back" size={26} onPressHandler={() => router.navigate('/')} />
        </ThemedView>

        <LoginForm />

      </ThemedView>
    </ParallaxScrollView>
  );
}

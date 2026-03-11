import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Image } from 'expo-image';
import { commonStyles, containers } from '@/styling/common';
import { IconButton } from '@/components/buttons/IconButton';
import { RegisterForm } from '@/components/RegisterForm/RegisterForm';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";


export default function Register() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>

        <Image
          source={require('@/assets/img/Al-nevski.jpg')}
          style={commonStyles.headerImage}
        />
        <ThemedView style={containers.mainContainer}>

          <ThemedView style={containers.titleWithIconButton}>
            <ThemedText type="title" style={commonStyles.title}>{t('register_sub')}</ThemedText>
            <IconButton name="return-up-back" size={26} onPressHandler={() => navigation.goBack()} />
          </ThemedView>

          <RegisterForm />

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
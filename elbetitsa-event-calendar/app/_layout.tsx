import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@/translator/setup';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { LngProvider } from '@/contexts/LngContext';
import { myDarkTheme, myLightTheme } from '@/styling/theme';

export const unstable_settings = {
  anchor: '(protected)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? myDarkTheme : myLightTheme} >
        <LngProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(protected)" options={{ headerShown: false, animation: 'none', }} />
              <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="login" options={{
                  title: 'LogIn',
                  headerShown: false,
                  animation: 'none',
                }} />
                <Stack.Screen name='register' options={{
                  title: 'Join us',
                  headerShown: false,
                  animation: 'none',
                }} />
              </Stack.Protected>
            </Stack>
            <StatusBar style="auto" />
          </AuthProvider>
        </LngProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

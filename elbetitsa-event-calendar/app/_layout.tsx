import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useContext } from 'react';

export const unstable_settings = {
  anchor: '(protected)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
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
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

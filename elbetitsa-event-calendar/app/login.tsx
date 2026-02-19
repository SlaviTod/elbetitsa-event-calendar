import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function LogIn() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/2025-4-Al-Nevski-0.jpg')}
          style={styles.image}
        />
      }>
      <ThemedView style={styles.mainContainer}>
          
          <ThemedText type="title">Log in the Platform</ThemedText>
          
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  image: {
    height: 500,
    width: '100%',
  },
  title: {
    alignSelf: 'center',
  },
  seasonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 100,
  }
});

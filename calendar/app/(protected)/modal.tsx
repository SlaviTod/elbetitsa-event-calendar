import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { useContext } from 'react';
import { DataContext } from '@/contexts/DataContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containers } from '@/styling/common';
import { DateTime } from 'luxon';
import { IconButton } from '@/components/buttons/IconButton';

const apiHost = process.env.EXPO_PUBLIC_API_URL;


export default function ModalScreen() {

  const item: any = useLocalSearchParams();

  const router = useRouter();

  const { data } = useContext(DataContext);
  const event = data.events.find(el => el.id == item.id);

  // TODO => gallery slide images + gesture  

  return (
    <SafeAreaView style={containers.mainContainer}>
      <ScrollView>
        <ThemedView style={containers.mainContainer}>
          <IconButton style={{ alignSelf: 'flex-start'}} name="return-up-back" size={26} onPressHandler={() => router.navigate('/')} />
          <ThemedText type="title">{event?.CalendarEventDetails[0].title}</ThemedText>
          {event?.start && <ThemedText type="title">{DateTime.fromISO(event.start).setLocale('bg').toFormat('d LLLL yyyy')}</ThemedText>}
          <ThemedText type="subtitle">{event?.CalendarEventDetails[0].subTitle}</ThemedText>
          <ThemedText>{event?.CalendarEventDetails[0].description}</ThemedText>

          <ThemedView style={styles.imageContainer}>
            <Image
              style={styles.imageBg}
              source={`${apiHost}${!!event?.images?.length ? event.images[0] : '/public/images/borisova.jpg'}`}
            />
            {/* <ThemedView style={styles.galleryContainer}>

            </ThemedView> */}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  imageContainer: {
    maxWidth: '98%',
    maxHeight: 200,
    height: 184,
    width: 300,
    marginTop: 20,
  },
  imageBg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  galleryContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

import { StyleSheet } from "react-native";
import { DateTime } from 'luxon';
import { Image } from 'expo-image';
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";
import { PublicEvent } from "@/types/dist";
import { Link } from "expo-router";


const apiHost = process.env.EXPO_PUBLIC_API_URL;

export const EventItem = ({
  item,
}: { item: PublicEvent }) => {

  const color = useThemeColor({}, 'primary')

  return (
    <Link href={{ pathname: "/modal", params: {id: item.id} }} style={{ marginVertical: 10 }} >
      <ThemedView style={[styles.mainContainer, { borderColor: color }]}>
        <Image
          style={styles.imageBg}
          source={`${apiHost}${!!item.images?.length ? item.images[0] : '/public/images/borisova.jpg'}`}
        />
        <ThemedView style={styles.textContainer}>
          <ThemedText
            type="title"
            style={{ marginBottom: 5, textAlign: 'center' }}>{item.CalendarEventDetails[0].title}</ThemedText>
          <ThemedText
            type="subtitle"
            style={{ marginBottom: 5 }}>{DateTime.fromISO(item.start).setLocale('bg').toFormat('d LLLL yyyy')}, {item.CalendarEventDetails[0].city}</ThemedText>
        </ThemedView>

      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 184,
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 2,
    gap: 8,
    position: 'relative',
  },
  imageBg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    opacity: 0.5,
  },
});

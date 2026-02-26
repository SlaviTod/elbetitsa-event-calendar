import { containers } from "@/styling/common";
import { ThemedView } from "../themed/themed-view";
import { Image } from 'expo-image';
import { IconButton } from "./IconButton";
import { ImageStyle, StyleProp } from "react-native";

const apiHost = process.env.EXPO_PUBLIC_API_URL;

type ProfileImageProps = { 
  avatarUrl: string | null, 
  imageStyle: StyleProp<ImageStyle>,
  iconSize: number,
  handler: () => void, 
}

export const ProfileImage = ({
  avatarUrl,
  imageStyle,
  iconSize,
  handler,
}: ProfileImageProps) => {


  return (
    <ThemedView style={containers.avatarContainer}>
      {avatarUrl && <Image
        source={`${apiHost}${avatarUrl}`}
        style={imageStyle}
      />}
      {!avatarUrl && <IconButton name="person-circle" size={iconSize} onPressHandler={handler} />}
    </ThemedView>
  );
}
import { Pressable, StyleProp, ViewStyle } from "react-native"
import { ThemedIcon } from "../themed-components/themed-icon"

type IconButtonProps = {
  style?: StyleProp<ViewStyle>,
  name: string,
  size: number,
  onPressHandler: () => void,
}

export const IconButton = ({
  style = {},
  name,
  size,
  onPressHandler,
}: IconButtonProps) => {

  return (
    <Pressable style={style} onPress={() => onPressHandler()}>
      <ThemedIcon name={name} size={size} />
    </Pressable>
  )
}
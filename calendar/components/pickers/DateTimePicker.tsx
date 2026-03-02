import RNDateTimePicker, { AndroidNativeProps, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ThemedView } from '../themed/themed-view';

type DateTimeProps = AndroidNativeProps & {
  date?: string;
}

export const DateTimePicker = ({
mode,
display,
date,
onChange,
}: DateTimeProps) => {

  return (
    <>
      <ThemedView>
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display={display}
          onChange={onChange}
        />
      </ThemedView>
    </>
  );
}
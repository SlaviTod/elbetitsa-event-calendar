import RNDateTimePicker, { AndroidNativeProps, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ThemedView } from '../themed/themed-view';

type DateTimeProps = AndroidNativeProps & {
  date?: Date;
}

export const DateTimePicker = ({
mode,
display,
date = new Date(),
onChange,
}: DateTimeProps) => {

  return (
    <>
      <ThemedView>
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={display}
          onChange={onChange}
        />
      </ThemedView>
    </>
  );
}
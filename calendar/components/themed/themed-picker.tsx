import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker, PickerProps } from '@react-native-picker/picker';

export type ThemedInputProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
  selectedValue: any;
  optionsList: string[],
  label?: string;
  showChoose?: boolean,
  handleValueChange?: () => void,
};

export function ThemedPicker({
  selectedValue,
  mode,
  style,
  enabled = true,
  optionsList,
  label,
  showChoose = false,
  lightColor,
  darkColor,
  handleValueChange,
  ...otherProps }: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');


  return (<Picker
    selectedValue={selectedValue}
    mode={mode}
    onValueChange={(val) => handleValueChange}
    {...otherProps}
    dropdownIconColor={backgroundColor}
    dropdownIconRippleColor={backgroundColor}
  >
    {showChoose && <Picker.Item label={label} value={''} style={{ color, backgroundColor }} />}
    {optionsList.map((el) => <Picker.Item key={el} label={el} value={el} style={{ color, backgroundColor }} />)}
  </Picker>);
}

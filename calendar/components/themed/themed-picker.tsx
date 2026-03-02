import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { TFunction } from 'i18next';

export type ThemedInputProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
  selectedValue: any;
  optionsList: string[],
  label?: string;
  showChoose?: boolean,
  handleValueChange?: () => void,
  t?: TFunction<"translation", undefined>,
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
  t,
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
    {/*  @ts-expect-error  */}
    {optionsList.map((el) => <Picker.Item key={el} label={t ? t(el) as string : el} value={el} style={{ color, backgroundColor }} />)}
  </Picker>);
}

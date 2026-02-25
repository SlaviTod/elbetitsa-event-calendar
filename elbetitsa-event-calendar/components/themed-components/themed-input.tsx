import { TextInput, TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  hideText?: boolean;
  type?: 'default' | 'password';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  hideText = true,
  type = 'default',
  ...otherProps }: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder');

  if (type !== 'password' || !hideText) return (<TextInput placeholderTextColor={placeColor} style={[{ color }, style]} {...otherProps} />);

  return (<TextInput secureTextEntry={hideText} placeholderTextColor={placeColor} style={[{ color }, style]} {...otherProps} />);
}

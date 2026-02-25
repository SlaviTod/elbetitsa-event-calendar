
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';

export type ThemedIconProps = {
  name: any;
  size: number;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({ lightColor, darkColor, name, size }: ThemedIconProps) {
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return <Ionicons name={name} size={size} color={themeColor} />;
}


import { StyleProp, ViewStyle } from "react-native";
import { Host, Column, RadioButton, ListItem } from '@expo/ui/jetpack-compose';
import { ThemedView } from "./themed-view";
import { useTranslation } from "react-i18next";


type TRBProps = {
  options: string[],
  selectedOption: string;
  styleWr?: StyleProp<ViewStyle>,
  onSelect: (option: string) => void,
}

export const ThemedRadioButtonGroup = ({
  options,
  selectedOption,
  styleWr,
  onSelect,
}: TRBProps) => {

  const { t } = useTranslation();

  return (<>
    <ThemedView style={styleWr}>
      <Host matchContents>
        <Column>
        {!!options.length && options.map((op) => <>
        {/* @ts-expect-error */}
          <ListItem key={op} headline={t(op)} onPress={() => onSelect(el)}>
            <ListItem.Trailing>
              <RadioButton
                selected={selectedOption === op}
                onClick={() => onSelect(op)}
              />
            </ListItem.Trailing>
          </ListItem>
        </>)
        }
        </Column>
      </Host>
    </ThemedView>
  </>);
}
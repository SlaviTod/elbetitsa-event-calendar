import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { Language } from "@/types"
import { LANGUAGES } from "@/constants/languages";

import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type LngState = {
  languages: Language[],
  selectedLang: Language,
  onLngSelect: (lng: Language) => void,
}

export const LngContext = createContext<LngState>({
  languages: [],
  selectedLang: {} as Language,
  onLngSelect: () => { },
})

const lngStorageKey = 'lng';

export const LngProvider = ({ children }: PropsWithChildren) => {

  const [languages, setLanguages] = useState(LANGUAGES);
  const [selectedLang, setSelected] = useState({} as Language);
  const [isReady, setIsReady] = useState(false);

  const { i18n } = useTranslation();

  const onLngSelect = (lng: Language) => {
    setSelected(lng);
    i18n.changeLanguage(lng?.code);
    storeLngState({ lng });
  }

    useEffect(() => {
    const getLngFromStorage = async () => {
      try {
        const json = await AsyncStorage.getItem(lngStorageKey);
        if (json) {
          const persisted = JSON.parse(json);
          console.log(persisted);
          setSelected(persisted.lng);
        }
      } catch (err) {
        console.log('Error retrieving lng', err);
      }
      setIsReady(true);
    };
    getLngFromStorage();
  }, [])

    const storeLngState = async (newState: { lng: Language }) => {
    try {
      const val = JSON.stringify(newState);
      await AsyncStorage.setItem(lngStorageKey, val);
    } catch (err) {
      console.log('Error saving lng', err);
    }
  }

  return (<LngContext.Provider value={{ languages, selectedLang, onLngSelect }}>
    {children}
  </LngContext.Provider>);
}
// import { PrivateEvent, PublicEvent } from "@/types/dist";
// import { createContext, PropsWithChildren, useState } from "react";
// import { useTranslation } from "react-i18next";


// export type DataState = {
//   currentMonth: string; // format: "MM-YYYY" => updated when get public events (home screen)
//   publicEvents: PublicEvent[]; // add them to calendar 
//   privateEvents: PrivateEvent[]; // get them for currentMonth 

// }

// export const DataContext = createContext<DataState>({
//   currentMonth: '',
//   publicEvents: [],
//   privateEvents: [],
// })


// const dataStorageKey = 'data';

// export const DataProvider = ({ children }: PropsWithChildren) => {

//   const [currentMonth, setCurrentMont] = useState('');
//   const [publicEvents, setPublicEvents] = useState([]);
  
//   const [isReady, setIsReady] = useState(false);

//   const { i18n } = useTranslation();

//   const onLngSelect = (lng: Language) => {
//     setSelected(lng);
//     i18n.changeLanguage(lng?.code);
//     storeLngState({ lng });
//   }

//     useEffect(() => {
//     const getLngFromStorage = async () => {
//       try {
//         const json = await AsyncStorage.getItem(lngStorageKey);
//         if (json) {
//           const persisted = JSON.parse(json);
//           console.log(persisted);
//           setSelected(persisted.lng);
//         }
//       } catch (err) {
//         console.log('Error retrieving lng', err);
//       }
//       setIsReady(true);
//     };
//     getLngFromStorage();
//   }, [])

//     const storeLngState = async (newState: { lng: Language }) => {
//     try {
//       const val = JSON.stringify(newState);
//       await AsyncStorage.setItem(lngStorageKey, val);
//     } catch (err) {
//       console.log('Error saving lng', err);
//     }
//   }

//   return (<LngContext.Provider value={{ languages, selectedLang, onLngSelect }}>
//     {children}
//   </LngContext.Provider>);
// }
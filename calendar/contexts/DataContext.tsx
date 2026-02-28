import { PrivateEvent, PublicEvent } from "@/types/dist";
import { createContext, PropsWithChildren, useState } from "react";


export interface EventsState {
  events: PublicEvent[];
  private: PrivateEvent[];
  recurring: PrivateEvent[];
}

export type DataState = {
  data: EventsState,
  setData: (data: Partial<EventsState>) => void,
  setPublicData: (data: Omit<EventsState, 'private' | 'recurring'>) => void,
}

export const DataContext = createContext<DataState>({
  data: {
    events: [],
    private: [],
    recurring: [],
  },
  setData: () => { },
  setPublicData: () => { },
})


export const DataProvider = ({ children }: PropsWithChildren) => {

  const [data, setEvents] = useState({
    events: [],
    private: [],
    recurring: [],
  } as EventsState);


  const setData = (data: Partial<EventsState>) => {
    setEvents((st) => ({ ...st, ...data }))
  }

  const setPublicData = (data: Omit<EventsState, 'private' | 'recurring'>) => {
    setEvents((st) => ({ ...st, events: [...st.events, ...data.events] }))
  }


  return (<DataContext.Provider value={{ data, setData, setPublicData }}>
    {children}
  </DataContext.Provider>);
}
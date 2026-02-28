import { Timestamps } from "../shared";
import { PublicEventType } from "./EventType";

export interface PublicEvent extends Timestamps {
  id: number;
  eventType: PublicEventType;
  dirName: string;
  start: string; // ISO
  end: string;
  durationInMinutes?: number;
  timeZone: string;
  mapLink: string | null;
  embedMapLink: string | null;
  videoLinks: string[];
  images: string[];
  isPublic: boolean;
  CalendarEventDetails: CalendarEventDetails[];
}

// language specific data 
export interface CalendarEventDetails extends Timestamps {
  id: number;
  LanguageId: number;
  title: string;
  subTitle: string | null;
  description: string;
  dateText: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
}
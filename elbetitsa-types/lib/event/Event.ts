import { Timestamps, TimeZone } from "../shared";
import { EventType } from "./EventType";

export interface CalendarEvent extends Timestamps {
  id: number;
  eventType: EventType;
  dirName: string;
  start: Date;
  end: Date;
  timeZone: TimeZone;
  mapLink: string | null;
  embedMapLink: string | null;
  videoLinks: string[];
  images: string[];
  isPublic: boolean;
  CalendarEventDetails: CalendarEventDetails;
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
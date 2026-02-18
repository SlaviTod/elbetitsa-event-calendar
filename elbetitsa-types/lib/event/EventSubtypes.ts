import { CalendarEvent } from './Event';
import { PrivateEventType, PublicEventType } from './EventType';

export interface PublicEvent extends CalendarEvent {
  eventType: PublicEventType;
  isPublic: true;
}

export interface PrivateEvent extends CalendarEvent {
  eventType: PrivateEventType;
  isPublic: false;
}
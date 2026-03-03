import { PrivateEvent, PrivateEventType } from "./PrivateEvent";

export interface PrivateEventRequest {
    eventType: PrivateEventType;
    title: string;
    description: string;
    address: string;
    city: string;
    country: string;
    mapLink: string;
    start: Date;
    end: Date;
    durationInMinutes: number; 
}

export interface PrivateEventResponse {
  event: PrivateEvent;
}

export interface GetPrivateEventsResponse {
  events: PrivateEvent[];
  recurring: PrivateEvent[];
}

export interface GetRecurringEventsResponse {
  recurring: PrivateEvent;
}


import { PublicEvent } from './Event';

export interface GetEventsResponse {
  events: PublicEvent[];
  totalItems: number;
}

export interface GetEventResponse {
  event: PublicEvent;
}

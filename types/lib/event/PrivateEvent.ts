
export enum RepetitiveEvents {
  recurringRehearsal = 'recurringRehearsal', // recurring => for every season start (~sept) end (~june), repeated every week if particular day is work day  
}

export enum OneTimePrivateEvents {
  rehearsal = 'rehearsal', // created with first checked attendance
  oneTimeRehearsal = 'oneTimeRehearsal',  // extra rehearsal or one that replaces the canceled rehearsal
  canceledRehearsal = 'canceledRehearsal',
  trip = 'trip',
  event = 'event', // public events 
  concert = 'concert',
  festival = 'festival',
  competition = 'competition',
}

export type PrivateEventType = RepetitiveEvents | OneTimePrivateEvents;

export interface PrivateEvent {
  id: number;
  eventType: PrivateEventType;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  mapLink: string;
  start: string;
  end: string;
  durationInMinutes: number;
  timeZone: string;
  asJson: object;
}

export interface SeasonRehearsal extends PrivateEvent {
  eventType: RepetitiveEvents.recurringRehearsal,
  asJson: {
    dayOfTheWeek: string;
  },
}

export interface Rehearsal extends PrivateEvent {
  eventType: OneTimePrivateEvents.rehearsal,
  asJson: {
    place: string;
  },
}

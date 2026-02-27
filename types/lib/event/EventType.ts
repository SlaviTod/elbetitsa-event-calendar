export enum PublicEventType {
    event = 'event',
    concert = 'concert',
    festival = 'festival',
    competition = 'competition',
    history = 'history',
}

export enum PrivateEventType {
    rehearsal = 'rehearsal', // recurring => for every season start (~sept) end (~june), repeated every week if particular day is work day  
    cancelRehearsal = 'cancelRehearsal', 
    oneTimeRehearsal = 'oneTimeRehearsal', // extra rehearsal or one that replaces the canceled rehearsal
    event = 'event',
    concert = 'concert',
    trip = 'trip',
}

export type EventType = PublicEventType | PrivateEventType;
# Elbetitsa Event Calendar

This application is a mobile app for vocal ensemble Elbetitsa (https://elbetitsa.eu) in order to schedule rehearsals and events (e.g. concerts and festivals).


## Get started

The app is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. The first step before running the app is to install all dependencies of the project (in directory elbetitsa-event-calendar)
   npm install

2. The app used Elbetitsa types, so before starting the app:
    2.1. Install all dependencies (in directory elbetitsa-event-calendar)
        npm install 
    2.2. Build types 
        npm run build 

3. Start the app 
   npx expo start       or
   npm start

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo   


# Functional Guide

## Project Overview
* Application Name: Elbetitsa Event Calendar ("Elbetitsa EC" for short)
* Application Category: Event Calendar 
* Main Purpose
The main purpose of the app is to schedule rehearsals and events (concerts and festivals). 
Elbetitsa is a female vocal ensemble, which sings polyphonic a cappella (without music accompaniment). When there is a rehearsal planned there should be a count of how many people from each voice will attend because it's crucial to know beforehand if there will be enough singers in the first place. This will also be used when there are public or private events (e.g. concerts, festivals, trips, parties, etc.).

## User Access & Permissions
- Guest (Not Authenticated) 
If the user is unauthenticated they can access: 
* the home screen with public events (paginated, sorted by date in a descending order by default) and the event screen for details;
* the login page;
* the register page.

- Authenticated User
If the user is registered (and logged in) they can access:
* their profile page, where they can change their name, password or profile image.
Eventually they can post comment to the public event.

The full functionality is accessible for users with roles (Member of the Choir/Conductor), which includes: 
* the calender screen - which shows the current month with all of the events (public and private, styled differently). The user may confirm/deny their attendance for a particular event, it is set to "pending" by default. For each event there will be a count for the amount of participating singers by voice (Soprano, Mezzo-soprano and Contralto).

A repetitive event (rehearsal) can be marked as canceled by the conductor. 

* create an event screen - the member can add event such as oneTimeRehearsal that replace canceled one or is needed (as additional rehearsal before concert).

When a particular event is selected its details can be seen on:
* the event details screen - a member can update the event info. If start/end date/hours is changed it will be shown on the calendar accordingly;



## 
    3. Authentication & Session Handling
Authentication Flow
Explain step-by-step: 1. What happens when the app starts 2. How authentication status is checked 3. What happens on successful login or registration 4. What happens on logout
Session Persistence
    • How is the user session stored?
    • How is automatic login handled after app restart?
    
    
    4. Navigation Structure
Root Navigation Logic
    • How is navigation split between authenticated and unauthenticated users?
Main Navigation
Describe the main navigation structure: - Number and type of main sections (e.g. Tabs)

Nested Navigation
    • Is there nested navigation (e.g. Stack inside a Tab)?
    • What type of screens are included?
    5. List → Details Flow
List / Overview Screen
    • What type of data is displayed?
    • How does the user interact with the list?
Details Screen
    • How is navigation triggered?
    • What data is received via route parameters?
 
 
## Data Source & Backend
### Elbetitsa api 
The mobile app uses an existing api (https://elbetitsa.eu/api) which has: 
- a few public routes that already exist, such as:
   * /languages - for the supported languages;
   * /events - for the Elbetitsa public events, which use pagination (sorted by event date in a descending order)
   requires:   languageId, default: 1 [bg], 
               itemsPerPage, default: 5,
               currentPage, default: 1
   supports:   search by event title
   * /articles - at the moment it is only used for the 'about-us' section (requires languageId, default: 1 [bg]);
   * /users - for the user registration.
- some private routes, used to create/update/delete events, update profile, etc. that already exist;
- some routes and additional functionality will be added, such as: 
   * CRUD for private events - repetitive (choir rehearsals) and one time (trips, parties, etc.) events;
   * marking and updating the attendance for private events.

### Elbetitsa types 
All used types, such as entity models, api requests & responses, enumerations, etc. are stored in the Elbetitsa TypeScript Library (the project can be found in elbetitsa-types folder), that is imported in the project.

## Data Operations (CRUD)
Describe the implemented data operations:
Read (GET)
    • Where is data fetched and displayed?
Create (POST)
    • How does the user create new data?
Update / Delete (Mutation)
    • Which operation is implemented (Update and/or Delete)?
    • How is the UI updated after the change?
    8. Forms & Validation
Forms Used
    9. List all forms in the application:
Validation Rules
Describe at least three validated fields: - Field name and rules: - Field name and rules: - Field name with multiple validation rules:
10. Native Device Features
Used Native Feature(s)
Select and describe at least one: - Camera / Image Picker - Location / Maps - Biometrics - Sensors
Usage Description
    • Where is it used?
    • What functionality does it provide?

11. Typical User Flow
Describe a normal user journey through the app: 1. 2. 3. 4.
12. Error & Edge Case Handling
Describe how the app handles: - Authentication errors - Network or data errors - Empty or missing data states

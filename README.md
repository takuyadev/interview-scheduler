# Interview Scheduler
Application created using React.js that shows all appointments, organized by day, and be able to create, update and delete any appointments based on the request the client makes to the scheduler API. Any updates will be automatically updated and rerendered on the every client, using Websocket.

!["Screenshot of homepage"](https://github.com/takuyadev/interview-scheduler/blob/master/docs/homepage.png?raw=true)
!["Screenshot of deleting process"](https://github.com/takuyadev/interview-scheduler/blob/master/docs/homepage_delete.png?raw=true)

## Live Website
> If there are issues with slow load, please note that it may take server a little while before it comes up from sleep, so it may take a longer time to load on first load, if it was not initialized for a while.

- [Website](https://interviewer-scheduler.netlify.app/)
- [API](https://scheduler-api-production-cd67.up.railway.app/)

### Endpoints for API
- `/api/days`: GET all days (Mon-Fri)
- `/api/interviewers`: GET all interviewers
- `/api/appointments`: GET all appointments OR PUT one appointment

## Techstack
- React.js
- axios
- Storybook
- React Testing Library
- Jest
- Cypress
- Websocket

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

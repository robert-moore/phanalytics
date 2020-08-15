# Backend

A serverless NodeJS function to fetch and clean player and salary data from [this source data](https://questionnaire-148920.appspot.com/swe/data.html).

## Getting Started

1. Make sure `serverless` is installed globally.
```
yarn add global serverless
```

2. Install dependencies
```
yarn
```
3. Run server locally with
```
serverless offline
```

## Implementation

This serverless function is written in Typescript. Typescript is compiled to JS before deploying to AWS Lambda through `serverless-plugin-typescript`. 

The core functionality lives in `/src/playerScraper.ts`. The `axios` library is used to `GET` the HTML response from the source, and the `cheerio` library is used to parse the data. A simple regex is used to clean the salary data.

The returned data implements the following interface
```
interface IPlayer {
  name: string;
  firstName: string;
  lastName: string;
  salary: number | null;
  year: number;
  level: string;
}
```

## Endpoint


`GET /players`: returns `IPlayer[]`

Hosted at https://8x7idacyej.execute-api.us-east-1.amazonaws.com/prod/players
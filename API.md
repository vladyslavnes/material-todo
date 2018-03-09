### API reference:
Base URL: https://events-locator-api.herokuapp.com/api/v1/events

### Event object structure:
  - name: String,
  - description: String,
  - createdBy: {
    - name: String,
    - email: String
  - },
  - price: Number,
  - free: Boolean,
  - address: String,
  - startTime: Date,
  - endTime: Date,
  - coords: {
  - lat: Number,
  -  lng: Number
  - },
  - subscribers: [
    {
      name: String,
      email: String
    }
  ]

## GET `/`
#### returns an array of event objects
 

## GET `/:id`
#### returns a event object with specified ID

## POST `/`
#### Takes a event object as data parameter and appends it to the database

## PUT `/:id`
#### Takes a event object as data parameter and applies changes to the database

## DELETE `/:id`
#### Removes event object with specified ID from database.

#### Errors are sent as JSON objects including status code and error message
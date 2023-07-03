# Simple CRUD  Api

It is an application, that create a server that get requsts and return responses for simple CRUD operations.

## Installiation and dependencies

1. Run in terminal "git clone https://github.com/DzmitrySH/crud-api.git"
2. In command line run command "npm install".

## Run application

There are some modes of work:

1. In development mode entre in command line `npm run start:dev`.
2. In production mode entre in command line `npm run start:prod`.
3. Run application with cluster in command line `npm run start:multi`.

## Work with server

1. Shoise to use some application for testing API like [Postman](https://www.postman.com/).
2. In "Postman" should send requsts to "localhost:3000" and you will get responses.
3. Multi mode should send requsts to "localhost:4001" to end number core processor.

 **Template .json (raw) for creating or changing user, send in body**

```
{
  "username": "Ivan Mitaev",
  "age": 28,
  "hobbies": [
    "Electronic",
    "Sport"
  ]
}
```

| Requests                  | Responses                  |
| ------------------------- | -------------------------- |
| GET                       |                            |
| **{port}/api/users**      | Return all users           |
| **{port}/api/users/{id}** | Return user by id          |
| POST                      |                            |
| **{port}/api/users**      | Create new user by using   |
| PUT                       |                            |
| **{port}/api/users/{id}** | Change user by id with new |
| DELETE                    |                            |
| **{port}/api/users/{id}** | Delete user by id          |
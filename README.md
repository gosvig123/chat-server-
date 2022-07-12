# Exercise – Chat Server

In this exercise, you will implement a chat server. Production-ready chat servers implement complex communication layers with Push or subscription APIs, so our chat server is going to be a little bit simpler. We're going to handle the messages and participants of a chat through a back-end that implements a RESTful API. While working on it, you'll practice the following concepts:

- Create a node.js server.
- Handle requests, reading from the body.
- Send responses with body and headers.
- Get familiarized with the main status
- Handle basic back-end security with CORS.
- Practice writing and reading files with the file system API.
- Get started with express.js.

## Instructions

This is the first time you'll work with a Full-Stack system. For that, you're going to have not one, but many services running at the same time. That will be the client and the server for now. Later we're going to add the database.

#### The client

I implemented a basic chat client in react, which is available in the `client` folder. You can go into that folder and run

```bash
~$ yarn
~$ yarn start
```

That will run the client, which will try to connect to your new server. As your server doesn't exist and doesn't implement its function yet, you'll see the client will throw some errors.

#### The server

You have to create a server in the `server` folder. You can do the entire server in the `index.js` file or you can create different files and use import/export.

To run the server, place your terminal in the `./server` folder and run there

```bash
~$ yarn dev
```

Although, we also have a `yarn start` command, like in the client, `yarn dev` uses `nodemon`, a server runner that will watch our files for changes and restart the server when that happens. So you'll have a dev experience similar to hot reloading in the client.

That will run the `server/src/index.js` file, which already creates an http server and runs it, listening on the port `8080`. That port is where the client will connect to (`http://localhost:8080/`).

## Requirements

Create a server that manages messages and users in a chat room.

> **CORS**
>
> For your API to be consumed from a browser, you'll have to set up some CORS rules. Read [this article](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to understand what's about.
>
> Specifically for this service, you'll have to listen to `OPTIONS` requests (called preflight requests in the browser). You should respond with an empty body with the following header values:
>
> ```http
> OPTIONS
>
> Allow: *
> Access-Control-Allow-Origin: *
> Access-Control-Allow-Headers: 'Content-Type'
> ```

Create the following endpoints:

### Users

#### Get a list of users

`GET /users`

**Response**

A JSON string representing a list of users.

```json
[
  { "username": "Sarah Connor" },
  { "username": "John Connor" },
  { "username": "T101_mrhappyface" }
]
```

#### Create a user

`POST /users`

**Request**

```js
{
  "username": "Kyle Reese"
}
```

**Response**

Status `201` if successfully created.

Status `400` if the user already exists with the following message

```json
{
  "error": "Username already in use."
}
```

### Messages

#### Get a list of messages

`GET /message`

**Response**

A JSON string representing a list of users.

```json
[
  {
    "username": "I slept on my arm and now I can't feel it.",
    "message": "T101_mrhappyface"
  },
  {
    "message": "Stop it…",
    "username": "John Connor"
  }
]
```

#### Post a message

`POST /users`

**Request**

```json
{
  "message": "Hey Johnm, how do you call a robot riding a tractor?",
  "username": "T101_mrhappyface"
}
```

**Response**

Status `201` if successfully posted.

Status `400` if the user doesn't exist in the server.

```json
{
  "error": "User doesn't exist."
}
```

### Extra credits

- Save the messages and users in JSON files in the server, so even when it restarts it loads them from there.
- Add a date field to the messages (you can change the client too to render that field on every message).
- Implement a way to change a username. That will include the `PUT` API endpoint and a form in the client.
- Save your username in local storage so it remembers after reloading the page.

## Express.js

1. Duplicate the `server/src` folder and rename it to `src-node`.
2. Implement from scratch a version of the same server but now with [Express.js](https://expressjs.com/).
   - Make the CORS setup a middleware.
   - Use an MVC pattern.

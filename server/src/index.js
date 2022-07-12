import http from 'http'

let messageCount = 2
let messages = [
  {
    id: 0,
    message: 'Hi there',
    username: 'Jon',
  },
  {
    id: 1,
    message: 'Can I know something?',
    username: 'Jon',
  },
]
let users = [
  {
    username: 'Jon',
  },
]

const server = http.createServer()

server.listen(8080)

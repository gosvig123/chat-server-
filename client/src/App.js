import styles from './App.module.css'
import { Workbench, WorkbenchContent } from '@contentful/f36-workbench'
import {
  Button,
  EntryCard,
  Form,
  Heading,
  Notification,
  TextInput,
} from '@contentful/f36-components'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [baseURL, setBaseURL] = useState('http://localhost:8080')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [username, setUsername] = useState()
  const [users, setUsers] = useState([])
  const chatRef = useRef()

  useEffect(() => {
    const intervalID = setInterval(() => {
      fetch(`${baseURL}/messages`)
        .then((res) => res.json())
        .then((newMessages) => {
          const messageIDs = messages.map((m) => m.id)
          const messagesToAdd = newMessages.filter((newMessage) => {
            return !messageIDs.includes(newMessage.id)
          })
          if (messagesToAdd.length === 0) {
            return {}
          }
          setMessages([...messages, ...messagesToAdd])
          chatRef.current.scrollTop = chatRef.current.scrollHeight
        })
        .catch((error) => {
          Notification.error(`Messages: ${error.message}`)
          clearInterval(intervalID)
        })

      fetch(`${baseURL}/users`)
        .then((res) => res.json())
        .then((newUsers) =>
          setUsers([
            ...users,
            ...newUsers.filter(
              (newUser) =>
                !users.find((user) => user.username === newUser.username)
            ),
          ])
        )
        .catch((error) => {
          Notification.error(`Users: ${error.message}`)
          clearInterval(intervalID)
        })

      setUsers(users)
    }, 1000)

    return () => {
      clearInterval(intervalID)
    }
  }, [])

  function handleInputChange(event) {
    setMessage(event.target.value)
  }
  function handleUsernameChange(event) {
    setUsernameInput(event.target.value)
  }
  function handleJoin(event) {
    event.preventDefault()
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      username: usernameInput,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(`${baseURL}/users`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setUsername(usernameInput)
          return {}
        }
        return response.json()
      })
      .then((result) => {
        if (result.error) {
          console.error('error', result.error)
          Notification.error(result.error)
          return
        }
      })
      .catch((error) => {
        console.error('error', error)
        Notification.error(error.error)
      })
  }
  function handleSubmit(event) {
    event.preventDefault()

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      message,
      username,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(`${baseURL}/messages`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          setMessage('')
          return {}
        }
        return response.json()
      })
      .then((result) => {
        if (result.error) {
          console.error('error', result.error)
          Notification.error(result.error)
        }
      })
      .catch((error) => {
        console.error('error', error)
        Notification.error(error.error)
      })
  }

  return (
    <Workbench>
      <Workbench.Header title="Chat" />
      <Workbench.Content style={{ padding: 0 }}>
        <div ref={chatRef} className={styles.ChatViewport}>
          <div className={styles.Chat}>
            {messages.map((message, i) => (
              <div
                key={i}
                className={`${styles.Message} ${
                  message.username === username ? styles.OwnMessage : ''
                }`}
              >
                <div className={styles.Container}>
                  <span classame={styles.Content}>{message.message}</span>
                  <span className={styles.Author}>by {message.username}</span>
                </div>
              </div>
            ))}
          </div>
          {username && (
            <div className={styles.FormContainer}>
              <Form onSubmit={handleSubmit} className={styles.Form}>
                <TextInput
                  value={message}
                  placeholder="Write a message…"
                  onChange={handleInputChange}
                />
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Form>
            </div>
          )}
        </div>
      </Workbench.Content>
      <Workbench.Sidebar position="right">
        <div className={styles.UsersViewport}>
          <div className={styles.Users}>
            <Heading element="h2">Participants</Heading>
            {users.map((item, i) => (
              <EntryCard
                key={item.username}
                className={styles.User}
                status={item.username === username && 'You'}
                title={item.username}
              />
            ))}
          </div>
          {!username && (
            <div className={styles.FormContainer}>
              <Form onSubmit={handleJoin} className={styles.Form}>
                <TextInput
                  value={username}
                  placeholder="Write a username"
                  onChange={handleUsernameChange}
                />
                <Button variant="primary" type="submit">
                  Join
                </Button>
              </Form>
            </div>
          )}
        </div>
      </Workbench.Sidebar>
    </Workbench>
  )
}

export default App

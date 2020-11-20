import React from 'react'

const ErrorNotification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const Notifications = { ErrorNotification, SuccessNotification }
export default Notifications

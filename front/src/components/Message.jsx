import React from 'react'

//css
import { Alert } from 'react-bootstrap'

Message.defaultProps = {
    variant:'info'
}
export default function Message({variant, children}) {
  return (
    <Alert variant={variant}>{children}</Alert>
  )
}



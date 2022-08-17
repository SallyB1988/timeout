import React from 'react'

export const Timeout = ({reset}) => {
  return (
    <div>
      <div>Are you still here?</div>
      <button onClick={reset}>YES</button>
    </div>
  )
}

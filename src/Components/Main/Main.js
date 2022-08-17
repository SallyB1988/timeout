import React, { useState, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { Timeout } from '../Timeout/Timeout'

export const Main = () => {

  const timeout = 5 * 1000;
  const promptTimeout = 5 * 1000;

  const [modalOpen, setModalOpen] = useState(false);
  const [remaining, setRemaining] = useState(timeout)
  const [counter, setCounter] = useState(0)
  const [active, setActive] = useState('ACTIVE')

  const onPrompt = () => {
    setActive('TIMEOUT WARNING!')
    // onPrompt will be called after the timeout value is reached -
    // in this case 10 seconds. Here you can open your prompt. 
    // All events are disabled while the prompt is active. 
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setModalOpen(true)
    setRemaining(promptTimeout)
  }
  
  const onIdle = () => {
    setActive('IDLE')
    setCounter(0)

    // onIdle will be called after the promptTimeout is reached.
    // In this case 5 seconds. Here you can close your prompt and 
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    setModalOpen(false)
    setRemaining(0)
  }
  
  const onActive = () => {
    if (active !== 'ACTIVE') setActive('ACTIVE')

    // onActive will only be called if `reset()` is called while `isPrompted()` 
    // is true. Here you will also want to close your modal and perform
    // any active actions. 
    setModalOpen(false)
    setRemaining(0)
    setCounter(0)
  }

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive,
  })

  const handleStillHere = () => {
    setModalOpen(false)
    setCounter(0)
    setActive('ACTIVE')
    activate()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000))
      }
      if (active !== 'IDLE') setCounter(counter + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }

  }, [getRemainingTime, isPrompted, counter, active, setActive])

  return (
    <div>
      <div className='paddingTop: 20px'>{active!=='IDLE' ? 'WELCOME': 'You have been logged out'}</div>
      <div>Current State: {active} </div>
      <div>Counter: {counter} </div>
      { modalOpen &&
      <div style={{padding: 20}}>
        <Timeout reset={handleStillHere}/>
        </div>
        
      }
    </div>
  )
}

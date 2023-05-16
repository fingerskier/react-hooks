import {React, useEffect, useRef, useState} from 'react'
import FSM from 'stateinator'
import useInterval from './useInterval'


export default function(states, transitions, cycleTime=1000) {
  const SM = useRef(new FSM())
  
  const [state, setState] = useState()
  
  
  useEffect(()=>{
    SM.current.verbose = true
    
    states?.forEach(state=>{
      SM.current.addState(state.name, {
        onEnter: state.onEnter,
        onExit: state.onExit,
        onUpdate: state.onUpdate,
      })
    })
    
    transitions?.forEach(transition=>{
      SM.current.addTransition(transition.from, transition.to)
    })
  }, [])
  
  
  useEffect(() => {
    if (state) SM.current.goto(state)
  }, [state])
  
  
  useInterval(()=>{
    SM.current.update()
  }, cycleTime)
  
  
  return {
    goto: SM.current.goto,
    setState,
    state,
  }
}
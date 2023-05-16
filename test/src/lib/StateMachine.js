import {useEffect, useRef, useState} from 'react'
import FSM from 'stateinator'
import useInterval from './useInterval'


export default function({
  children,
  cycleTime=1000,
  tickHandler,
}) {
  /**
   * @name ~ a child node is considered a state if it has a name prop.
   * @onEnter ~ a function that is called when the state is entered.
   * @onExit ~ a function that is called when the state is exited.
   * @onUpdate ~ a function that is called when the state is updated.
   * @transitions ~ an array of strings that are the names of states that can be transitioned to from this state.
   * 
   * Each child also gets a goto function, via the 'goto' prop, that can be called to transition to another state.
   */

  const SM = useRef(new FSM())
  const [currentState, setCurrentState] = useState('')
  
  
  useEffect(()=>{
    SM.current.verbose = true
    
    children.forEach(child=>{
      SM.current.addState(child.props.name, {
        onEnter: child.props.onEnter,
        onExit: child.props.onExit,
        onUpdate: child.props.onUpdate,
      })
      
      if (child.props.transitions) {
        child.props.transitions.forEach(transition=>{
          SM.current.addTransition(child.props.name, transition)
        })
      }
      
      child.props.goto = SM.current.goto.bind(SM.current)
    })
  }, [])
  
  
  useInterval(()=>{
    setCurrentState(SM.current.state.name)
    let updateResult = SM.current.update()
    
    if (tickHandler) tickHandler(updateResult)
  }, cycleTime)
  
  
  return <>
    {
      children.map(child=>{
        if (child.props.name === currentState) return <>
          {child}
        </>
      })
    }
  </>
}
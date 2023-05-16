import {useEffect} from 'react'
import useStateMachine from '../hooks/useStateMachine'


const states = [{
  name: 'A',
  onEnter: E=>console.log('enter A'),
  onExit: E=>console.log('exit A'),
  onUpdate: E=>console.log('update A'),
}, {
  name: 'B',
  onEnter: E=>console.log('enter B'),
  onExit: E=>console.log('exit B'),
  onUpdate: E=>console.log('update B'),
}, {
  name: 'C',
  onEnter: E=>console.log('enter C'),
  onExit: E=>console.log('exit C'),
  onUpdate: E=>console.log('update C'),
}]

const transitions = [
  { from: 'A', to: 'A'},
  { from: 'A', to: 'B'},
  { from: 'B', to: 'C'},
  { from: 'C', to: 'A'},
  { from: 'C', to: 'B'},
]


export default function() {
  const {goto, state, setState} = useStateMachine(states, transitions)
  
  useEffect(() => {
    setState('A')
  }, [])
  
  
  function StateButtons() {
    return <>
      <button onClick={E=>setState('A')}>Goto A</button>
      <button onClick={E=>setState('B')}>Goto B</button>
      <button onClick={E=>setState('C')}>Goto C</button>
    </>
  }
  
  
  function Content() {
    if (state === 'A') {
      return <div>
        <h2>State A</h2>
        <StateButtons />
      </div>
    } else if (state === 'B') {
      return <div>
        <h2>State B</h2>
        <StateButtons />
      </div>
    } else if (state === 'C') {
      return <div>
        <h2>State C</h2>
        <StateButtons />
      </div>
    } else {
      return <></>
    }
  }
  

  return <>
    <h1>useStatemachine</h1>

    <div>Current state: {state}</div>
    
    <Content />
  </>
}
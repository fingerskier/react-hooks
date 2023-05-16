/*
  Using familiar state patterns we can build up states, links between states, and transition between them
*/

import React from 'react'


export default function() {
  const [state, setState] = useState()
  const [states, setStates] = useState([])


  const addState = (thisn)=>{
    setStates([
      ...states,
      thisn,
    ])
  }

  


  return {}
}
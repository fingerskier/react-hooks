import {useEffect, useState} from 'react'
import useKeyboard from '../hooks/useKeyboard'


export default function() {
  const {key,on} = useKeyboard()
  
  const [state, setState] = useState()
  
  
  useEffect(() => {
    on('a', key=>{
      console.log('a pressed')
      setState(`${key} pressed`)
    })
  }, [])
  
  
  return <div>
    <h2>Keyboard Input</h2>
    
    <div>
      Current key: {key}
    </div>
    
    <div>
      State: {state}
    </div>
  </div>
}
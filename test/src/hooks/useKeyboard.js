import { useEffect, useState } from 'react';


function useKeyboard() {
  const [fx, setFx] = useState({})
  const [key, setKey] = useState(null)

  const map = {}
  
  const on = (key, handler) => {
    fx[key] = handler
    setFx({...fx})
    console.log('set key handler', key, handler)
  }
  
  
  useEffect(() => {
    const handleKeyDown = event=>{
      setKey(event.key)
      map[event.key] = true
    }
    
    const handleKeyUp = event=>{
      if (fx[event.key]) {
        fx[event.key](event.key)
        console.log('key up', event.key, fx)
      }
      map[event.key] = false
      setKey(null)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [])
  
  
  return {
    key,
    on,
  }
}


export default useKeyboard
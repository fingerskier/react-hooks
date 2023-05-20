import { useEffect, useState } from 'react';


function useKeyboard() {
  const [fx, setFx] = useState({})
  const [key, setKey] = useState(null)
  
  
  const on = (key, handler) => {
    fx[key] = handler
    setFx({...fx})
  }
  
  
  useEffect(() => {
    const handleKeyDown = event=>{
      setKey(event.key)
    }
    
    const handleKeyUp = event=>{
      if (fx[event.key]) {
        fx[event.key](event.key)
      }
      
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
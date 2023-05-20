import { useEffect, useState } from 'react';

function useKeyboard() {
  const [key, setKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKey(event.key);
    }
    
    
    const handleKeyUp = () => {
      setKey(null)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);  // Empty array ensures that effect is only run on mount and unmount

  return key
}


export default useKeyboard
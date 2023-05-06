import {useEffect, useState} from 'react'


export default function(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key)
    
    try {
      const existingValue = JSON.parse(item)  // if item exists, use it
      
      if (existingValue) {
        return existingValue
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue)) // if it's non-existent, setup and return the value
        return defaultValue
      }
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue))	// on error we cleanup the value
      return defaultValue      
    }
  })
  
  
  const setValue = value => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;	// mimic useState API
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  }
  
  
  useEffect(() => {
    window.addEventListener('storage', event=>{
      if (event.key === key) {
        setStoredValue(JSON.parse(event.newValue))
      }
    })
  }, [])
  
  
  return [storedValue, setValue]
}
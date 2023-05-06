import {useEffect} from 'react'


export default function(doneTalking) {
  let utterance
  let voices = window?.speechSynthesis.getVoices()
  
  
  function speak(text, ready) {
    if ('speechSynthesis' in window) {
      text = `${text}`
      utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onend = ()=>{
        if (doneTalking) doneTalking()
        if (ready) ready()
      }
      
      utterance.lang = voices[5] || 'en-US'
      utterance.pitch = 1;
      utterance.rate = 1;
      
      window.speechSynthesis.speak(utterance);
    }
  }
  
  
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])
  
  
  return speak
}
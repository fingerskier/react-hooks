import {useRef} from 'react'
import useMQTT from './hooks/useMQTT'


export default function() {
  const message = useRef()
  const topic = useRef()


  const {data, subscribe, publish} = useMQTT({
    clientId: 'testor',
    debug: false,
    port: 9001,
    host: 'ws://192.168.1.73',
  })
  

  return (
    <div>
      <p>
        <code>useMQTT</code> sets up a connection to an MQTT broker.
        It automatically tries to reconnect if necessary
        When subscribing to a topic any data for that topic will be set in the data state object.
        
      </p>
      <label>
        Topic: <input defaultValue="#" ref={topic} type="text" />
      </label>

      <label>
        Message: <input defaultValue="flarn" ref={message} type="text" />
      </label>

      <button 
        onClick={E=>subscribe(topic.current.value)}
      >Subscribe</button>

      <button 
        onClick={E=>publish(topic.current.value, message.current.value)}
      >Publish</button>

      <div>
        Data:<br/>
        {JSON.stringify(data)}
      </div>
    </div>
  )
}

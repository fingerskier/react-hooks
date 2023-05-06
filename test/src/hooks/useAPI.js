import useLocalStorage from "./useLocalStorage"


export default function() {
  const [username, setUsername] = useState('username')
  const [password, setPassword] = useState('password')
  const [jwt_token, setJWTToken] = useState('jwt_token')
  
  const get = async()=>{}
  
  const post = async()=>{}
  
  return {
    get,
    post,
  }
}

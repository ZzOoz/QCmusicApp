import axios from 'axios'

export default function request (url) {
  const instance = axios.get(url)
  return instance
}

import { SERVER_URL } from 'config/app'
import axios from 'axios'

const http = axios.create({
  baseURL: SERVER_URL
})

export default http

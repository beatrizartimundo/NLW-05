import axios from 'axios'

const API_ENVS = {
    production: 'https://my-json-server.typicode.com/beatrizartimundo/NLW-05/',
    local: 'http://localhost:3333'
  }

export const api = axios.create({
    // baseURL: 'http://localhost:3333/'
    baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})
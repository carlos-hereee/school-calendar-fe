/* eslint-disable */

import axios from "axios"

import { loadState } from "./localStorage"

const developmentBaseUrl = "http://localhost:4000"
const productionBaseUrl = "https://lab17-makata.herokuapp.com"

export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? productionBaseUrl
      : developmentBaseUrl,
  header: {
    "Content-Type": "application/json",
  },
})

export const clientWithAuth = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? productionBaseUrl
      : developmentBaseUrl,
})
clientWithAuth.interceptors.request.use(
  config => {
    const state = loadState("auth")
    const token = state.accessToken
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    config.headers["Content-type"] = "application/json"

    return config
  },
  error => {
    Promise.reject(error)
  },
)

/* eslint-disable */

import React from "react"
import AppRouter from "./AppRouter"
// import "./App.css";
import { AuthState } from "./contexts/auth/authState"

function App() {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  )
}

export default App

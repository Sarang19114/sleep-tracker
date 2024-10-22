'use client'

import { useState, createContext } from 'react'

export const AuthContext = createContext(null)

export function Providers({ children }) {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
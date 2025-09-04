// contexts/TransitionContext.js
"use client"
import { createContext, useContext } from 'react'
import { usePageTransition } from '@/hooks/usePageTransition'

const TransitionContext = createContext()

export const TransitionProvider = ({ children }) => {
  const transitionState = usePageTransition()
  
  return (
    <TransitionContext.Provider value={transitionState}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransitionContext = () => {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransitionContext must be used within TransitionProvider')
  }
  return context
}

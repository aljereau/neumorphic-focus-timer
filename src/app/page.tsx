'use client'

import React, { useState, useEffect, useRef } from 'react'
import { NeumorphicCard } from '../components/NeumorphicCard'

export default function FocusTimerPage() {
  // Session state
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [focusTime, setFocusTime] = useState(0) // in seconds
  const [distractions, setDistractions] = useState(0)
  const [distractionTime, setDistractionTime] = useState(0) // in seconds
  const [showSummary, setShowSummary] = useState(false)
  
  // Timer refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastActiveRef = useRef<number>(Date.now())
  const isAppActiveRef = useRef<boolean>(true)

  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes}m ${seconds}s`
  }

  // Handle app state changes (active/background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App went to background
        if (isSessionActive && isAppActiveRef.current) {
          isAppActiveRef.current = false
          if (timerRef.current) clearInterval(timerRef.current)
          setDistractions(prev => prev + 1)
          lastActiveRef.current = Date.now()
        }
      } else {
        // App came to foreground
        if (isSessionActive && !isAppActiveRef.current) {
          isAppActiveRef.current = true
          const timeInBackground = Math.floor((Date.now() - lastActiveRef.current) / 1000)
          setDistractionTime(prev => prev + timeInBackground)
          
          // Resume timer
          startTimer()
        }
      }
    }

    // Add event listeners for web
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isSessionActive])

  // Start timer function
  const startTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // Set the interval
    timerRef.current = setInterval(() => {
      setFocusTime(prev => prev + 1)
    }, 1000)
  }

  // Start session
  const startSession = () => {
    // Set initial values
    setIsSessionActive(true)
    setFocusTime(0)
    setDistractions(0)
    setDistractionTime(0)
    setShowSummary(false)
    isAppActiveRef.current = true
    lastActiveRef.current = Date.now()
    
    // Start the timer
    startTimer()
  }

  // End session
  const endSession = () => {
    if (isSessionActive) {
      setIsSessionActive(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      
      // Always show summary when ending a session
      setShowSummary(true)
      
      // Log for debugging
      console.log('Session ended, summary should show', {
        focusTime,
        distractions,
        distractionTime
      })
    }
  }
  
  // Close summary
  const closeSummary = () => {
    setShowSummary(false)
  }

  // Calculate focus percentage - ensure it's never negative
  const calculateFocusPercentage = () => {
    if (focusTime === 0) return 100
    
    // Effective focus time can't be negative
    const effectiveFocusTime = Math.max(0, focusTime - distractionTime)
    return Math.round((effectiveFocusTime / focusTime) * 100)
  }

  // Calculate effective focus time - ensure it's never negative
  const calculateEffectiveFocusTime = () => {
    return Math.max(0, focusTime - distractionTime)
  }

  // Calculate distraction rate (per hour) - with upper limit to prevent unrealistic values
  const calculateDistractionRate = () => {
    if (focusTime === 0) return 0
    
    // Calculate per hour rate but cap it at a reasonable value
    const hourlyRate = Math.round((distractions / (focusTime / 3600)) * 10) / 10
    return Math.min(hourlyRate, 100) // Cap at 100 per hour
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E0E5EC] p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Neumorphic Focus Timer</h1>
      
      <div className="w-full max-w-md">
        {!showSummary ? (
          // Main Timer View
          <NeumorphicCard>
            <div className="space-y-6 w-full">
              <h2 className="text-2xl font-medium text-center text-gray-700">
                {isSessionActive ? "Focus Session" : "Ready to Focus?"}
              </h2>
              
              {/* Timer Display */}
              <div className="flex flex-col items-center py-6">
                <span className="text-5xl font-light text-gray-800">
                  {formatTime(focusTime)}
                </span>
                <span className="text-sm text-gray-500 mt-2">
                  focus time
                </span>
              </div>
              
              {/* Stats (only shown when session is active) */}
              {isSessionActive && (
                <div className="bg-[#E0E5EC] rounded-lg p-4 shadow-inner space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Distractions:</span>
                    <span className="font-medium text-gray-800">{distractions} times</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-700">Effective Focus Time:</span>
                    <span className="font-medium text-gray-800">{formatTime(calculateEffectiveFocusTime())}</span>
                  </div>
                </div>
              )}
              
              {/* Control Button */}
              <div className="flex justify-center mt-8">
                <button
                  className="px-8 py-3 rounded-lg bg-[#E0E5EC] text-gray-800 font-medium shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)] transition-shadow duration-300"
                  onClick={isSessionActive ? endSession : startSession}
                >
                  {isSessionActive ? "End Focus Session" : "Start Focus Session"}
                </button>
              </div>
            </div>
          </NeumorphicCard>
        ) : (
          // Summary View - Completely separate from the timer view
          <NeumorphicCard className="min-h-[450px]">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-medium text-center text-gray-700 mb-8">Session Summary</h2>
              
              {/* Summary Stats */}
              <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-700 text-lg">Total Duration:</span>
                  <span className="font-medium text-gray-800 text-lg">{formatTime(focusTime)}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-700 text-lg">Effective Focus Time:</span>
                  <span className="font-medium text-gray-800 text-lg">{formatTime(calculateEffectiveFocusTime())}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-700 text-lg">Distractions:</span>
                  <span className="font-medium text-gray-800 text-lg">{distractions} times</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-700 text-lg">Time Lost:</span>
                  <span className="font-medium text-gray-800 text-lg">{formatTime(distractionTime)}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-700 text-lg">Focus Percentage:</span>
                  <span className="font-medium text-gray-800 text-lg">{calculateFocusPercentage()}%</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-700 text-lg">Distraction Rate:</span>
                  <span className="font-medium text-gray-800 text-lg">{calculateDistractionRate()} per hour</span>
                </div>
              </div>
              
              {/* Close Button */}
              <div className="flex justify-center mt-10">
                <button
                  className="px-10 py-3 rounded-lg bg-[#E0E5EC] text-gray-800 font-semibold shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)] transition-shadow duration-300"
                  onClick={closeSummary}
                >
                  Close
                </button>
              </div>
            </div>
          </NeumorphicCard>
        )}
      </div>
    </div>
  )
}

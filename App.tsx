'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native-web';
import { NeumorphicCard } from './src/components/NeumorphicCard';
import { SessionSettings } from './src/components/SessionSettings';
import { DistractionStats } from './src/components/DistractionStats';
import { SessionSummary } from './src/components/SessionSummary';

// Type definitions
interface SessionData {
  date: string;
  duration: number;
  distractions: number;
  distractionTime: number;
  effectiveTime: number;
}

/**
 * Main App component for the Focus Timer
 */
const App = () => {
  // Session state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [focusTime, setFocusTime] = useState(0); // in seconds
  const [distractions, setDistractions] = useState(0);
  const [distractionTime, setDistractionTime] = useState(0); // in seconds
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [lastSession, setLastSession] = useState<SessionData | null>(null);
  
  // Timer refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastActiveRef = useRef<number>(Date.now());
  const isAppActiveRef = useRef<boolean>(true);
  const sessionStartTimeRef = useRef<number>(0);

  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle app state changes (active/background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App went to background
        if (isSessionActive && isAppActiveRef.current) {
          isAppActiveRef.current = false;
          if (timerRef.current) clearInterval(timerRef.current);
          setDistractions(prev => prev + 1);
          lastActiveRef.current = Date.now();
        }
      } else {
        // App came to foreground
        if (isSessionActive && !isAppActiveRef.current) {
          isAppActiveRef.current = true;
          const timeInBackground = Math.floor((Date.now() - lastActiveRef.current) / 1000);
          setDistractionTime(prev => prev + timeInBackground);
          
          // Resume timer
          timerRef.current = setInterval(() => {
            setFocusTime(prev => prev + 1);
          }, 1000);
        }
      }
    };

    // Add event listeners for web
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  // Start session
  const startSession = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Set initial values
    setIsSessionActive(true);
    setFocusTime(0);
    setDistractions(0);
    setDistractionTime(0);
    setShowSummary(false);
    setLastSession(null);
    isAppActiveRef.current = true;
    lastActiveRef.current = Date.now();
    sessionStartTimeRef.current = Date.now();
    
    // Set immediate timeout to ensure state has updated before timer starts
    setTimeout(() => {
      // Force an initial tick
      setFocusTime(1);
      
      // Then set the regular interval
      timerRef.current = setInterval(() => {
        setFocusTime(prev => prev + 1);
      }, 1000);
    }, 50);
  };

  // End session
  const endSession = () => {
    if (isSessionActive) {
      setIsSessionActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Always show the summary regardless of session length
      const sessionData: SessionData = {
        date: new Date().toISOString(),
        duration: focusTime,
        distractions,
        distractionTime,
        effectiveTime: Math.max(0, focusTime - distractionTime)
      };
      
      setLastSession(sessionData);
      setSessionHistory(prev => [sessionData, ...prev]);
      setShowSummary(true);
    }
  };
  
  // Close summary
  const closeSummary = () => {
    setShowSummary(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <NeumorphicCard style={styles.card}>
          {!showSummary && (
            <>
              <Text style={styles.title}>Neumorphic Focus Timer</Text>
              
              <View style={styles.timerContainer}>
                <Text style={styles.timerValue}>{formatTime(focusTime)}</Text>
                <Text style={styles.label}>focus time</Text>
              </View>
              
              {isSessionActive && (
                <DistractionStats 
                  distractions={distractions}
                  distractionTime={distractionTime}
                  focusTime={focusTime}
                />
              )}
              
              <View style={styles.controlsContainer}>
                {isSessionActive && (
                  <TouchableOpacity onPress={endSession} activeOpacity={0.8}>
                    <View style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>End Session</Text>
                    </View>
                  </TouchableOpacity>
                )}
                
                {!isSessionActive && (
                  <TouchableOpacity onPress={startSession} activeOpacity={0.8}>
                    <View style={styles.powerButton}>
                      <Text style={styles.powerIcon}>▶</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              
              <Text style={styles.footer}>
                {isSessionActive 
                  ? "Session active. Leaving this page will count as a distraction!" 
                  : "Start a new focus session"}
              </Text>
            </>
          )}
        </NeumorphicCard>

        {/* We don't need the SessionSettings component anymore as it's redundant */}
      </View>
      
      {/* Session summary is rendered outside the NeumorphicCard but inside the container */}
      {showSummary && lastSession && (
        <SessionSummary
          duration={lastSession.duration}
          distractions={lastSession.distractions}
          distractionTime={lastSession.distractionTime}
          onClose={closeSummary}
        />
      )}
    </View>
  );
};

// Export the App component as default
export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E5EC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    minHeight: '100vh', // Ensure full height on web
    width: '100%',
    position: 'relative', // Needed for absolute positioned children
  },
  contentContainer: {
    width: '100%',
    maxWidth: 500, // Increased from 400 for better use of space
    alignItems: 'center',
  },
  card: {
    width: '100%',
    minHeight: 500, // Increased minimum height 
    position: 'relative',
    padding: 5, // Add some padding inside the card
  },
  title: {
    fontSize: 28, // Slightly smaller than before
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 10, // Add a bit of top margin
    marginBottom: 20, // Reduced from 32 to bring content closer
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30, // Reduced from 40
  },
  timerValue: {
    fontSize: 58, // Slightly reduced from 60
    fontWeight: '300',
    color: '#2D3436',
    letterSpacing: 3,
    marginBottom: 8,
  },
  controlsContainer: {
    alignItems: 'center',
    marginTop: 30, // Reduced from 40
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#95A5A6',
    marginTop: 4,
    textAlign: 'center',
  },
  powerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0E5EC',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
  },
  powerIcon: {
    fontSize: 24,
    color: '#2D3436',
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: '#E0E5EC',
    borderRadius: 15,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  footer: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 20,
    textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  }
}); 
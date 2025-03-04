'use client';

import React from 'react';
// @ts-ignore
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native-web';

interface SessionSummaryProps {
  duration: number; // in seconds
  distractions: number;
  distractionTime: number; // in seconds
  onClose: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  duration,
  distractions,
  distractionTime,
  onClose
}) => {
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  // Calculate focus percentage (ensure it's never negative)
  const calculateFocusPercentage = () => {
    if (duration === 0) return 0;
    
    // Effective focus time can't be negative
    const effectiveFocusTime = Math.max(0, duration - distractionTime);
    return Math.max(0, Math.round((effectiveFocusTime / duration) * 100));
  };

  // Calculate effective focus time (ensure it's never negative)
  const getEffectiveFocusTime = () => {
    return Math.max(0, duration - distractionTime);
  };

  // Calculate distraction rate (per hour) with reasonable limits
  const calculateDistractionFrequency = () => {
    if (duration === 0) return 0;
    
    // Calculate per hour rate but cap at reasonable value
    const hourlyRate = Math.round((distractions / (duration / 3600)) * 10) / 10;
    return Math.min(hourlyRate, 100); // Cap at 100 per hour
  };

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Session Summary</Text>
        
        <View style={styles.statsTable}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total Duration:</Text>
            <Text style={styles.statsValue}>{formatTime(duration)}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Effective Focus Time:</Text>
            <Text style={styles.statsValue}>{formatTime(getEffectiveFocusTime())}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Distractions:</Text>
            <Text style={styles.statsValue}>{distractions} times</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Time Lost:</Text>
            <Text style={styles.statsValue}>{formatTime(distractionTime)}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Focus Percentage:</Text>
            <Text style={styles.statsValue}>{calculateFocusPercentage()}%</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Distraction Rate:</Text>
            <Text style={styles.statsValue}>{calculateDistractionFrequency()} per hour</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// @ts-ignore
const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E0E5EC',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 16,
  },
  summaryContainer: {
    width: '95%',
    maxWidth: 500,
    padding: 20,
    paddingVertical: 30,
    backgroundColor: '#E0E5EC',
    borderRadius: 20,
    boxShadow: 'inset 3px 3px 8px rgba(166, 180, 200, 0.6), inset -3px -3px 8px rgba(255, 255, 255, 0.8)',
    '@media (min-width: 640px)': {
      width: '90%',
      padding: 30,
    },
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsTable: {
    width: '100%',
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  statsLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2D3436',
    flex: 1,
    paddingRight: 10,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    flex: 1,
    textAlign: 'right',
  },
  closeButton: {
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#E0E5EC',
    borderRadius: 15,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
  }
}); 
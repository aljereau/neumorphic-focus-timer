'use client';

import React from 'react';
// @ts-ignore
import { StyleSheet, Text, View } from 'react-native-web';

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
  // Format time as HH:MM:SS
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

  // Calculate focus percentage
  const calculateFocusPercentage = () => {
    if (duration === 0) return 0;
    return Math.round(((duration - distractionTime) / duration) * 100);
  };

  // Calculate distraction frequency (distractions per hour)
  const calculateDistractionFrequency = () => {
    if (duration === 0) return 0;
    return Math.round((distractions / (duration / 3600)) * 10) / 10;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Summary</Text>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Total Duration:</Text>
        <Text style={styles.statValue}>{formatTime(duration)}</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Effective Focus Time:</Text>
        <Text style={styles.statValue}>{formatTime(duration - distractionTime)}</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Distractions:</Text>
        <Text style={styles.statValue}>{distractions} times</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Time Lost:</Text>
        <Text style={styles.statValue}>{formatTime(distractionTime)}</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Focus Percentage:</Text>
        <Text style={styles.statValue}>{calculateFocusPercentage()}%</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Distraction Rate:</Text>
        <Text style={styles.statValue}>{calculateDistractionFrequency()} per hour</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.closeButton} onClick={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </View>
      </View>
    </View>
  );
};

// @ts-ignore
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(224, 229, 236, 0.95)',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 25,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  statLabel: {
    fontSize: 16,
    color: '#2D3436',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
  },
  buttonContainer: {
    marginTop: 30,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#E0E5EC',
    borderRadius: 15,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
  }
}); 
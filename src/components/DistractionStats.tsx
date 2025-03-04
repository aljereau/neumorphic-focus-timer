'use client';

import React from 'react';
// @ts-ignore
import { StyleSheet, Text, View } from 'react-native-web';

interface DistractionStatsProps {
  distractions: number;
  distractionTime: number; // in seconds
  focusTime: number; // in seconds
}

export const DistractionStats: React.FC<DistractionStatsProps> = ({
  distractions,
  distractionTime,
  focusTime
}) => {
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate percentage of focus time lost to distractions
  const calculatePercentageLost = () => {
    if (focusTime + distractionTime === 0) return 0;
    return Math.round((distractionTime / (focusTime + distractionTime)) * 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{distractions}</Text>
          <Text style={styles.statLabel}>Distractions</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatTime(distractionTime)}</Text>
          <Text style={styles.statLabel}>Time Lost</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculatePercentageLost()}%</Text>
          <Text style={styles.statLabel}>Efficiency Loss</Text>
        </View>
      </View>
    </View>
  );
};

// @ts-ignore
const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    width: '100%',
    backgroundColor: '#E0E5EC',
    borderRadius: 15,
    padding: 15,
    // Enhanced inset shadow for better neumorphic effect
    boxShadow: 'inset 3px 3px 6px rgba(166, 180, 200, 0.7), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
    // Add a subtle border for better definition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 5,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
  },
}); 
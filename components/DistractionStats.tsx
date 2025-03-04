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
    marginTop: 20,
    width: '100%',
    backgroundColor: '#E0E5EC',
    borderRadius: 15,
    padding: 15,
    boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.05), inset -2px -2px 5px rgba(255, 255, 255, 0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2D3436',
  },
  statLabel: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 4,
  },
}); 
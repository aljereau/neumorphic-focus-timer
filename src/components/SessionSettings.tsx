'use client';

import React from 'react';
// @ts-ignore
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native-web';

interface SessionSettingsProps {
  isSessionActive: boolean;
  onStartSession: () => void;
  onStopSession: () => void;
}

export const SessionSettings: React.FC<SessionSettingsProps> = ({
  isSessionActive,
  onStartSession,
  onStopSession
}) => {
  return (
    <View style={styles.container}>
      {isSessionActive ? (
        <TouchableOpacity 
          onPress={onStopSession}
          style={styles.stopButton}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>End Session</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          onPress={onStartSession}
          style={styles.startButton}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Focus Session</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// @ts-ignore
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#E0E5EC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
    minWidth: 200,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#E0E5EC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2D3436',
    fontSize: 16,
    fontWeight: '600',
  }
}); 
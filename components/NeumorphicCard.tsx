'use client';

import React from 'react';
// @ts-ignore
import { View, StyleSheet, Dimensions } from 'react-native-web';

interface NeumorphicCardProps {
  style?: any;
  children?: React.ReactNode;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ style, children }) => {
  return (
    <View style={[styles.outerShadow, style]}>
      <View style={styles.innerShadow}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
};

// @ts-ignore
const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

// Enhanced shadow styles for better neumorphic effect
const shadowStyle = {
  boxShadow: '12px 12px 16px rgba(0, 0, 0, 0.1), -8px -8px 12px rgba(255, 255, 255, 0.8)',
  shadowColor: '#000',
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 0.2,
  shadowRadius: 15,
  elevation: 8,
};

const innerShadowStyle = {
  boxShadow: 'inset -2px -2px 5px rgba(255, 255, 255, 0.7), inset 2px 2px 5px rgba(0, 0, 0, 0.05)',
  shadowColor: '#FFFFFF',
  shadowOffset: {
    width: -5,
    height: -5,
  },
  shadowOpacity: 0.5,
  shadowRadius: 10,
};

// @ts-ignore
const styles = StyleSheet.create({
  outerShadow: {
    backgroundColor: '#E0E5EC',
    borderRadius: 25,
    ...shadowStyle,
  },
  innerShadow: {
    backgroundColor: '#E0E5EC',
    borderRadius: 25,
    overflow: 'hidden',
    ...innerShadowStyle,
  },
  content: {
    padding: isSmallDevice ? 20 : 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(224, 229, 236, 0.9)', // Slightly transparent background for frosted effect
  },
}); 
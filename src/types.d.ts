declare module 'react-native' {
  export const StyleSheet: any;
  export const Text: any;
  export const View: any;
  export const SafeAreaView: any;
  export const TouchableOpacity: any;
  export const Dimensions: any;
  export const Platform: {
    OS: string;
    select: (obj: any) => any;
  };
  export type ViewStyle = any;
}

declare module 'react-native-web' {
  export const StyleSheet: any;
  export const Text: any;
  export const View: any;
  export const SafeAreaView: any;
  export const TouchableOpacity: any;
  export const Dimensions: any;
  export const Platform: {
    OS: string;
    select: (obj: any) => any;
  };
  export type ViewStyle = any;
}

declare module 'expo-status-bar' {
  export const StatusBar: any;
} 
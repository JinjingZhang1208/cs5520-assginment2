import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Start from './screens/Start';
import Colors from './colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Start/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

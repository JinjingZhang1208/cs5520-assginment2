import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Start from './screens/Start';
import AllActivity from './screens/AllActivity';
import SpecialActivity from './screens/SpecialActivity';
import Colors from './colors';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Start />
    </SafeAreaView>
  );
}

function AllActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AllActivity />
    </SafeAreaView>
  );
}

function SpecialActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SpecialActivity />
    </SafeAreaView>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Colors.activeBottomBarTab,
      tabBarInactiveTintColor: Colors.inactiveBottomBarTab,
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      tabBarStyle: {
        backgroundColor: Colors.bottomBar,
        borderTopWidth: 3,
        borderTopColor: Colors.bottomBar,
        position: 'absolute',
        left: 0,
        right: 0,
        height: 80,
      },
    }}>
    <Tab.Screen 
        name="All Activities" 
        component={AllActivityScreen} 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.bottomBar,
          },
          headerTitleStyle: {
            color: Colors.headerTextColor,
            fontSize: 20,
          },
          title: 'All Activities',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
    <Tab.Screen 
      name="Special Activities" 
      component={SpecialActivityScreen} 
      options={{
        headerShown: true, 
        headerStyle: {
          backgroundColor: Colors.bottomBar,
        },
        headerTitleStyle: {
          color: Colors.headerTextColor,
          fontSize: 20,
        },
        title: 'Special Activities' ,
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="exclamation" size={size} color={color}/>
        ),
      }}
    />
  </Tab.Navigator>
);
}


export default function App() {
  return (
     <NavigationContainer style ={styles.container}>
      <Stack.Navigator 
       initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AllActivity" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

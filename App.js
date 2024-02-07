import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Start from './screens/Start';
import AllActivity from './screens/AllActivity';
import SpecialActivity from './screens/SpecialActivity';
import Colors from './colors';
import * as React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AddActivity from './screens/AddActivity';

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

function AddActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AddActivity />
    </SafeAreaView>
  );
}

const TabNavigator = () => {
  const navigation = useNavigation();
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
        height: 75,
        paddingBottom: 10,
      },
    }}>
    <Tab.Screen 
        name="All Activities" 
        component={AllActivityScreen} 
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('AddActivity')}
            >
              <Text style={styles.headerButtonText}>Add</Text>
            </TouchableOpacity>
          ),
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
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('AddActivity')}
          >
            <Text style={styles.headerButtonText}>Add</Text>
          </TouchableOpacity>
        ),
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
        <Stack.Screen name="AddActivity" component={AddActivityScreen} 
          options={{ 
            headerShown: false, 
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="arrowleft" size={24} color={Colors.headerTextColor} />
              </TouchableOpacity>
            )}} />
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

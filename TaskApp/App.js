import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import TodayTask from './screens/TodayTask';
import Messages from './screens/Messages';
import LastActivity from './screens/LastActivity';


const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>

      <NavigationContainer>
        <StatusBar
            backgroundColor="transparent"
            translucent={false}
            barStyle="dark-content"

          />
        <Tab.Navigator initialRouteName="TodayTask"
          screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "blue" } }}
        >
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen name="Today Task" component={TodayTask} />
          <Tab.Screen name="Last Activity" component={LastActivity} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})
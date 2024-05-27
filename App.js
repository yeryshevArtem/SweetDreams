import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import Favourites from './screens/Favourites';
import Profile from './screens/Profile';
import { GlobalStyles } from './constants/styles';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
        <NavigationContainer>
          <BottomTab.Navigator screenOptions={{
            tabBarActiveTintColor: GlobalStyles.colors.primary1,
            tabBarInactiveTintColor: GlobalStyles.colors.primary3,
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary2 }
          }}>
            <BottomTab.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home Page",
                tabBarLabel: "Home Page",
                tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="home" />,
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary2,
                  
                },
                headerTintColor: GlobalStyles.colors.primary1
              }}
            />
            <BottomTab.Screen
              name="Favourites"
              component={Favourites}
              options={{
                title: "Favourites",
                tabBarLabel: "Favourites",
                tabBarIcon: ({ color, size }) => <Ionicons size={size} color={color} name="heart" />
              }}
            />
            <BottomTab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile",
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => <Ionicons size={size} color={color} name="settings" />
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
    </>
  );
}
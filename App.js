import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AllTales from './screens/AllTales';
import TaleDetail from './screens/TaleDetail';
import Favourites from './screens/Favourites';
import Profile from './screens/Profile';
import { GlobalStyles } from './constants/styles';
// store
import TalesContextProvider from './store/tales-context';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TalesOverview() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TalesList"
        component={AllTales}
        options={{
          headerTitle: "The most interesting tales",
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary2
          },
          headerTintColor: GlobalStyles.colors.primary1,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaleDetail"
        component={TaleDetail}
        options={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary2
          },
          presentation: "modal"
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TalesContextProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            screenOptions={{
              tabBarActiveTintColor: GlobalStyles.colors.primary1,
              tabBarInactiveTintColor: GlobalStyles.colors.primary3,
              tabBarStyle: { backgroundColor: GlobalStyles.colors.primary2 }
            }}>
            <BottomTab.Screen
              name="Home"
              component={TalesOverview}
              options={{
                title: "10 Most Popular Fairy Tale Stories of All Time",
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
      </TalesContextProvider>
    </>
  );
}
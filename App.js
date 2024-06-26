import { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// screens
import AllTalesScreen from './screens/AllTalesScreen';
import TaleDetailScreen from './screens/TaleDetailScreen';
import FavouriteTalesScreen from './screens/FavouriteTalesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { GlobalStyles } from './constants/styles';
// auth
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
// store
import TalesContextProvider from './store/tales-context';
import AuthContextProvider from './store/auth-context';
import { AuthContext } from './store/auth-context';
// ui
import Loading from './components/ui/Loading';
// constants
import { templates } from './constants/templates';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          headerTitle: templates.signUp,
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary2
          },
          headerTintColor: GlobalStyles.colors.primary1,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary2
          },
          headerTintColor: GlobalStyles.colors.primary1,
        }}
      />
    </Stack.Navigator>
  );
}


function TalesOverviewScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TalesList"
        component={AllTalesScreen}
        options={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary2
          },
          headerTintColor: GlobalStyles.colors.primary1,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaleDetail"
        component={TaleDetailScreen}
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

function AuthenticatedStack() {
  return (
    <TalesContextProvider>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: GlobalStyles.colors.primary1,
          tabBarInactiveTintColor: GlobalStyles.colors.primary3,
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary2 }
        }}>
        <BottomTab.Screen
          name="Home"
          component={TalesOverviewScreen}
          options={{
            title: templates.homePageHeaderTitle,
            tabBarLabel: templates.homeTabBarLabel,
            tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="home" />,
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary2,

            },
            headerTintColor: GlobalStyles.colors.primary1
          }}
        />
        <BottomTab.Screen
          name="Favourites"
          component={FavouriteTalesScreen}
          options={{
            title: templates.favouritesPageHeaderTitle,
            tabBarLabel: templates.favouritesTabBarLabel,
            tabBarIcon: ({ color, size }) => <Ionicons size={size} color={color} name="heart" />,
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary2
            },
            headerTintColor: GlobalStyles.colors.primary1
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: templates.profilePageHeaderTitle,
            tabBarLabel: templates.profileTabBarLabel,
            tabBarIcon: ({ color, size }) => <Ionicons size={size} color={color} name="settings" />,
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary2
            },
            headerTintColor: GlobalStyles.colors.primary1
          }}
        />
      </BottomTab.Navigator>
    </TalesContextProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  const { isAuthenticated } = authCtx.authState;

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );

}

function Root() {
  const authCtx = useContext(AuthContext);
  const { isLoading } = authCtx.authState;

  useEffect(() => {
    async function fetchToken() {
      authCtx.authenticateLoading();
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticateSuccess(storedToken);
      }
      authCtx.authenticateStopLoading();
    }

    fetchToken();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // check for jwt token and return Navigation component
  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
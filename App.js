import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
	Icon,
	useTheme,
} from "react-native-paper";
// screens
import AllTalesScreen from "./screens/AllTalesScreen";
import TaleDetailScreen from "./screens/TaleDetailScreen";
import FavouriteTalesScreen from "./screens/FavouriteTalesScreen";
import ProfileScreen from "./screens/ProfileScreen";
// auth
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
// store
import TalesContextProvider from "./store/tales-context";
import AuthContextProvider from "./store/auth-context";
import { AuthContext } from "./store/auth-context";
// ui
import Loading from "./components/ui/Loading";
// constants
import { locale } from "./constants/locale";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
	const theme = useTheme();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Signup"
				component={SignUpScreen}
				options={{
					headerTitle: locale.signUp,
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerTintColor: theme.colors.fontColor,
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerTintColor: theme.colors.fontColor,
				}}
			/>
		</Stack.Navigator>
	);
}

function TalesOverviewScreen() {
	const theme = useTheme();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="TalesList"
				component={AllTalesScreen}
				options={{
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerTintColor: theme.colors.fontColor,
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="TaleDetail"
				component={TaleDetailScreen}
				options={{
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					presentation: "modal",
				}}
			/>
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const theme = useTheme();
	return (
		<TalesContextProvider>
			<BottomTab.Navigator
				screenOptions={{
					tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
					tabBarInactiveTintColor: theme.colors.tabBarInactiveTintColor,
					tabBarStyle: { backgroundColor: theme.colors.primary },
				}}
			>
				<BottomTab.Screen
					name="Home"
					component={TalesOverviewScreen}
					options={{
						title: locale.homePageHeaderTitle,
						tabBarLabel: locale.homeTabBarLabel,
						tabBarIcon: ({ color, size }) => (
							<Icon color={color} size={size} source="home" />
						),
						headerStyle: {
							backgroundColor: theme.colors.primary,
						},
						headerTintColor: theme.colors.fontColor,
					}}
				/>
				<BottomTab.Screen
					name="Favourites"
					component={FavouriteTalesScreen}
					options={{
						title: locale.favouritesPageHeaderTitle,
						tabBarLabel: locale.favouritesTabBarLabel,
						tabBarIcon: ({ color, size }) => (
							<Icon size={size} color={color} source="heart" />
						),
						headerStyle: {
							backgroundColor: theme.colors.primary,
						},
						headerTintColor: theme.colors.fontColor,
					}}
				/>
				<BottomTab.Screen
					name="Profile"
					component={ProfileScreen}
					options={{
						title: locale.profilePageHeaderTitle,
						tabBarLabel: locale.profileTabBarLabel,
						tabBarIcon: ({ color, size }) => (
							<Icon size={size} color={color} source="account" />
						),
						headerStyle: {
							backgroundColor: theme.colors.primary,
						},
						headerTintColor: theme.colors.fontColor,
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
			const storedToken = await AsyncStorage.getItem("token");

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
	return <Navigation />;
}

// theme
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#1F1840",
		secondary: "#E3720D",
		// tab bar
		tabBarActiveTintColor: "#FFFFFF",
		tabBarInactiveTintColor: "#B7B4C6",
		// font
		fontColor: "#FFFFFF",
		// link
		linkColor: "#FFFFFF",
		// like component
		likeIconActive: "#CE2618",
		likeIconInactive: "#DBD7DF",
		// seekbar
		seekbarMinTrackColor: "#FFFFFF",
		seekbarMaxTrackColor: "#E3720D",
		// player
		playerButtonIconColor: "#E3720D",
		playerButtonContainerColor: "#1F1840",
		// banner
		errorBannerContentColor: "#FFFFFF",
		errorBannerIconColor: "#FFFFFF",
		errorBannerBackgroundColor: "#E34F43",
		infoBannerContentColor: "#E3720D",
		infoBannerIconColor: "#E3720D",
		infoBannerBackgroundColor: "#E1DF4E",
	},
};

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<PaperProvider theme={theme}>
					<Root />
				</PaperProvider>
			</AuthContextProvider>
		</>
	);
}

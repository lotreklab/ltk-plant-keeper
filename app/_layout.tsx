import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

import { store, persistedStore } from '@/store/store';
import { useColorScheme } from '@/hooks/useColorScheme';

import Homepage from './(tabs)/homepage';
import Onboarding from './onboarding';
import Favorite from './(tabs)/favorite';
import Photo from './(tabs)/photo';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HeartIcon from '@/components/ui/heartIcon';
import CameraIcon from '@/components/ui/cameraIcon';
import HomeIcon from '@/components/ui/homeIcon';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Homepage') {
              return <HomeIcon focused={focused} />;
            } else if (route.name === 'Photo') {
              return <CameraIcon focused={focused} />;
            } else if (route.name === 'Favorite') {
              return <HeartIcon focused={focused} />;
            }
          },
          tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarInactiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Homepage" component={Homepage} 
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen name="Photo" component={Photo} />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Stack.Navigator initialRouteName={store.getState().onboarding.value ? "homepage" : "onboarding"}>
          <Stack.Screen
            name="homepage"
            component={Tabs}
            options={{ 
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="onboarding" component={Onboarding} options={
            { headerShown: false }
          }/>
        </Stack.Navigator>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

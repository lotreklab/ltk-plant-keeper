import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
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

import { colors } from '@/config/theme';
import Svg, { Path } from 'react-native-svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SFProDisplayBold: require('../assets/fonts/SFProDisplay/SFPRO-DISPLAY-BOLD.otf'),
    SFProDisplayMedium: require('../assets/fonts/SFProDisplay/SFPRO-DISPLAY-MEDIUM.otf'),
    SFProDisplayRegular: require('../assets/fonts/SFProDisplay/SFPRO-DISPLAY-REGULAR.otf'),
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
          tabBarIcon: ({ focused }) => (
            <View>
              {route.name === 'Home' && <HomeIcon focused={focused} width={25} height={25} />}
              {route.name === 'Photo' && (
                <View style={{
                  width: 70,
                  height: 70,
                  backgroundColor: colors.blue400,
                  borderRadius: 35,
                  marginTop: -50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <CameraIcon focused={focused} width={26} height={24} /> 
                </View>
              )}
              {route.name === 'Favorite' && <HeartIcon focused={focused} width={25} height={25} />}
            </View>
          ),
          tabBarBackground: () => (
            <View style={{
              position: 'absolute',
              top: -30,
              left: 0,
              paddingHorizontal: 4,
              width: '100%',
              height: 180,
              zIndex: 2,
              elevation: 2,
              aspectRatio: 1
            }}>
              <Svg
                  width={'100%'}
                  height={115}
                  fill="none"
                  viewBox="0 0 375 115"
                >
                  <Path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M190.272.073C217.583 1.823 242.971 30 270.338 30H333.5c23.472 0 42.5 19.028 42.5 42.5S356.972 115 333.5 115h-291C19.028 115 0 95.972 0 72.5S19.028 30 42.5 30h63.162c27.367 0 52.755-28.177 80.066-29.927a35.519 35.519 0 0 1 4.544 0Z"
                    clipRule="evenodd"
                  />
                </Svg>
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Text style={{
              color: focused ? colors.primary : colors.grey200,
              fontFamily: 'SFProDisplayBold',
              letterSpacing: 1,
              fontSize: 10,
              lineHeight: 12,
              textTransform: 'uppercase',
              marginTop: 6
            }}>{children}</Text>
          ),
          tabBarActiveTintColor: colorScheme === 'dark' ? colors.white : colors.black,
          tabBarInactiveTintColor: colorScheme === 'dark' ? colors.white : colors.black,
          tabBarStyle: {
            width: '100%',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10.0,
            zIndex: 2,
            elevation: 2,
            height: 100,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: colors.white
          },
          tabBarItemStyle: {
            height: 75,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center'
          }
        })}
      >
        <Tab.Screen name="Home" component={Homepage} 
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen name="Photo" component={Photo} options={{
          tabBarLabel: () => null,
          headerShown: false,
        }} />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Stack.Navigator initialRouteName={store.getState().onboarding.value ? 'homepage' : 'onboarding'}>
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

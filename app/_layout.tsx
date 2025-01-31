import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Text, View, Image, Dimensions } from 'react-native';
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
import Category from './category';
import Detail from './detail';
import SpeciesScreen from "./species";
import GenusScreen from './genuses';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HeartIcon from '@/components/ui/heartIcon';
import CameraIcon from '@/components/ui/cameraIcon';
import HomeIcon from '@/components/ui/homeIcon';

import { colors } from '@/config/theme';
import Svg, { Defs, G, Path } from 'react-native-svg';

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
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {route.name === 'Home' && <HomeIcon focused={focused} width={25} height={25} />}
              {route.name === 'Photo' && (
                <View style={{
                  width: 70,
                  height: 70,
                  backgroundColor: colors.blue400,
                  borderRadius: 35,
                  marginTop: -60,
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
              top: -53,
              left: 0,
              paddingHorizontal: 4,
              width: '100%',
              height: 180,
              flex: 1,
              zIndex: 2,
              elevation: 2
            }}>
              <Image
                source={require('../assets/images/Union.png')}
                style={{
                  width: '100%',
                  height: '100%'
                }}
                resizeMethod='auto'
                resizeMode='cover'
              />
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
            zIndex: 2,
            elevation: 2,
            height: 90,
            backgroundColor: colors.white,
            borderTopWidth: 0,
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
        }}
        />
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
          <Stack.Screen name="species" component={SpeciesScreen} options={
            { headerShown: false }
          }/>
          <Stack.Screen name="genuses" component={GenusScreen} options={
            { headerShown: false }
          }/>
          <Stack.Screen name="category" component={Category} options={
            { headerShown: false }
          }/>
          <Stack.Screen name="detail" component={Detail} options={
            { headerShown: false }
          }/>
        </Stack.Navigator>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

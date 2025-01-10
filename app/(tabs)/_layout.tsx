import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import HeartIcon from '@/components/ui/heartIcon';
import CameraIcon from '@/components/ui/cameraIcon';
import HomeIcon from '@/components/ui/homeIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: 'white',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="homepage"
        options={{
          title: 'HOME',
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="photo"
        options={{
          title: '',
          tabBarIcon: () => <CameraIcon />,
        }}
      />
      <Tabs.Screen
        name="preferiti"
        options={{
          title: 'PREFERITI',
          tabBarIcon: () => <HeartIcon />,
        }}
      />
      <Tabs.Screen
        name="plantList"
        options={{
          title: 'PlantList',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      
      <Tabs.Screen
        name="onboarding"
        options={{
          title: 'Onboarding',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
    </Tabs>
  );
}
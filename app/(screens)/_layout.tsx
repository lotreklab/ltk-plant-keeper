import { Stack } from 'expo-router';

export default function RootLayoutNav() {
  return (
    <Stack>
        <Stack.Screen name="homepageeeee" options={
          { headerShown: false }
        } />
        <Stack.Screen name="onboarding" />
    </Stack>
  );
}

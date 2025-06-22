import { Stack } from 'expo-router';
import { UserPanelProvider } from '../context/UserPanelContext';

export default function RootLayout() {
  return (
    <UserPanelProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search-results" />
        <Stack.Screen name="drug-details/[id]" />
      </Stack>
    </UserPanelProvider>
  );
}
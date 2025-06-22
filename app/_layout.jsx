import { UserPanelProvider } from '../context/UserPanelContext';
import { Slot } from 'expo-router';

function RootLayoutNav() {
  return <Slot />;
}

export default function RootLayout() {
  return (
    <UserPanelProvider>
      <RootLayoutNav />
    </UserPanelProvider>
  );
}
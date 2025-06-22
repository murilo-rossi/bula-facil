import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false, // O cabeçalho será gerenciado por cada Stack interna
      }}
    >
      <Tabs.Screen
        name="home" // Corresponde à pasta app/(tabs)/home
        options={{
          title: 'Busca',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="panel" // Corresponde ao arquivo app/(tabs)/panel.jsx
        options={{
          title: 'Meu Painel',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

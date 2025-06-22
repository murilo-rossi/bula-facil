import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerStyle: { backgroundColor: COLORS.white },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'BulaFacil',
          tabBarLabel: 'Busca',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="panel"
        options={{
          title: 'Meu Painel',
          tabBarLabel: 'Painel',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
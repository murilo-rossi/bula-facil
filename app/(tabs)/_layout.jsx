// Este arquivo define o layout de navegação por abas (tabs) do aplicativo.
// Utiliza o componente Tabs do expo-router para criar duas abas principais:
// "Busca" (home) e "Meu Painel" (panel), cada uma com seu respectivo ícone do FontAwesome5.
// A cor da aba ativa é definida pelo COLORS.primary e o cabeçalho das telas é ocultado.

import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
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
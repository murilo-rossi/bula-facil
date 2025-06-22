import { Stack } from 'expo-router';
import { COLORS } from '../../../constants/colors';

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="search-results" 
        options={{ 
          title: 'Resultados', 
          headerBackTitle: 'Voltar',
          headerStyle: { backgroundColor: COLORS.white },
          headerTintColor: COLORS.text
        }} 
      />
      <Stack.Screen 
        name="drug-details/[id]" 
        options={{ 
          title: 'Detalhes', 
          headerBackTitle: 'Voltar',
          headerStyle: { backgroundColor: COLORS.white },
          headerTintColor: COLORS.text
        }} 
      />
    </Stack>
  );
}
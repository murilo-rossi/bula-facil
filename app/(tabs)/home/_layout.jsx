// Este arquivo define o layout de navegação em pilha (Stack) para a aba "Busca".
// Utiliza o componente Stack do expo-router para gerenciar as telas da navegação:
// - index: tela inicial da busca (sem cabeçalho)
// - search-results: tela de resultados de busca (com título e botão de voltar)
// - drug-details/[id]: tela de detalhes do medicamento selecionado
// Também define estilos personalizados para o cabeçalho das telas.

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
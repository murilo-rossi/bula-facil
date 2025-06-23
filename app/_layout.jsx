// Este arquivo define o layout raiz da aplicação usando componentes React.
// Ele envolve a navegação principal (Slot) com o contexto UserPanelProvider,
// garantindo que o estado do painel do usuário esteja disponível em todo o app.

import { UserPanelProvider } from '../context/UserPanelContext';
import { Slot } from 'expo-router';

// RootLayoutNav renderiza o componente Slot, que funciona como um placeholder para as telas roteadas.
function RootLayoutNav() {
  return <Slot />;
}

// RootLayout envolve a navegação no provider do contexto UserPanelProvider.
export default function RootLayout() {
  return (
    <UserPanelProvider>
      <RootLayoutNav />
    </UserPanelProvider>
  );
}
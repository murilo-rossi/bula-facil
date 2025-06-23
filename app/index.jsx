// Este arquivo define a página inicial da aplicação.
// Ele utiliza o componente Redirect do expo-router para redirecionar
// automaticamente os usuários do caminho raiz para a rota "/home".

import { Redirect } from 'expo-router';

export default function StartPage() {
  return <Redirect href="/home" />;
}
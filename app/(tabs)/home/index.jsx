import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/colors';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push({ pathname: 'home/search-results', params: { query } });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Seja bem-vindo ao BulaFacil</Text>
        <Text style={styles.subtitle}>Sua bula simplificada</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por remédio ou sintoma..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Como usar:</Text>
          <Text style={styles.instructionsText}>• Clique na barra de pesquisa para digitar um remédio ou sintoma.</Text>
          <Text style={styles.instructionsText}>• Acesse seu painel na aba "Painel" para ver seus remédios e condições.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { alignItems: 'center', padding: 20, marginTop: 40 },
  logo: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 16, color: COLORS.text, marginTop: 4 },
  searchContainer: { paddingHorizontal: 20, marginTop: 20 },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  instructions: { margin: 20, padding: 15, backgroundColor: COLORS.white, borderRadius: 10 },
  instructionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  instructionsText: { fontSize: 14, marginBottom: 5, lineHeight: 20 },
});
// Este arquivo define a tela de resultados de busca de medicamentos.
// Permite ao usuário pesquisar medicamentos por nome ou sintoma, exibindo resultados exatos, similares e por indicação de sintomas.
// Utiliza filtros para busca exata, parcial e por palavras-chave nas indicações dos medicamentos.
// Também alerta o usuário caso algum sintoma buscado seja efeito colateral de medicamentos já cadastrados no painel.
// Os resultados são exibidos em seções separadas e o usuário pode iniciar uma nova busca diretamente nesta tela.

import Fuse from 'fuse.js';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AlertBox from '../../../components/AlertBox';
import { COLORS } from '../../../constants/colors';
import { MEDICAMENTOS } from '../../../constants/data';
import { useUserPanel } from '../../../context/UserPanelContext';

const ResultCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{item.name}</Text>
    <Text style={styles.cardCategory}>{item.category}</Text>
  </TouchableOpacity>
);

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams();
  const router = useRouter();
  const { userDrugs } = useUserPanel();
  const [newQuery, setNewQuery] = useState('');

  const [results, setResults] = useState({ exact: [], similar: [], forSymptom: [] });
  const [symptomAlert, setSymptomAlert] = useState(null);

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase();

    const exactMatch = MEDICAMENTOS.filter(m => m.name.toLowerCase() === lowerCaseQuery);
    const forSymptomMatch = MEDICAMENTOS.filter(m => m.indications.keywords.includes(lowerCaseQuery));
    
	// Parametros de busca fuzzy
    const fuseOptions = {
		keys: ['name'],
		includeScore: true,
		threshold: 0.3,
	};
	const fuse = new Fuse(MEDICAMENTOS, fuseOptions);
	const fuzzyResults = fuse.search(lowerCaseQuery);

	// Filtra os resultados para pegar apenas os itens, remover a correspondência exata e limitar a quantidade
	const similarMatch = fuzzyResults
		.map(result => result.item)
		.filter(m => m.name.toLowerCase() !== lowerCaseQuery);
    
    setResults({ exact: exactMatch, similar: similarMatch, forSymptom: forSymptomMatch });

    // Alerta de sintoma
    const conflictingDrugs = userDrugs
      .filter(drug => drug.adverseReactions.symptoms.includes(lowerCaseQuery))
      .map(drug => drug.name)
      .join(', ');

    if (conflictingDrugs) {
      setSymptomAlert(`O sintoma "${query}" pode ser um efeito colateral de: ${conflictingDrugs}.`);
    } else {
      setSymptomAlert(null);
    }

  }, [query, userDrugs]);

  // Componenete para iniciar uma nova busca
  const handleNewSearch = () => {
    if (newQuery.trim()) {
      router.replace({ pathname: 'home/search-results', params: { query: newQuery } });
	  Keyboard.dismiss();
    }
  };

  // Componente para renderizar cada seção de resultados
  const renderSection = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ResultCard
              item={item}
              onPress={() => router.push(`home/drug-details/${item.id}`)}
            />
          )}
        />
      ) : <Text style={styles.noResultText}>Nenhum medicamento encontrado.</Text>}
    </View>
  );

  return (
	<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
		  <Stack.Screen options={{ title: `Resultados para "${query}"`, headerBackTitle: 'Voltar' }} />
		  {symptomAlert && <AlertBox message={symptomAlert} />}

		  <View style={styles.searchContainer}>
			<TextInput
			  style={styles.input}
			  placeholder="Fazer nova busca..."
			  value={newQuery}
			  onChangeText={setNewQuery}
			  onSubmitEditing={handleNewSearch}
			/>
			<TouchableOpacity style={styles.button} onPress={handleNewSearch}>
			  <Text style={styles.buttonText}>Buscar</Text>
			</TouchableOpacity>
		  </View>
		  
			{renderSection(`Medicamentos com nome "${query}"`, results.exact)}
			{renderSection('Medicamentos similares', results.similar)}
			{renderSection(`Medicamentos para sintoma "${query}"`, results.forSymptom)}
		</View>
	</TouchableWithoutFeedback>
  );
}

// Estilos da tela de resultados de busca
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  section: { marginBottom: 20, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  card: { backgroundColor: COLORS.white, padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: COLORS.gray, },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardCategory: { fontSize: 14, color: 'gray', marginTop: 4 },
  noResultText: { fontStyle: 'italic', color: 'gray' },
  searchContainer: {
        padding: 15,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    input: {
        backgroundColor: COLORS.background,
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
        marginTop: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
});
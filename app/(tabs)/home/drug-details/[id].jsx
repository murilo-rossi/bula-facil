import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { KEYWORD_ICONS, MEDICAMENTOS } from '../../../../constants/data';
import { useUserPanel } from '../../../../context/UserPanelContext';

// Crie e adicione essas imagens na pasta assets/images
const sectionIcons = {
  indications: require('../../../../assets/images/indications.png'),
  reactions: require('../../../../assets/images/reactions.png'),
  contraindications: require('../../../../assets/images/contraindications.png'),
};

const KeywordItem = ({ keyword }) => {
  const icon = KEYWORD_ICONS[keyword];
  if (!icon) return null;

	return (
    <View style={styles.keywordContainer}>

      <View style={styles.keywordIconWrapper}>
        <Image source={icon} style={styles.keywordIcon} />
      </View>

      <Text style={styles.keywordText}>{keyword}</Text>
    </View>
	);
};

// COMPONENTE ATUALIZADO: agora renderiza a lista de keywords															 
const InfoSection = ({ title, text, icon, keywords = [] }) => (
  <View style={styles.section}>
    <Image source={icon} style={styles.icon} />
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{text}</Text>
      {/* Caroussel para keywords e icones */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={styles.keywordsWrapper}
      >
        {keywords.map(keyword => (
          <KeywordItem key={keyword} keyword={keyword} />
        ))}
      </ScrollView>
    </View>
  </View>
);

export default function DrugDetailsScreen() {
  const { id } = useLocalSearchParams();
  const drug = MEDICAMENTOS.find(m => m.id.toString() === id);
  const router = useRouter();
  const { addDrugToPanel, userConditions } = useUserPanel();

  const [modalVisible, setModalVisible] = useState(false);
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');

  if (!drug) {
    return <Text>Medicamento não encontrado.</Text>;
  }

  const handleAddPress = () => {
    const conflictingConditions = drug.contraindications.conditions.filter(cond => userConditions.includes(cond));

    if (conflictingConditions.length > 0) {
      if (Platform.OS === 'web') {
        // Usando window.alert no navegador
        window.alert(`Atenção: Contraindicação Encontrada\nEste medicamento não é indicado para uma de suas condições conhecidas (${conflictingConditions.join(', ')}).\n\nDeseja adicioná-lo mesmo assim?`);
        setModalVisible(true);
      } else {
        Alert.alert(
          "Atenção: Contraindicação Encontrada",
          `Este medicamento não é indicado para uma de suas condições conhecidas (${conflictingConditions.join(', ')}).\n\nDeseja adicioná-lo mesmo assim?`,
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Continuar Mesmo Assim", onPress: () => setModalVisible(true) }
          ]
        );
      }
    } else {
      setModalVisible(true);
    }
  };

  const confirmAddDrug = () => {
    if (dose && frequency) {
      addDrugToPanel(drug, dose, frequency);
      setModalVisible(false);
      router.push('/panel');
    } else {
      Alert.alert("Erro", "Por favor, preencha a dose e a frequência.");
    }
  };

  return (
    <ScrollView style={styles.container}
    keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: drug.name }} />
      <Text style={styles.drugName}>{drug.name}</Text>
      <Text style={styles.drugCategory}>{drug.category}</Text>

      <InfoSection
        title="Para o que usar?"
        text={drug.indications.text}
        icon={sectionIcons.indications}
        keywords={drug.indications.keywords}
      />
      <InfoSection
        title="O que você pode sentir?"
        text={drug.adverseReactions.text}
        icon={sectionIcons.reactions}
        keywords={drug.adverseReactions.symptoms}
      />
      <InfoSection
        title="Quem não pode usar?"
        text={drug.contraindications.text}
        icon={sectionIcons.contraindications}
        keywords={drug.contraindications.conditions}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>Adicionar aos Meus Remédios</Text>
      </TouchableOpacity>

	  <View style={{ height: 50 }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adicionar {drug.name}</Text>
            <TextInput placeholder="Dose (ex: 500mg)" style={styles.modalInput} value={dose} onChangeText={setDose} />
            <TextInput placeholder="Frequência (ex: 8 horas)" style={styles.modalInput} value={frequency} onChangeText={setFrequency} />
            <TouchableOpacity style={styles.confirmButton} onPress={confirmAddDrug}>
              <Text style={styles.addButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingVertical: 20 },
  drugName: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', margin: 20, color: COLORS.text },
  drugCategory: { fontSize: 18, color: 'gray', textAlign: 'center', marginTop: -15, marginBottom: 20 },
  section: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, alignItems: 'flex-start' },
  icon: { width: 50, height: 50, marginRight: 15, overflow:'hidden', borderRadius: 15 },
  sectionContent: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  sectionText: { fontSize: 15, color: COLORS.text, marginTop: 5, lineHeight: 22 },
  addButton: { backgroundColor: COLORS.primary, margin: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  addButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  // Estilos do Modal
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalInput: { width: 250, borderWidth: 1, borderColor: COLORS.gray, padding: 10, borderRadius: 10, marginBottom: 15 },
  confirmButton: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 10, width: 250, alignItems: 'center' },
  cancelText: { color: 'gray', marginTop: 15 },
  
  //Estilos das caixas com os icones
  keywordsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  keywordIconWrapper: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
	overflow: 'hidden',
	borderRadius: 22,
	marginBottom: 8,
	marginTop: 5,
	width: 90,
    height: 90,
  },
  keywordContainer: {
    flexDirection: 'column',
    alignItems: 'center',
	justifyContent: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    padding: 10,
    marginRight: 8,
    marginBottom: 8,
	width: 150,
    height: 150,
  },
  keywordIcon: {
    width: '100%',
    height: '100%',
    marginBottom: 5,
  },
  keywordText: {
    fontSize: 18,
    color: COLORS.text,
	textAlign: 'center',
	marginBottom: 5,
	textTransform: 'capitalize',
  },
});
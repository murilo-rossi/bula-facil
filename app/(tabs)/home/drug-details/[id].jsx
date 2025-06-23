// Este arquivo define a tela de detalhes de um medicamento selecionado pelo usuário.
// Exibe informações como indicações, reações adversas e contraindicações, cada uma com seu ícone.
// Permite ao usuário adicionar o medicamento ao seu painel, informando dose e frequência.
// Caso o medicamento seja contraindicado para alguma condição do usuário, exibe um alerta antes de permitir a adição.
// Utiliza modal para entrada de dose e frequência, e trata navegação e contexto do painel do usuário.

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { MEDICAMENTOS } from '../../../../constants/data';
import { useUserPanel } from '../../../../context/UserPanelContext';

// Crie e adicione essas imagens na pasta assets/images
const icons = {
  indications: require('../../../../assets/images/indications.png'),
  reactions: require('../../../../assets/images/reactions.png'),
  contraindications: require('../../../../assets/images/contraindications.png'),
};

const InfoSection = ({ title, text, icon }) => (
  <View style={styles.section}>
    <Image source={icon} style={styles.icon} />
    <View style={styles.sectionContent}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{text}</Text>
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

  // Função para tratar a adição do medicamento ao painel, verificando contraindicações
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

  // Confirma a adição do medicamento ao painel do usuário
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
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: drug.name }} />
      <Text style={styles.drugName}>{drug.name}</Text>
      <Text style={styles.drugCategory}>{drug.category}</Text>

      <InfoSection title="Para o que usar?" text={drug.indications.text} icon={icons.indications} />
      <InfoSection title="O que você pode sentir?" text={drug.adverseReactions.text} icon={icons.reactions} />
      <InfoSection title="Quem não pode usar?" text={drug.contraindications.text} icon={icons.contraindications} />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>Adicionar aos Meus Remédios</Text>
      </TouchableOpacity>

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

// Estilos da tela de detalhes do medicamento
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  drugName: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', margin: 20, color: COLORS.text },
  drugCategory: { fontSize: 18, color: 'gray', textAlign: 'center', marginTop: -15, marginBottom: 20 },
  section: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, alignItems: 'center' },
  icon: { width: 50, height: 50, marginRight: 15, tintColor: COLORS.primary },
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
});
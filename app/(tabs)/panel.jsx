import React, { useState, useMemo } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    ScrollView, 
    Modal, 
    TextInput, 
    Alert 
} from 'react-native';
import { useUserPanel } from '../../context/UserPanelContext';
import { COLORS } from '../../constants/colors';
import { CONDICOES } from '../../constants/data';
import AlertBox from '../../components/AlertBox';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PanelScreen() {
    const { 
        userDrugs, 
        userConditions, 
        removeDrugFromPanel, 
        addUserCondition, 
        removeUserCondition, 
        updateDrugInPanel 
    } = useUserPanel();

    // --- ESTADOS PARA O MODAL DE EDIÇÃO DE REMÉDIOS ---
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editingDrug, setEditingDrug] = useState(null);
    const [newDose, setNewDose] = useState('');
    const [newFrequency, setNewFrequency] = useState('');

    // --- ESTADOS PARA A BUSCA DE CONDIÇÕES ---
    const [conditionQuery, setConditionQuery] = useState('');

    // Lógica para os alertas de contraindicação
    const contraindicationAlerts = useMemo(() => {
        const alerts = new Set();
        userDrugs.forEach(drug => {
            drug.contraindications.conditions.forEach(condition => {
                if (userConditions.includes(condition)) {
                    alerts.add(`O medicamento ${drug.name} não é indicado para quem possui ${condition}.`);
                }
            });
        });
        return Array.from(alerts);
    }, [userDrugs, userConditions]);

    // Lógica para as sugestões de condições a serem adicionadas
    const conditionSuggestions = useMemo(() => {
        if (!conditionQuery) return [];
        return CONDICOES.filter(cond =>
            cond.toLowerCase().includes(conditionQuery.toLowerCase()) &&
            !userConditions.includes(cond)
        );
    }, [conditionQuery, userConditions]);


    // --- FUNÇÕES DE MANIPULAÇÃO ---

    const handleOpenEditModal = (drug) => {
        setEditingDrug(drug);
        setNewDose(drug.dose);
        setNewFrequency(drug.frequency);
        setEditModalVisible(true);
    };

    const handleSaveChanges = () => {
        if (newDose && newFrequency) {
            updateDrugInPanel(editingDrug.id, newDose, newFrequency);
            setEditModalVisible(false);
            setEditingDrug(null);
        } else {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
        }
    };
    
    const handleAddCondition = (condition) => {
        addUserCondition(condition);
        setConditionQuery(''); // Limpa a busca após adicionar
    };

    return (
        <ScrollView style={styles.container}>
            {/* Seção de Alertas */}
            {contraindicationAlerts.map((msg, index) => (
                <AlertBox key={index} message={msg} />
            ))}

            {/* Seção de Gerenciar Condições */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Doenças/Condições Conhecidas</Text>
                {userConditions.length > 0 ? (
                    userConditions.map(cond => (
                        <View key={cond} style={styles.conditionItem}>
                            <Text>{cond}</Text>
                            <TouchableOpacity onPress={() => removeUserCondition(cond)}>
                                <FontAwesome5 name="times-circle" size={20} color={COLORS.danger} />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>Nenhuma condição adicionada.</Text>
                )}

                <View style={styles.addConditionContainer}>
                    <TextInput
                        style={styles.conditionInput}
                        placeholder="Digite para adicionar uma condição..."
                        value={conditionQuery}
                        onChangeText={setConditionQuery}
                    />
                    {conditionSuggestions.map(suggestion => (
                        <TouchableOpacity
                            key={suggestion}
                            style={styles.suggestionItem}
                            onPress={() => handleAddCondition(suggestion)}
                        >
                            <Text style={styles.suggestionText}>+ {suggestion}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            
            {/* Seção de Gerenciar Remédios */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Meus Remédios</Text>
                {userDrugs.length > 0 ? (
                    <FlatList
                        data={userDrugs}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false} // Evita scroll aninhado
                        renderItem={({ item }) => (
                            <View style={styles.drugCard}>
                                <View style={styles.drugInfoContainer}>
                                    <Text style={styles.drugName}>{item.name}</Text>
                                    <Text style={styles.drugInfo}>Dose: {item.dose} | Frequência: {item.frequency}</Text>
                                </View>
                                <View style={styles.drugActions}>
                                    <TouchableOpacity onPress={() => handleOpenEditModal(item)} style={[styles.actionButton, styles.editButton]}>
                                        <Text style={styles.actionButtonText}>Alterar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => removeDrugFromPanel(item.id)} style={[styles.actionButton, styles.removeButton]}>
                                        <Text style={styles.actionButtonText}>Remover</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.emptyText}>Nenhum remédio adicionado ao seu painel.</Text>
                )}
            </View>

            {/* Modal de Edição de Remédios */}
            {editingDrug && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isEditModalVisible}
                    onRequestClose={() => setEditModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Alterar {editingDrug.name}</Text>
                            <TextInput placeholder="Nova Dose (ex: 500mg)" style={styles.modalInput} value={newDose} onChangeText={setNewDose} />
                            <TextInput placeholder="Nova Frequência (ex: 8 horas)" style={styles.modalInput} value={newFrequency} onChangeText={setNewFrequency} />
                            <TouchableOpacity style={styles.confirmButton} onPress={handleSaveChanges}>
                                <Text style={styles.buttonText}>Salvar Alterações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    section: { margin: 15, padding: 15, backgroundColor: COLORS.white, borderRadius: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: COLORS.text },
    emptyText: { fontStyle: 'italic', color: 'gray', textAlign: 'center', padding: 10 },
    
    // Estilos das Condições
    conditionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#e9ecef', borderRadius: 8, marginBottom: 8 },
    addConditionContainer: { marginTop: 20 },
    conditionInput: { borderWidth: 1, borderColor: COLORS.gray, borderRadius: 8, padding: 12, fontSize: 16 },
    suggestionItem: { padding: 12, backgroundColor: '#f8f9fa', borderBottomWidth: 1, borderBottomColor: COLORS.gray, borderLeftWidth: 1, borderLeftColor: COLORS.gray, borderRightWidth: 1, borderRightColor: COLORS.gray },
    suggestionText: { fontSize: 15, color: COLORS.primary },
    
    // Estilos dos Remédios
    drugCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.gray },
    drugInfoContainer: { flex: 1, marginRight: 10 },
    drugName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    drugInfo: { color: 'gray', marginTop: 4 },
    drugActions: { flexDirection: 'row' },
    actionButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 5, marginLeft: 8 },
    editButton: { backgroundColor: COLORS.primary },
    removeButton: { backgroundColor: COLORS.danger },
    actionButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 12 },

    // Estilos do Modal
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalView: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 5 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: COLORS.text },
    modalInput: { width: '100%', borderWidth: 1, borderColor: COLORS.gray, padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 16 },
    confirmButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
    buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    cancelText: { color: 'gray', marginTop: 15, fontSize: 16 },
});

// app/(tabs)/panel.jsx
import { FontAwesome5 } from '@expo/vector-icons';
import { useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertBox from '../../components/AlertBox';
import { COLORS } from '../../constants/colors';
import { CONDICOES } from '../../constants/data'; // Para adicionar novas condições
import { useUserPanel } from '../../context/UserPanelContext';

export default function PanelScreen() {
  const { userDrugs, userConditions, removeDrugFromPanel, addUserCondition, removeUserCondition } = useUserPanel();

  // Funcionalidade 5: Alerta no painel
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

  return (
    <ScrollView style={styles.container}>
      {contraindicationAlerts.map((msg, index) => (
        <AlertBox key={index} message={msg} />
      ))}

      {/* Gerenciar Condições */}
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
        {/* Simples seletor para adicionar novas condições */}
        <Text style={styles.addConditionTitle}>Adicionar Condição:</Text>
         {CONDICOES.filter(c => !userConditions.includes(c)).map(cond => (
            <TouchableOpacity key={cond} style={styles.addBtn} onPress={() => addUserCondition(cond)}>
               <Text style={styles.addBtnText}>+ {cond}</Text>
            </TouchableOpacity>
         ))}
      </View>
      
      {/* Gerenciar Remédios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meus Remédios</Text>
        {userDrugs.length > 0 ? (
          <FlatList
            data={userDrugs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.drugCard}>
                <View>
                  <Text style={styles.drugName}>{item.name}</Text>
                  <Text style={styles.drugInfo}>Dose: {item.dose} | Frequência: {item.frequency}</Text>
                </View>
                <TouchableOpacity onPress={() => removeDrugFromPanel(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum remédio adicionado ao seu painel.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, },
  section: { margin: 15, padding: 15, backgroundColor: COLORS.white, borderRadius: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  drugCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.gray },
  drugName: { fontSize: 16, fontWeight: 'bold' },
  drugInfo: { color: 'gray', marginTop: 4 },
  removeButton: { backgroundColor: COLORS.danger, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  removeButtonText: { color: COLORS.white, fontWeight: 'bold' },
  emptyText: { fontStyle: 'italic', color: 'gray', textAlign: 'center', padding: 10 },
  conditionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#e9ecef', borderRadius: 5, marginBottom: 5 },
  addConditionTitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  addBtn: { padding: 8, backgroundColor: COLORS.primary, borderRadius: 5, marginBottom: 5, alignItems: 'center' },
  addBtnText: { color: COLORS.white }
});
// components/AlertBox.jsx
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function AlertBox({ message, type = 'warning' }) {
  return (
    <View style={[styles.alertContainer, { backgroundColor: COLORS[type] }]}>
      <FontAwesome5 name="exclamation-triangle" size={24} color={COLORS.white} />
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  alertText: {
    color: COLORS.white,
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
  },
});
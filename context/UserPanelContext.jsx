import React, { createContext, useState, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPanelContext = createContext();

export const UserPanelProvider = ({ children }) => {
  const [userDrugs, setUserDrugs] = useState([]);
  const [userConditions, setUserConditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedDrugs = await AsyncStorage.getItem('userDrugs');
        const storedConditions = await AsyncStorage.getItem('userConditions');

        if (storedDrugs !== null) {
          setUserDrugs(JSON.parse(storedDrugs));
        }
        if (storedConditions !== null) {
          setUserConditions(JSON.parse(storedConditions));
        }
      } catch (e) {
        console.error("Failed to load data from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Não salva enquanto os dados iniciais ainda estão carregando
    if (!isLoading) {
      const saveData = async () => {
        try {
          await AsyncStorage.setItem('userDrugs', JSON.stringify(userDrugs));
          await AsyncStorage.setItem('userConditions', JSON.stringify(userConditions));
        } catch (e) {
          console.error("Failed to save data to storage", e);
        }
      };
      saveData();
    }
  }, [userDrugs, userConditions, isLoading]);

  const addDrugToPanel = (drug, dose, frequency) => {
    setUserDrugs(prevDrugs => [...prevDrugs, { ...drug, dose, frequency }]);
  };

  const removeDrugFromPanel = (drugId) => {
    setUserDrugs(prevDrugs => prevDrugs.filter(d => d.id !== drugId));
  };

  const addUserCondition = (condition) => {
    if (!userConditions.includes(condition)) {
      setUserConditions(prev => [...prev, condition]);
    }
  };

  const removeUserCondition = (condition) => {
    setUserConditions(prev => prev.filter(c => c !== condition));
  };

  const updateDrugInPanel = (drugId, newDose, newFrequency) => {
    setUserDrugs(prevDrugs =>
      prevDrugs.map(drug =>
        drug.id === drugId
          ? { ...drug, dose: newDose, frequency: newFrequency }
          : drug
      )
    );
  };

  const value = {
    userDrugs,
    userConditions,
    addDrugToPanel,
    removeDrugFromPanel,
    addUserCondition,
    removeUserCondition,
    updateDrugInPanel,
    // Não precisamos expor isLoading e setIsLoading se nada fora do contexto for usá-los
  };

  // Não renderiza o app até que os dados sejam carregados para evitar "piscar"
  if (isLoading) {
    return null; // ou um componente de tela de carregamento (Loading screen)
  }

  return (
    <UserPanelContext.Provider value={value}>
      {children}
    </UserPanelContext.Provider>
  );
};

export const useUserPanel = () => {
  return useContext(UserPanelContext);
};
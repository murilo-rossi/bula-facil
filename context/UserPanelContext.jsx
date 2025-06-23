// Este arquivo define o contexto global do painel do usuário para o aplicativo BulaFacil.
// Gerencia os estados dos remédios e condições do usuário, permitindo adicionar, remover e editar esses dados.
// Os dados são persistidos localmente usando AsyncStorage, garantindo que as informações do usuário sejam mantidas entre sessões.
// Fornece funções para manipulação do painel e expõe o contexto para uso em toda a aplicação.

import React, { createContext, useState, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPanelContext = createContext();

export const UserPanelProvider = ({ children }) => {
  const [userDrugs, setUserDrugs] = useState([]);
  const [userConditions, setUserConditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os dados do AsyncStorage ao iniciar o app
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
        console.error("Falha ao carregar dados do armazenamento local", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Salva os dados no AsyncStorage sempre que houver alteração
  useEffect(() => {
    // Não salva enquanto os dados iniciais ainda estão carregando
    if (!isLoading) {
      const saveData = async () => {
        try {
          await AsyncStorage.setItem('userDrugs', JSON.stringify(userDrugs));
          await AsyncStorage.setItem('userConditions', JSON.stringify(userConditions));
        } catch (e) {
          console.error("Falha ao salvar dados no armazenamento local", e);
        }
      };
      saveData();
    }
  }, [userDrugs, userConditions, isLoading]);

  // Adiciona um remédio ao painel do usuário
  const addDrugToPanel = (drug, dose, frequency) => {
    setUserDrugs(prevDrugs => [...prevDrugs, { ...drug, dose, frequency }]);
  };

  // Remove um remédio do painel do usuário
  const removeDrugFromPanel = (drugId) => {
    setUserDrugs(prevDrugs => prevDrugs.filter(d => d.id !== drugId));
  };

  // Adiciona uma condição ao painel do usuário
  const addUserCondition = (condition) => {
    if (!userConditions.includes(condition)) {
      setUserConditions(prev => [...prev, condition]);
    }
  };

  // Remove uma condição do painel do usuário
  const removeUserCondition = (condition) => {
    setUserConditions(prev => prev.filter(c => c !== condition));
  };

  // Atualiza dose e frequência de um remédio no painel do usuário
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

// Hook para acessar o contexto do painel do usuário em qualquer componente
export const useUserPanel = () => {
  return useContext(UserPanelContext);
};
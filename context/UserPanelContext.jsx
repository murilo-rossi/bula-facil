import React, { createContext, useState, useContext } from 'react';

const UserPanelContext = createContext();

export const UserPanelProvider = ({ children }) => {
  const [userDrugs, setUserDrugs] = useState([]);
  const [userConditions, setUserConditions] = useState([]);

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

  const value = {
    userDrugs,
    userConditions,
    addDrugToPanel,
    removeDrugFromPanel,
    addUserCondition,
    removeUserCondition
  };

  return (
    <UserPanelContext.Provider value={value}>
      {children}
    </UserPanelContext.Provider>
  );
};

export const useUserPanel = () => {
  return useContext(UserPanelContext);
};
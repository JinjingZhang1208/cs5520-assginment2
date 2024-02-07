import React, { createContext, useState } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activityArray, setActivityArray] = useState([]);

  const addToActivityArray = (newItem) => {
    setActivityArray([...activityArray, newItem]);
  };

  return (
    <ActivityContext.Provider value={{ activityArray, addToActivityArray }}>
      {children}
    </ActivityContext.Provider>
  );
};

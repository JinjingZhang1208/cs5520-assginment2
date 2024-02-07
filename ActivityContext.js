import React, { createContext, useState } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activityArray, setActivityArray] = useState([]);

  const addToActivityArray = (newItem) => {
    // Check if the activity is Running or Weight Training and duration is more than 60 min
    if ((newItem.name.toLowerCase() === 'running' || newItem.name.toLowerCase() === 'weights') && parseInt(newItem.duration) > 60) {
      newItem.special = true; // Mark the item as special
    } else {
      newItem.special = false; // Mark the item as not special
    }
    setActivityArray([...activityArray, newItem]);
  };

  return (
    <ActivityContext.Provider value={{ activityArray, addToActivityArray }}>
      {children}
    </ActivityContext.Provider>
  );
};

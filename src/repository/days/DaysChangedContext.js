import React, { useContext, useState } from 'react';

const DaysChangedContext = React.createContext();

export const DaysChangedProvider = ({ children }) => {
  const [daysChanged, setDaysChanged] = useState(0);

  return (
    <DaysChangedContext.Provider value={{ daysChanged, setDaysChanged }}>
      {children}
    </DaysChangedContext.Provider>
  );
};

export const useDaysChanged = () => useContext(DaysChangedContext);

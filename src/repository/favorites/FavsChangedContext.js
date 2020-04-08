import React, { useContext, useState } from 'react';

const FavsChangedContext = React.createContext();

export const FavsChangedProvider = ({ children }) => {
  const [favsChanged, setFavsChanged] = useState(0);

  return (
    <FavsChangedContext.Provider value={{ favsChanged, setFavsChanged }}>
      {children}
    </FavsChangedContext.Provider>
  );
};

export const useFavsChanged = () => useContext(FavsChangedContext);

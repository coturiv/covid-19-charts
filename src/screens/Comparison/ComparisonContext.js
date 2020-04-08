import React, { useContext, useState } from 'react';
import { INTERVAL_30, CHART_CUMULATIVE, DATA_CONFIRMED } from '../../constants/Chart';

const ComparisonContext = React.createContext();

export const ComparisonProvider = ({ children }) => {
  const [dataType, setDataType] = useState(DATA_CONFIRMED);
  const [chartType, setChartType] = useState(CHART_CUMULATIVE);
  const [chartInterval, setChartInterval] = useState(INTERVAL_30);

  return (
    <ComparisonContext.Provider
      value={{ dataType, setDataType, chartType, setChartType, chartInterval, setChartInterval }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparisonContex = () => useContext(ComparisonContext);

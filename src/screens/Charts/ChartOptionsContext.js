import React, { useContext, useState } from 'react';
import { DATA_CONFIRMED, INTERVAL_14, CHART_CUMULATIVE } from '../../constants/Chart';

const ChartOptionsContext = React.createContext();

export const ChartOptionsProvider = ({ children }) => {
  const [dataType, setDataType] = useState(DATA_CONFIRMED);
  const [chartType, setChartType] = useState(CHART_CUMULATIVE);
  const [chartInterval, setChartInterval] = useState(INTERVAL_14);

  return (
    <ChartOptionsContext.Provider
      value={{ dataType, setDataType, chartType, setChartType, chartInterval, setChartInterval }}
    >
      {children}
    </ChartOptionsContext.Provider>
  );
};

export const useChartOptions = () => useContext(ChartOptionsContext);

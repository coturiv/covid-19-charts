import React from 'react';
import Layout from './Layout';
import { FavsChangedProvider } from '../../repository/favorites/FavsChangedContext';
import { DaysChangedProvider } from '../../repository/days/DaysChangedContext';
import { ChartOptionsProvider } from '../../screens/Charts/ChartOptionsContext';
import { ComparisonProvider } from '../../screens/Comparison/ComparisonContext';

const AppContainer = () => {
  return (
    <FavsChangedProvider>
      <DaysChangedProvider>
        <ChartOptionsProvider>
          <ComparisonProvider>
            <Layout />
          </ComparisonProvider>
        </ChartOptionsProvider>
      </DaysChangedProvider>
    </FavsChangedProvider>
  );
};

export default AppContainer;

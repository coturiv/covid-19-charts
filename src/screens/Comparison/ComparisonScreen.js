import * as React from 'react';
import useCompared from '../../repository/favorites/useCompared';
import ComparisonPanel from '../../components/ComparisonPanel/ComparisonPanel';
import ScrollScreen from '../../components/Screen/ScrollScreen';
import GraphLegend from '../../components/Legend/GraphLegend';
import ComparisonLegend from '../../components/Legend/ComparisonLegend';

const ComparisonScreen = ({ navigation }) => {
  const { compared, toggleCompared } = useCompared();

  return (
    <ScrollScreen>
      <ComparisonPanel
        compared={compared}
        onToggleCompared={toggleCompared}
        navigation={navigation}
      />
      <ComparisonLegend noMargin />
      <GraphLegend />
    </ScrollScreen>
  );
};

export default ComparisonScreen;

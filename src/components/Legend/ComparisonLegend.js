import React from 'react';
import Legend from './Legend';
import Paragraph from './Paragraph';

const ComparisonLegend = ({ noMargin }) => {
  return (
    <Legend noMargin={noMargin}>
      <Paragraph>Data are compared relatively from the date of the first confirmed case.</Paragraph>
    </Legend>
  );
};

export default ComparisonLegend;

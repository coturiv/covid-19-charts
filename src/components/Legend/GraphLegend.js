import React from 'react';
import Legend from './Legend';
import Paragraph from './Paragraph';

const GraphLegend = () => {
  return (
    <Legend>
      <Paragraph title="Cumulative totals:">total cumulative number of confirmed cases.</Paragraph>
      <Paragraph title="Daily increments:">every day&apos;s new cases.</Paragraph>
      <Paragraph title="Percentage increments:">
        the percentage change in the number of cases compared to the previous day.
      </Paragraph>
    </Legend>
  );
};

export default GraphLegend;

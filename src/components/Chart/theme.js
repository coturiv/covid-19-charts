// *
// * Colors
// *
const colors = ['#252525', '#525252', '#737373', '#969696', '#bdbdbd', '#d9d9d9', '#f0f0f0'];

const charcoal = '#252525';
const grey = '#969696';
// *
// * Typography
// *
const sansSerif = "'Gill Sans', 'Gill Sans MT', 'Seravek', 'Trebuchet MS', sans-serif";
const letterSpacing = 'normal';
const fontSize = 12;
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: 'transparent',
};

const centeredLabelStyles = {
  ...baseLabelStyles,
  textAnchor: 'middle',
};
// *
// * Strokes
// *
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

const theme = {
  area: {
    ...baseProps,
    style: {
      data: {
        fill: charcoal,
      },
      labels: baseLabelStyles,
    },
  },
  axis: {
    ...baseProps,
    style: {
      axis: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      axisLabel: {
        ...centeredLabelStyles,
        padding: 25,
      },
      grid: {
        fill: 'none',
        stroke: 'none',
        pointerEvents: 'painted',
      },
      ticks: {
        fill: 'transparent',
        size: 5,
        stroke: 'black',
      },
      tickLabels: {
        ...baseLabelStyles,
        fill: grey,
      },
    },
  },
  bar: {
    ...baseProps,
    style: {
      data: {
        fill: charcoal,
        padding: 8,
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
  },
  boxplot: {
    ...baseProps,
    style: {
      max: { padding: 8, stroke: charcoal, strokeWidth: 1 },
      maxLabels: baseLabelStyles,
      median: { padding: 8, stroke: charcoal, strokeWidth: 1 },
      medianLabels: baseLabelStyles,
      min: { padding: 8, stroke: charcoal, strokeWidth: 1 },
      minLabels: baseLabelStyles,
      q1: { padding: 8, fill: grey },
      q1Labels: baseLabelStyles,
      q3: { padding: 8, fill: grey },
      q3Labels: baseLabelStyles,
    },
    boxWidth: 20,
  },
  candlestick: {
    ...baseProps,
    style: {
      data: {
        stroke: charcoal,
        strokeWidth: 1,
      },
      labels: baseLabelStyles,
    },
    candleColors: {
      positive: '#ffffff',
      negative: charcoal,
    },
  },
  chart: {
    ...baseProps,
  },
  errorbar: {
    ...baseProps,
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
  },
  group: {
    ...baseProps,
  },
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: {
        ...baseLabelStyles,
        padding: 5,
      },
    },
  },
  line: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
  },
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: 'transparent',
        strokeWidth: 1,
      },
      labels: {
        ...baseLabelStyles,
        padding: 20,
      },
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50,
  },
  scatter: {
    ...baseProps,
    style: {
      data: {
        fill: charcoal,
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
  },
  stack: {
    ...baseProps,
    colorScale: colors,
  },
  tooltip: {
    style: {
      ...baseLabelStyles,
      padding: 5,
      pointerEvents: 'none',
    },
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none',
    },
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: {
        ...baseLabelStyles,
        padding: 5,
        pointerEvents: 'none',
      },
      flyout: {
        stroke: charcoal,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none',
      },
    },
  },
};

export default theme;

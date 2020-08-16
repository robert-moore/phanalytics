function CategoricalHistogramBaseSpec() {
  return {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    padding: { left: 5, right: 5, top: 5, bottom: 5 },
    height: 300,
    width: 920,
    config: {
      group: { fill: 'white' },
      axis: { labelFont: 'Nunito Sans', titleFont: 'Nunito Sans' },
      mark: { font: 'Nunito Sans' },
      title: {
        font: 'Nunito Sans',
        subtitleFont: 'Nunito Sans',
        fontSize: 30,
        color: '#252d39',
        // fontWeight: 700
        dy: -18,
        frame: 'group',
        anchor: 'start',
        fontWeight: 700,
        // anchor: 'start'
      },
      legend: {
        labelFont: 'Nunito Sans',
        titleFont: 'Nunito Sans',
        orient: 'top-right',
        fillColor: 'white',
        padding: 10,
        cornerRadius: 8,
        strokeColor: '#F0F3F7',
        rowPadding: 5,
      },
    },
    data: [
      {
        name: 'bins',
        values: [
          { start: 0, end: 10, count: 3, class: 'Outliers' },
          { start: 10, end: 20, count: 5, class: 'Data' },
        ],
      },
      {
        name: 'qualifying',
        values: [{ amount: 5, formatted: '$5' }],
      },
      {
        name: 'cutoff',
        values: [{ amount: 5, formatted: '$5' }],
      },
    ],

    signals: [
      { name: 'cornerRadius', value: 2 },
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:mouseover', update: 'datum' },
          { events: 'rect:mouseout', update: '{}' },
        ],
      },
      {
        name: 'click',
        value: {},
        on: [{ events: 'rect:click', update: 'datum' }],
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'linear',
        range: 'width',
        domain: [0, 100],
        padding: 20,
      },
      {
        name: 'yscale',
        type: 'linear',
        range: 'height',
        round: true,
        domain: { data: 'bins', field: 'count' },
        zero: true,
      },
      {
        name: 'colorscale',
        type: 'ordinal',
        range: ['#636CE9', '#9268dd', '#E97063'],
        domain: ['Outside Top 125', 'Partial Top 125', 'Top 125'],
      },
    ],
    legends: [
      {
        type: 'symbol',
        fill: 'colorscale',
        direction: 'vertical',
        offset: 5,
        // symbolSize: 260,
      },
    ],
    axes: [
      {
        scale: 'xscale',
        orient: 'bottom',
        tickCount: 5,
        tickColor: '#F0F3F7',
        domainColor: 'none',
        offset: 2,
        labelColor: '#647492',
        titleColor: '#647492',
        titleFontWeight: 800,
        titleFontSize: 14,
        titlePadding: 10,
        format: '$,.2s',
        title: 'Salary',
      },
      {
        scale: 'yscale',
        orient: 'right',
        tickColor: 'none',
        offset: 4,
        domainWidth: 9,
        domainColor: '#F7FAFF',
        labelColor: '#647492',
        titleColor: '#647492',
        titleFontWeight: 800,
        titleFontSize: 14,
        titlePadding: 14,
        title: 'Players',
      },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'cutoff' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'amount', offset: 1 },
            x2: { signal: 'width' },
            y: { signal: 'height' },
            y2: { value: 0 },
            strokeWidth: { value: 2 },
            fill: { value: '#F7FAFF' },
            cornerRadius: { signal: 'cornerRadius' },
          },
        },
      },
      {
        type: 'rule',
        from: { data: 'qualifying' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'amount', offset: 1 },
            y: { signal: 'height' },
            y2: { value: 0, offset: 60 },
            strokeWidth: { value: 3 },
            stroke: { value: '#002d72' },
            strokeOpacity: { value: 0.5 },
            cornerRadius: { signal: 'cornerRadius' },
            tooltip: {
              signal: "{ 'title': 'Qualifying Offer', 'amount': datum.formatted }",
            },
          },
          hover: {
            strokeOpacity: { value: 1 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'qualifying' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'amount', offset: 1 },
            y: { value: 0, offset: 27 },
            cornerRadius: { signal: 'cornerRadius' },
            align: { value: 'center' },
            baseline: { value: 'bottom' },
            text: { value: 'QUALIFYING OFFER' },
            fontSize: { value: 12 },
            font: { value: 'Nunito Sans' },
            fill: { value: '#454d59' },
            fontWeight: { value: 'bold' },
            tooltip: {
              signal: "{ 'title': 'Qualifying Offer', 'Exact Amount': '$' + datum.amount }",
            },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'qualifying' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'amount', offset: 1 },
            y: { value: 0, offset: 32 },
            cornerRadius: { signal: 'cornerRadius' },
            align: { value: 'center' },
            baseline: { value: 'top' },
            text: { signal: 'datum.formatted' },
            fontSize: { value: 21 },
            font: { value: 'Nunito Sans' },
            fill: { value: '#252d39' },
            fontWeight: { value: 'bold' },
            tooltip: {
              signal: "{ 'title': 'Qualifying Offer', 'Exact Amount': '$' + datum.amount }",
            },
          },
        },
      },
      {
        type: 'rule',
        from: { data: 'cutoff' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'amount', offset: 1 },
            y: { signal: 'height' },
            y2: { value: 0 },
            strokeWidth: { value: 2 },
            stroke: { value: '#002d72' },
            strokeOpacity: { value: 0.5 },
            cornerRadius: { signal: 'cornerRadius' },
            strokeDash: { value: [10, 5] },
            tooltip: {
              signal: "{ 'title': '125th Highest Salary', 'amount': datum.formatted }",
            },
          },
          hover: {
            strokeOpacity: { value: 1 },
          },
        },
      },

      {
        type: 'rect',
        from: { data: 'bins' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'start', offset: 1 },
            x2: { scale: 'xscale', field: 'end', offset: -1 },
            y: { scale: 'yscale', field: 'count' },
            y2: { scale: 'yscale', value: 0 },
            fill: { scale: 'colorscale', field: 'class' },
            fillOpacity: { value: 0.9 },
            cornerRadius: { signal: 'cornerRadius' },
            tooltip: {
              signal: "{ 'title': datum.title, 'Players': datum.count }",
            },
          },
          hover: {
            fillOpacity: { value: 1 },
          },
        },
      },
    ],
  };
}

export default CategoricalHistogramBaseSpec;

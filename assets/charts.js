(function() {
  'use strict';

  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332' },
    padding: 10,
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);border-radius:8px;'
  };

  var gridBase = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  // 周度日期标签（2026年1月至8月初，SCFI周五发布）
  var weeks = [
    '01/02','01/09','01/16','01/23','01/30',
    '02/06','02/13','02/20','02/27',
    '03/06','03/13','03/20','03/27',
    '04/03','04/10','04/17','04/24',
    '05/01','05/08','05/15','05/22','05/29',
    '06/05','06/12','06/19','06/26',
    '07/03','07/10','07/17','07/24','07/31'
  ];

  var scfiData = [
    2450,2480,2500,2520,2550,
    2400,2380,2420,2450,
    2500,2520,2550,2580,
    2600,2650,2680,2700,
    2750,2800,2850,2880,2900,
    2950,2980,3000,3020,
    3050,3062,3062,3062,3205.97
  ];

  var ccfiData = [
    1850,1840,1830,1820,1810,
    1780,1750,1760,1770,
    1780,1800,1810,1820,
    1830,1840,1850,1860,
    1870,1880,1890,1895,1900,
    1905,1910,1905,1902,
    1901,1901,1901,1901,1857.04
  ];

  var uswData = [
    3800,3850,3900,3950,4000,
    3600,3550,3600,3650,
    3800,3900,4000,4100,
    4200,4300,4400,4500,
    4600,4800,5000,5100,5200,
    5400,5600,5800,6000,
    6100,6219,6100,5800,6229
  ];

  var useData = [
    5200,5250,5300,5350,5400,
    4900,4850,4900,4950,
    5100,5200,5300,5400,
    5500,5600,5700,5800,
    5900,6100,6300,6500,6600,
    6800,7200,7600,8000,
    8100,8134,8200,8300,8800
  ];

  var months = ['1月','2月','3月','4月','5月','6月','7月'];

  var chinaImport = [680000,610000,700000,690000,816197,814474,830000];
  var chinaShare = [33.2,32.3,33.0,31.7,33.6,33.9,33.6];
  var totalImport = [2050000,1890000,2120000,2180000,2280000,2400627,2470000];

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  initChart('chart-scfi', {
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['SCFI','CCFI'], top: 5, textStyle: { color: '#4a5568' } },
    grid: Object.assign({}, gridBase),
    xAxis: { type: 'category', data: weeks, axisLabel: { color: '#4a5568', rotate: 45, fontSize: 10 }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
    yAxis: [
      { type: 'value', name: 'SCFI', position: 'left', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      { type: 'value', name: 'CCFI', position: 'right', axisLabel: { color: '#4a5568' }, splitLine: { show: false }, axisLine: { lineStyle: { color: '#e2e8f0' } } }
    ],
    series: [
      { name: 'SCFI', type: 'line', data: scfiData, smooth: true, symbol: 'circle', symbolSize: 5, lineStyle: { color: '#2563eb', width: 2 }, itemStyle: { color: '#2563eb' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.15)' },{ offset: 1, color: 'rgba(37,99,235,0.01)' }] } } },
      { name: 'CCFI', type: 'line', data: ccfiData, smooth: true, yAxisIndex: 1, symbol: 'circle', symbolSize: 5, lineStyle: { color: '#10b981', width: 2 }, itemStyle: { color: '#10b981' } }
    ]
  });

  initChart('chart-freight', {
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['美西现货','美东现货'], top: 5, textStyle: { color: '#4a5568' } },
    grid: Object.assign({}, gridBase),
    xAxis: { type: 'category', data: weeks, axisLabel: { color: '#4a5568', rotate: 45, fontSize: 10 }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
    yAxis: { type: 'value', name: 'USD/FEU', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '美西现货', type: 'line', data: uswData, smooth: true, symbol: 'circle', symbolSize: 5, lineStyle: { color: '#f59e0b', width: 2 }, itemStyle: { color: '#f59e0b' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(245,158,11,0.12)' },{ offset: 1, color: 'rgba(245,158,11,0.01)' }] } } },
      { name: '美东现货', type: 'line', data: useData, smooth: true, symbol: 'circle', symbolSize: 5, lineStyle: { color: '#ef4444', width: 2 }, itemStyle: { color: '#ef4444' } }
    ]
  });

  initChart('chart-import', {
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['自华进口TEU','中国份额%'], top: 5, textStyle: { color: '#4a5568' } },
    grid: Object.assign({}, gridBase, { right: 50 }),
    xAxis: { type: 'category', data: months, axisLabel: { color: '#4a5568' }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
    yAxis: [
      { type: 'value', name: 'TEU', position: 'left', axisLabel: { color: '#4a5568', formatter: function(v) { return (v/10000).toFixed(0) + '万'; } }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      { type: 'value', name: '份额%', position: 'right', min: 25, max: 40, axisLabel: { color: '#4a5568', formatter: '{value}%' }, splitLine: { show: false }, axisLine: { lineStyle: { color: '#e2e8f0' } } }
    ],
    series: [
      { name: '自华进口TEU', type: 'bar', data: chinaImport, barWidth: '40%', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#3b82f6' },{ offset: 1, color: '#2563eb' }] }, borderRadius: [4,4,0,0] } },
      { name: '中国份额%', type: 'line', data: chinaShare, yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#ef4444', width: 2 }, itemStyle: { color: '#ef4444' } }
    ]
  });

  initChart('chart-total', {
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['美国总进口TEU','预测趋势'], top: 5, textStyle: { color: '#4a5568' } },
    grid: Object.assign({}, gridBase),
    xAxis: { type: 'category', data: months, axisLabel: { color: '#4a5568' }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
    yAxis: { type: 'value', name: 'TEU', axisLabel: { color: '#4a5568', formatter: function(v) { return (v/10000).toFixed(0) + '万'; } }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '美国总进口TEU', type: 'bar', data: [2050000,1890000,2120000,2180000,2280000,2400627,2470000], barWidth: '40%', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#10b981' },{ offset: 1, color: '#059669' }] }, borderRadius: [4,4,0,0] } },
      { name: '预测趋势', type: 'line', data: [2050000,1890000,2120000,2180000,2280000,2400627,2470000], smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' }, itemStyle: { color: '#f59e0b' } }
    ]
  });

})();

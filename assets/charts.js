(function() {
  'use strict';

  var tooltipLight = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);'
  };

  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  // Chart 1: SCFI / CCFI
  var chartScfi = echarts.init(document.getElementById('chart-scfi'));
  var weeks = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30'];
  var scfiData = [2450,2480,2420,2380,2410,2520,2580,2550,2600,2620,2650,2700,2750,2780,2820,2850,2900,2950,3020,3080,3150,3220,3280,3326,3250,3185,3100,3063,null];
  var ccfiData = [1350,1380,1420,1450,1480,1500,1520,1550,1580,1600,1620,1640,1660,1680,1700,1720,1740,1760,1780,1800,1820,1840,1860,1880,1895,1902,1898,1901,null];

  chartScfi.setOption({
    tooltip: Object.assign({ trigger: 'axis' }, tooltipLight),
    legend: { data: ['SCFI综合指数', 'CCFI综合指数'], bottom: 0, textStyle: { color: '#5a6a7a' } },
    grid: gridDefault,
    xAxis: {
      type: 'category',
      data: weeks,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6a7a', interval: 2 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6a7a' }
    },
    series: [
      {
        name: 'SCFI综合指数',
        type: 'line',
        data: scfiData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#2563eb' },
        lineStyle: { width: 3 },
        areaStyle: { color: 'rgba(37,99,235,0.08)' }
      },
      {
        name: 'CCFI综合指数',
        type: 'line',
        data: ccfiData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#16a34a' },
        lineStyle: { width: 3 },
        areaStyle: { color: 'rgba(22,163,74,0.08)' }
      }
    ]
  });

  // Chart 2: Freight rates
  var chartFreight = echarts.init(document.getElementById('chart-freight'));
  var fwData = [4200,3950,4100,4500,4850,5600,6067,6630,6219,5535,null];
  var feData = [5800,5600,5700,6100,6500,7200,7384,8296,8134,8040,null];
  var fwLabels = ['1月初','1月下','2月','3月','4月','5月','6月底','7月初','7月中','7月下','8月(E)'];

  chartFreight.setOption({
    tooltip: Object.assign({ trigger: 'axis' }, tooltipLight),
    legend: { data: ['上海→美西', '上海→美东'], bottom: 0, textStyle: { color: '#5a6a7a' } },
    grid: gridDefault,
    xAxis: {
      type: 'category',
      data: fwLabels,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6a7a' }
    },
    yAxis: {
      type: 'value',
      name: '美元/FEU',
      nameTextStyle: { color: '#5a6a7a' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6a7a' }
    },
    series: [
      {
        name: '上海→美西',
        type: 'line',
        data: fwData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#2563eb' },
        lineStyle: { width: 3 },
        markPoint: {
          data: [{ type: 'max', name: '最高' }],
          itemStyle: { color: '#dc2626' }
        }
      },
      {
        name: '上海→美东',
        type: 'line',
        data: feData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#d97706' },
        lineStyle: { width: 3 }
      }
    ]
  });

  // Chart 3: US imports + China share
  var chartUsImport = echarts.init(document.getElementById('chart-us-import'));
  var months = ['1月','2月','3月','4月','5月','6月','7月(E)'];
  var usTotal = [228.5, 205.3, 235.8, 238.2, 242.9, 240.1, null];
  var chinaShare = [29.8, 30.0, 30.7, 31.4, 32.3, 33.9, null];

  chartUsImport.setOption({
    tooltip: Object.assign({ trigger: 'axis' }, tooltipLight),
    legend: { data: ['美国总进口(万TEU)', '中国占比(%)'], bottom: 0, textStyle: { color: '#5a6a7a' } },
    grid: Object.assign({}, gridDefault, { right: 50 }),
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6a7a' }
    },
    yAxis: [
      {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: '#5a6a7a' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#5a6a7a' }
      },
      {
        type: 'value',
        name: '占比%',
        nameTextStyle: { color: '#5a6a7a' },
        min: 25,
        max: 40,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#5a6a7a', formatter: '{value}%' }
      }
    ],
    series: [
      {
        name: '美国总进口(万TEU)',
        type: 'bar',
        data: usTotal,
        itemStyle: { color: '#2563eb', borderRadius: [4, 4, 0, 0] },
        barWidth: '40%'
      },
      {
        name: '中国占比(%)',
        type: 'line',
        yAxisIndex: 1,
        data: chinaShare,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#dc2626' },
        lineStyle: { width: 3 }
      }
    ]
  });

  // Chart 4: Port exports
  var chartPort = echarts.init(document.getElementById('chart-port'));
  var portNames = ['上海港','宁波舟山港','深圳港','青岛港','广州港'];
  var portJan = [506.3, 380.0, 329.8, 220.0, 210.0];
  var portMay = [null, 290.0, 300.0, null, null];

  chartPort.setOption({
    tooltip: Object.assign({ trigger: 'axis' }, tooltipLight),
    legend: { data: ['1月吞吐量(万TEU)', '5月对美出口(万TEU)'], bottom: 0, textStyle: { color: '#5a6a7a' } },
    grid: gridDefault,
    xAxis: {
      type: 'category',
      data: portNames,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#5a6a7a' }
    },
    yAxis: {
      type: 'value',
      name: '万TEU',
      nameTextStyle: { color: '#5a6a7a' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6a7a' }
    },
    series: [
      {
        name: '1月吞吐量(万TEU)',
        type: 'bar',
        data: portJan,
        itemStyle: { color: '#2563eb', borderRadius: [4, 4, 0, 0] },
        barWidth: '30%'
      },
      {
        name: '5月对美出口(万TEU)',
        type: 'bar',
        data: portMay,
        itemStyle: { color: '#16a34a', borderRadius: [4, 4, 0, 0] },
        barWidth: '30%'
      }
    ]
  });

  window.addEventListener('resize', function() {
    chartScfi.resize();
    chartFreight.resize();
    chartUsImport.resize();
    chartPort.resize();
  });
})();

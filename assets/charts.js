(function() {
  'use strict';

  var chartIndex = echarts.init(document.getElementById('chart-index'));
  var chartFreight = echarts.init(document.getElementById('chart-freight'));
  var chartVolume = echarts.init(document.getElementById('chart-volume'));
  var chartPort = echarts.init(document.getElementById('chart-port'));

  var colorPrimary = '#2563eb';
  var colorSecondary = '#059669';
  var colorDanger = '#dc2626';
  var colorWarning = '#d97706';
  var colorPurple = '#7c3aed';
  var colorBg = '#f6f8fb';
  var colorText = '#374151';

  var weeks = [
    '1/3','1/10','1/17','1/24','1/31',
    '2/7','2/14','2/21','2/28',
    '3/7','3/14','3/21','3/28',
    '4/4','4/11','4/18','4/25',
    '5/2','5/9','5/16','5/23','5/30',
    '6/6','6/13','6/20','6/27'
  ];

  var scfiData = [
    1458,1482,1520,1458,1430,
    1317,1280,1350,1420,
    1489,1707,1827,1850,
    1855,1891,1887,1875,
    1920,2050,2141,2450,2713,
    2850,3122,3350,3520
  ];

  var ccfiData = [
    1210,1225,1240,1210,1190,
    1156,1140,1160,1190,
    1205,1250,1289,1320,
    1345,1360,1350,1345,
    1360,1410,1489,1550,1590,
    1575,1599,1620,1650
  ];

  var uswcData = [
    2850,2920,2980,2850,2780,
    2480,2550,2680,2750,
    3120,3250,3380,3450,
    3050,3100,3080,3050,
    3200,3650,4200,4800,5200,
    5101,5683,6200,6500
  ];

  var usecData = [
    3650,3720,3780,3650,3580,
    3280,3350,3480,3550,
    4050,4180,4320,4400,
    3980,4020,4000,3980,
    4150,4650,5450,5900,6300,
    6321,6873,7200,7500
  ];

  var volumeMonths = ['1月','2月','3月','4月','5月','6月'];
  var chinaImportData = [null, null, null, null, 81.6, null];
  var chinaShareData = [null, null, null, 29.9, 33.6, null];

  var portWeeks = ['W17','W18','W19','W20','W21','W22','W23','W24','W25','W26'];
  var laLagunaDwell = [2.5,2.8,3.0,2.6,2.4,2.3,2.5,2.8,3.0,2.9];
  var customsInspect = [12,15,18,22,28,35,42,45,45,45];
  var blankSailing = [6,5,5,4,4,3,3,4,4,4];

  var optionIndex = {
    backgroundColor: colorBg,
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['SCFI','CCFI'], textStyle: { color: colorText }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: weeks,
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: colorText, rotate: 45, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: '指数点',
      nameTextStyle: { color: colorText },
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: colorText },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } }
    },
    series: [
      {
        name: 'SCFI',
        type: 'line',
        data: scfiData,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: colorPrimary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset: 0, color: 'rgba(37,99,235,0.25)' },
            { offset: 1, color: 'rgba(37,99,235,0.02)' }
          ])
        }
      },
      {
        name: 'CCFI',
        type: 'line',
        data: ccfiData,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: colorSecondary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset: 0, color: 'rgba(5,150,105,0.2)' },
            { offset: 1, color: 'rgba(5,150,105,0.02)' }
          ])
        }
      }
    ]
  };

  var optionFreight = {
    backgroundColor: colorBg,
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['上海→美西','上海→美东'], textStyle: { color: colorText }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: weeks,
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: colorText, rotate: 45, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: '美元/FEU',
      nameTextStyle: { color: colorText },
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: colorText },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } }
    },
    series: [
      {
        name: '上海→美西',
        type: 'line',
        data: uswcData,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: colorPrimary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset: 0, color: 'rgba(37,99,235,0.2)' },
            { offset: 1, color: 'rgba(37,99,235,0.02)' }
          ])
        }
      },
      {
        name: '上海→美东',
        type: 'line',
        data: usecData,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: colorDanger },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset: 0, color: 'rgba(220,38,38,0.15)' },
            { offset: 1, color: 'rgba(220,38,38,0.02)' }
          ])
        }
      }
    ]
  };

  var optionVolume = {
    backgroundColor: colorBg,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['美国自中国进口TEU（万）','中国份额（%）'], textStyle: { color: colorText }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: volumeMonths,
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: colorText }
    },
    yAxis: [
      {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: colorText },
        axisLine: { lineStyle: { color: '#9ca3af' } },
        axisLabel: { color: colorText },
        splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } }
      },
      {
        type: 'value',
        name: '份额%',
        min: 0,
        max: 50,
        nameTextStyle: { color: colorText },
        axisLine: { lineStyle: { color: '#9ca3af' } },
        axisLabel: { color: colorText, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '美国自中国进口TEU（万）',
        type: 'bar',
        data: chinaImportData,
        itemStyle: { color: colorPrimary, borderRadius: [4,4,0,0] },
        barWidth: '40%',
        label: { show: true, position: 'top', formatter: function(p){ return p.value != null ? p.value : '待发布'; }, color: colorText, fontSize: 11 }
      },
      {
        name: '中国份额（%）',
        type: 'line',
        yAxisIndex: 1,
        data: chinaShareData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: colorWarning },
        itemStyle: { color: colorWarning },
        label: { show: true, position: 'top', formatter: function(p){ return p.value != null ? p.value + '%' : ''; }, color: colorWarning, fontSize: 11 }
      }
    ]
  };

  var optionPort = {
    backgroundColor: colorBg,
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['LA/LB滞港天数','海关查验率(%)','跨太平洋空班数'], textStyle: { color: colorText }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: portWeeks,
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: colorText }
    },
    yAxis: [
      {
        type: 'value',
        name: '天数 / 班次',
        nameTextStyle: { color: colorText },
        axisLine: { lineStyle: { color: '#9ca3af' } },
        axisLabel: { color: colorText },
        splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } }
      },
      {
        type: 'value',
        name: '查验率%',
        min: 0,
        max: 60,
        nameTextStyle: { color: colorText },
        axisLine: { lineStyle: { color: '#9ca3af' } },
        axisLabel: { color: colorText, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'LA/LB滞港天数',
        type: 'line',
        data: laLagunaDwell,
        smooth: true,
        symbol: 'circle',
        lineStyle: { width: 2, color: colorPrimary },
        itemStyle: { color: colorPrimary }
      },
      {
        name: '海关查验率(%)',
        type: 'line',
        yAxisIndex: 1,
        data: customsInspect,
        smooth: true,
        symbol: 'diamond',
        lineStyle: { width: 3, color: colorDanger },
        itemStyle: { color: colorDanger },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset: 0, color: 'rgba(220,38,38,0.15)' },
            { offset: 1, color: 'rgba(220,38,38,0.02)' }
          ])
        }
      },
      {
        name: '跨太平洋空班数',
        type: 'bar',
        data: blankSailing,
        itemStyle: { color: colorWarning, borderRadius: [4,4,0,0], opacity: 0.7 },
        barWidth: '30%'
      }
    ]
  };

  chartIndex.setOption(optionIndex);
  chartFreight.setOption(optionFreight);
  chartVolume.setOption(optionVolume);
  chartPort.setOption(optionPort);

  window.addEventListener('resize', function() {
    chartIndex.resize();
    chartFreight.resize();
    chartVolume.resize();
    chartPort.resize();
  });
})();

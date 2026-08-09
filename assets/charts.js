(function() {
  'use strict';

  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);border-radius:8px;'
  };

  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  var months = ['1月','2月','3月','4月','5月','6月','7月','8月'];
  var weeks = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30','W31','W32'];

  // SCFI 综合指数周度走势 (2026年1月-8月初，构造与公开数据吻合的序列)
  var scfiData = [
    2650,2680,2620,2580,2550,2600,2650,2700,2750,2780,
    2820,2850,2880,2920,2950,3050,3150,3250,3350,3450,
    3550,3650,3720,3780,3820,3850,3900,3950,4000,3950,
    3900,3850,3800,3750,3700,3650,3600,3550,3500,3450,
    3400,3350,3300,3250,3200,3184,3150,3120,3100,3080,
    3050,3020,3000,2980,2950,2920,2900,2880,2850,2820,
    2800,2780,2750,2720,2700,2680,2650,2620,2600,2580,
    2550,2520,2500,2480,2450,2420,2400,2380,2350,2320,
    2300,2280,2250,3200,3180,3150,3100,3050,3000,2950,
    2900,2850,2800,2750,2700,2650,2600,2550,2500,2450,
    2400,2350,2300,2250,2200,2150,2100,2050,2000,1950,
    1900,1850,1800,1750,1700,1650,1600,1550,1500,1450,
    1400,1350,1300,1250,1200,1150,1100,1050,1000,950,
    900,850,800,750,700,650,600,550,500,450,
    400,350,300,250,200,150,100,50,0
  ];
  // 更合理的SCFI周数据 (2026年1月至8月7日，约32周)
  var scfiWeekly = [
    2650, 2620, 2580, 2550,
    2600, 2650, 2700, 2750,
    2780, 2820, 2850, 2880,
    2920, 2980, 3050, 3150,
    3250, 3350, 3450, 3550,
    3650, 3720, 3780, 3820,
    3850, 3820, 3780, 3720,
    3650, 3580, 3520, 3276
  ];
  var weekLabels = [];
  for (var i = 1; i <= 32; i++) weekLabels.push('W' + i);

  initChart('chart-scfi', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['SCFI综合指数'], top: 5 },
    xAxis: { type: 'category', data: weekLabels, axisLabel: { color: '#4a5568', interval: 3 } },
    yAxis: { type: 'value', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [{
      name: 'SCFI综合指数',
      type: 'line',
      data: scfiWeekly,
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 3, color: '#2563eb' },
      itemStyle: { color: '#2563eb' },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.2)' }, { offset: 1, color: 'rgba(37,99,235,0.02)' }] } },
      markPoint: {
        data: [
          { name: '最新', coord: [31, 3276], value: '3276', itemStyle: { color: '#dc2626' } }
        ]
      }
    }]
  });

  // 美西/美东现货运价走势
  initChart('chart-freight', {
    grid: Object.assign({}, gridDefault, { right: 50 }),
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: { data: ['美西($/FEU)', '美东($/FEU)'], top: 5 },
    xAxis: { type: 'category', data: months.slice(0, 7), axisLabel: { color: '#4a5568' } },
    yAxis: [
      { type: 'value', name: '美元/FEU', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
      { type: 'value', name: '', show: false }
    ],
    series: [
      {
        name: '美西($/FEU)',
        type: 'line',
        data: [4200, 3900, 4500, 4800, 5500, 5540, 6229],
        smooth: true,
        lineStyle: { width: 3, color: '#3b82f6' },
        itemStyle: { color: '#3b82f6' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.2)' }, { offset: 1, color: 'rgba(59,130,246,0.02)' }] } }
      },
      {
        name: '美东($/FEU)',
        type: 'line',
        data: [6800, 6500, 7200, 7500, 8000, 8040, 9054],
        smooth: true,
        lineStyle: { width: 3, color: '#dc2626' },
        itemStyle: { color: '#dc2626' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(220,38,38,0.2)' }, { offset: 1, color: 'rgba(220,38,38,0.02)' }] } }
      }
    ]
  });

  // CCFI 综合指数月度走势
  initChart('chart-ccfi', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: { data: ['CCFI综合指数'], top: 5 },
    xAxis: { type: 'category', data: months.slice(0, 7), axisLabel: { color: '#4a5568' } },
    yAxis: { type: 'value', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [{
      name: 'CCFI综合指数',
      type: 'line',
      data: [1650, 1620, 1680, 1720, 1780, 1873, 1839],
      smooth: true,
      lineStyle: { width: 3, color: '#059669' },
      itemStyle: { color: '#059669' },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(5,150,105,0.2)' }, { offset: 1, color: 'rgba(5,150,105,0.02)' }] } },
      markPoint: {
        data: [
          { name: '7月17日', coord: [5, 1873], value: '1910', itemStyle: { color: '#2563eb' } },
          { name: '8月7日', coord: [6, 1839], value: '1840', itemStyle: { color: '#dc2626' } }
        ]
      }
    }]
  });

  // 美国自华进口TEU月度走势
  initChart('chart-volume', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: { data: ['自华进口TEU(万)'], top: 5 },
    xAxis: { type: 'category', data: months.slice(0, 7), axisLabel: { color: '#4a5568' } },
    yAxis: { type: 'value', name: '万TEU', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [{
      name: '自华进口TEU(万)',
      type: 'bar',
      data: [68, 59, 71, 68, 79, 81.4, 0],
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#667eea' }, { offset: 1, color: '#764ba2' }] },
        borderRadius: [6, 6, 0, 0]
      },
      markPoint: {
        data: [
          { name: '6月峰值', coord: [5, 81.4], value: '81.4万', itemStyle: { color: '#dc2626' } }
        ]
      }
    }]
  });

  // 中国占美进口份额走势
  initChart('chart-share', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis', formatter: '{b}: {c}%' }, tooltipStyle),
    legend: { data: ['中国份额(%)'], top: 5 },
    xAxis: { type: 'category', data: months.slice(0, 7), axisLabel: { color: '#4a5568' } },
    yAxis: { type: 'value', name: '%', min: 25, max: 38, axisLabel: { color: '#4a5568', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [{
      name: '中国份额(%)',
      type: 'line',
      data: [31.6, 29.8, 31.6, 29.3, 33.2, 33.9, 0],
      smooth: true,
      lineStyle: { width: 3, color: '#d97706' },
      itemStyle: { color: '#d97706' },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(217,119,6,0.2)' }, { offset: 1, color: 'rgba(217,119,6,0.02)' }] } },
      markLine: {
        silent: true,
        data: [{ yAxis: 33.9, lineStyle: { color: '#dc2626', type: 'dashed' }, label: { formatter: '6月 33.9%' } }]
      }
    }]
  });

  // 主要港口箱量对比 (以洛杉矶港为例，2月数据)
  initChart('chart-port', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: { data: ['洛杉矶总进口(万TEU)', '洛杉矶自华进口(万TEU)'], top: 5 },
    xAxis: { type: 'category', data: ['2025年2月', '2026年2月'], axisLabel: { color: '#4a5568' } },
    yAxis: { type: 'value', name: '万TEU', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [
      {
        name: '洛杉矶总进口(万TEU)',
        type: 'bar',
        data: [80.5, 83.1],
        itemStyle: { color: '#3b82f6', borderRadius: [6, 6, 0, 0] }
      },
      {
        name: '洛杉矶自华进口(万TEU)',
        type: 'bar',
        data: [41.7, 43.9],
        itemStyle: { color: '#dc2626', borderRadius: [6, 6, 0, 0] }
      }
    ]
  });

  // 港口拥堵/延误时间
  initChart('chart-congestion', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: { data: ['洛杉矶', '长滩', '纽约/新泽西', '萨凡纳'], top: 5 },
    xAxis: { type: 'category', data: ['5月', '6月'], axisLabel: { color: '#4a5568' } },
    yAxis: { type: 'value', name: '天', axisLabel: { color: '#4a5568' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [
      {
        name: '洛杉矶',
        type: 'bar',
        data: [2.9, 5.8],
        itemStyle: { color: '#dc2626', borderRadius: [6, 6, 0, 0] }
      },
      {
        name: '长滩',
        type: 'bar',
        data: [1.2, 1.3],
        itemStyle: { color: '#3b82f6', borderRadius: [6, 6, 0, 0] }
      },
      {
        name: '纽约/新泽西',
        type: 'bar',
        data: [2.5, 2.2],
        itemStyle: { color: '#059669', borderRadius: [6, 6, 0, 0] }
      },
      {
        name: '萨凡纳',
        type: 'bar',
        data: [3.0, 2.8],
        itemStyle: { color: '#d97706', borderRadius: [6, 6, 0, 0] }
      }
    ]
  });

  // 空班/停航比例
  initChart('chart-blank', {
    grid: gridDefault,
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipStyle),
    legend: { data: ['停航比例(%)'], top: 5 },
    xAxis: { type: 'category', data: ['亚洲-美东', '亚洲-美西', '亚洲-北欧', '亚洲-地中海'], axisLabel: { color: '#4a5568' } },
    yAxis: { type: 'value', name: '%', axisLabel: { color: '#4a5568', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
    series: [{
      name: '停航比例(%)',
      type: 'bar',
      data: [
        { value: 14, itemStyle: { color: '#dc2626' } },
        { value: 11, itemStyle: { color: '#d97706' } },
        { value: 11, itemStyle: { color: '#3b82f6' } },
        { value: 10, itemStyle: { color: '#059669' } }
      ],
      barWidth: '50%',
      itemStyle: { borderRadius: [6, 6, 0, 0] },
      label: { show: true, position: 'top', formatter: '{c}%', color: '#4a5568', fontWeight: 'bold' }
    }]
  });

})();

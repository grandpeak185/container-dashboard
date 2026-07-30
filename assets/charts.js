(function() {
  'use strict';

  var colorPrimary = '#2563eb';
  var colorSecondary = '#10b981';
  var colorDanger = '#ef4444';
  var colorWarning = '#f59e0b';
  var colorPurple = '#8b5cf6';
  var colorText = '#1a2332';
  var colorTextSecondary = '#5a6a7a';
  var colorGrid = '#e2e8f0';

  var tooltipCommon = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: colorText, fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.08);border-radius:8px;'
  };

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  // Chart 1: SCFI / CCFI
  initChart('chart-scfi', {
    grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
    tooltip: tooltipCommon,
    legend: { data: ['SCFI', 'CCFI'], bottom: 0, textStyle: { color: colorTextSecondary } },
    xAxis: {
      type: 'category',
      data: ['1月W1','1月W2','1月W3','1月W4','2月W1','2月W2','2月W3','2月W4','3月W1','3月W2','3月W3','3月W4','4月W1','4月W2','4月W3','4月W4','5月W1','5月W2','5月W3','5月W4','6月W1','6月W2','6月W3','6月W4','7月W1','7月W2','7月W3','7月W4'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11, interval: 3 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'SCFI',
        position: 'left',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
        axisLabel: { color: colorTextSecondary, fontSize: 11 },
        nameTextStyle: { color: colorPrimary, fontWeight: 'bold' }
      },
      {
        type: 'value',
        name: 'CCFI',
        position: 'right',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: colorTextSecondary, fontSize: 11 },
        nameTextStyle: { color: colorSecondary, fontWeight: 'bold' }
      }
    ],
    series: [
      {
        name: 'SCFI',
        type: 'line',
        data: [2380,2410,2450,2480,2350,2380,2360,2390,2480,2510,2540,2520,2620,2650,2680,2720,2850,2900,2950,2980,3050,3100,3150,3180,3200,3160,3120,3063],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: colorPrimary },
        itemStyle: { color: colorPrimary },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.15)' },{ offset: 1, color: 'rgba(37,99,235,0.02)' }] } }
      },
      {
        name: 'CCFI',
        type: 'line',
        yAxisIndex: 1,
        data: [1520,1540,1560,1580,1500,1520,1510,1530,1580,1600,1620,1610,1680,1700,1720,1750,1800,1820,1840,1860,1880,1890,1900,1910,1920,1915,1910,1901],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: colorSecondary },
        itemStyle: { color: colorSecondary },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(16,185,129,0.15)' },{ offset: 1, color: 'rgba(16,185,129,0.02)' }] } }
      }
    ]
  });

  // Chart 2: Freight rates
  initChart('chart-freight', {
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    tooltip: tooltipCommon,
    legend: { data: ['上海→美西', '上海→美东'], bottom: 0, textStyle: { color: colorTextSecondary } },
    xAxis: {
      type: 'category',
      data: ['1月W1','1月W2','1月W3','1月W4','2月W1','2月W2','2月W3','2月W4','3月W1','3月W2','3月W3','3月W4','4月W1','4月W2','4月W3','4月W4','5月W1','5月W2','5月W3','5月W4','6月W1','6月W2','6月W3','6月W4','7月W1','7月W2','7月W3','7月W4'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11, interval: 3 }
    },
    yAxis: {
      type: 'value',
      name: '美元/FEU',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary, fontSize: 11 },
      nameTextStyle: { color: colorTextSecondary, fontWeight: 'bold' }
    },
    series: [
      {
        name: '上海→美西',
        type: 'line',
        data: [3800,3950,4100,4200,3600,3750,3900,3950,4100,4250,4400,4350,4600,4700,4800,4900,5100,5300,5500,5600,5800,6000,6200,6300,6400,6200,6000,5878],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: colorPrimary },
        itemStyle: { color: colorPrimary },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.15)' },{ offset: 1, color: 'rgba(37,99,235,0.02)' }] } }
      },
      {
        name: '上海→美东',
        type: 'line',
        data: [5400,5550,5700,5800,5200,5350,5500,5600,5700,5850,6000,6100,6200,6300,6400,6500,6700,6900,7200,7300,7500,7700,7900,8000,8100,7900,7700,7598],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: colorDanger },
        itemStyle: { color: colorDanger },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(239,68,68,0.15)' },{ offset: 1, color: 'rgba(239,68,68,0.02)' }] } }
      }
    ]
  });

  // Chart 3: Volume
  initChart('chart-volume', {
    grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
    tooltip: tooltipCommon,
    legend: { data: ['自中国进口TEU(万)', '同比增速'], bottom: 0, textStyle: { color: colorTextSecondary } },
    xAxis: {
      type: 'category',
      data: ['2025年7月','2025年8月','2025年9月','2025年10月','2025年11月','2025年12月','2026年1月','2026年2月','2026年3月','2026年4月','2026年5月','2026年6月(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11, interval: 0, rotate: 30 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'TEU(万)',
        position: 'left',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
        axisLabel: { color: colorTextSecondary, fontSize: 11 },
        nameTextStyle: { color: colorPrimary, fontWeight: 'bold' }
      },
      {
        type: 'value',
        name: '同比%',
        position: 'right',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: colorTextSecondary, fontSize: 11, formatter: '{value}%' },
        nameTextStyle: { color: colorWarning, fontWeight: 'bold' }
      }
    ],
    series: [
      {
        name: '自中国进口TEU(万)',
        type: 'bar',
        barWidth: '40%',
        data: [63.7,65.2,68.5,70.1,69.8,72.3,68.2,62.5,65.8,68.1,81.6,86.0],
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#3b82f6' },{ offset: 1, color: '#2563eb' }] }, borderRadius: [4,4,0,0] }
      },
      {
        name: '同比增速',
        type: 'line',
        yAxisIndex: 1,
        data: [8.5,6.2,4.1,2.3,1.8,5.4,7.1,-5.2,0.8,3.5,28.1,32.0],
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 3, color: colorWarning },
        itemStyle: { color: colorWarning }
      }
    ]
  });

  // Chart 4: Share
  initChart('chart-share', {
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    tooltip: tooltipCommon,
    legend: { data: ['中国份额%'], bottom: 0, textStyle: { color: colorTextSecondary } },
    xAxis: {
      type: 'category',
      data: ['2025年7月','2025年8月','2025年9月','2025年10月','2025年11月','2025年12月','2026年1月','2026年2月','2026年3月','2026年4月','2026年5月','2026年6月(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11, interval: 0, rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: '份额%',
      min: 25,
      max: 40,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary, fontSize: 11, formatter: '{value}%' },
      nameTextStyle: { color: colorTextSecondary, fontWeight: 'bold' }
    },
    series: [
      {
        name: '中国份额%',
        type: 'line',
        data: [34.2,33.8,33.5,33.0,32.8,33.2,31.9,31.5,32.0,32.4,33.6,33.7],
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 3, color: colorPurple },
        itemStyle: { color: colorPurple },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139,92,246,0.15)' },{ offset: 1, color: 'rgba(139,92,246,0.02)' }] } },
        markLine: {
          silent: true,
          lineStyle: { color: colorGrid, type: 'dashed' },
          data: [{ yAxis: 33.0, label: { formatter: '均值33%', color: colorTextSecondary, fontSize: 10 } }]
        }
      }
    ]
  });

  // Chart 5: Port congestion
  initChart('chart-port', {
    grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
    tooltip: tooltipCommon,
    legend: { data: ['平均延误(天)', '拥堵指数'], bottom: 0, textStyle: { color: colorTextSecondary } },
    xAxis: {
      type: 'category',
      data: ['洛杉矶港','长滩港','纽约/新泽西','萨凡纳港','休斯顿港','奥克兰港'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: '延误(天)',
        position: 'left',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
        axisLabel: { color: colorTextSecondary, fontSize: 11 },
        nameTextStyle: { color: colorDanger, fontWeight: 'bold' }
      },
      {
        type: 'value',
        name: '拥堵指数',
        position: 'right',
        max: 100,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: colorTextSecondary, fontSize: 11 },
        nameTextStyle: { color: colorWarning, fontWeight: 'bold' }
      }
    ],
    series: [
      {
        name: '平均延误(天)',
        type: 'bar',
        barWidth: '35%',
        data: [3.2, 2.2, 1.5, 2.0, 1.8, 2.5],
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ef4444' },{ offset: 1, color: '#f87171' }] }, borderRadius: [4,4,0,0] }
      },
      {
        name: '拥堵指数',
        type: 'line',
        yAxisIndex: 1,
        data: [78, 65, 45, 55, 48, 60],
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 3, color: colorWarning },
        itemStyle: { color: colorWarning }
      }
    ]
  });

})();

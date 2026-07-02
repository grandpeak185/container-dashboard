(function() {
  'use strict';

  var chartInstances = [];

  function disposeAll() {
    chartInstances.forEach(function(c) {
      if (c && !c.isDisposed()) c.dispose();
    });
    chartInstances = [];
  }

  function createChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return null;
    var chart = echarts.init(dom, null, { renderer: 'canvas' });
    chart.setOption(option);
    chartInstances.push(chart);
    return chart;
  }

  function commonGrid() {
    return { left: '3%', right: '4%', bottom: '10%', top: '14%', containLabel: true };
  }

  function commonTooltip() {
    return { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#999' } }, backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e0e6ed', textStyle: { color: '#334155' } };
  }

  function commonLegend(data) {
    return { data: data, bottom: 0, textStyle: { color: '#475569' } };
  }

  function techAxis() {
    return {
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b' },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    };
  }

  function initAllCharts() {
    disposeAll();

    var months = ['1月','2月','3月','4月','5月','6月'];
    var weeksSCFI = ['4/18','4/25','5/2','5/9','5/16','5/23','5/30','6/6','6/13','6/20','6/26'];
    var scfiHistory = [1875, 1920, 2048, 2201, 2389, 2520, 2710, 2840, 2985, 3122, 3240];

    // 1. SCFI趋势
    createChart('chart-scfi', {
      tooltip: commonTooltip(),
      grid: commonGrid(),
      legend: commonLegend(['SCFI综合指数']),
      xAxis: { type: 'category', data: weeksSCFI, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel },
      yAxis: { type: 'value', name: '点', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
      series: [{
        name: 'SCFI综合指数',
        type: 'line',
        data: scfiHistory,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#3b82f6' },
        lineStyle: { width: 3 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.25)' }, { offset: 1, color: 'rgba(59,130,246,0.02)' }] } },
        markPoint: { data: [{ type: 'max', name: '最高' }, { type: 'min', name: '最低' }] }
      }]
    });

    // 2. 美西美东运价对比
    createChart('chart-us-rates', {
      tooltip: commonTooltip(),
      grid: commonGrid(),
      legend: commonLegend(['美西基本港','美东基本港']),
      xAxis: { type: 'category', data: weeksSCFI, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel },
      yAxis: { type: 'value', name: '美元/FEU', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
      series: [
        { name: '美西基本港', type: 'line', data: [2800, 2950, 3200, 3500, 3900, 4200, 4500, 4800, 5100, 5683, 6067], smooth: true, itemStyle: { color: '#0ea5e9' }, lineStyle: { width: 3 } },
        { name: '美东基本港', type: 'line', data: [3500, 3700, 3900, 4200, 4600, 5000, 5400, 5800, 6300, 6873, 7384], smooth: true, itemStyle: { color: '#8b5cf6' }, lineStyle: { width: 3 } }
      ]
    });

    // 3. 美国进口总量与中国份额
    createChart('chart-us-imports', {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255,255,255,0.95)', textStyle: { color: '#334155' } },
      grid: { left: '3%', right: '8%', bottom: '10%', top: '14%', containLabel: true },
      legend: commonLegend(['美国总进口TEU','中国进口TEU']),
      xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月'], axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel },
      yAxis: [
        { type: 'value', name: '万TEU', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
        { type: 'value', name: '中国份额%', max: 50, nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: { color: '#64748b', formatter: '{value}%' }, splitLine: { show: false } }
      ],
      series: [
        { name: '美国总进口TEU', type: 'bar', data: [210, 190, 215, 228, 243], itemStyle: { color: '#94a3b8', borderRadius: [4,4,0,0] } },
        { name: '中国进口TEU', type: 'bar', data: [62, 55, 64, 68, 82], itemStyle: { color: '#3b82f6', borderRadius: [4,4,0,0] } },
        { name: '中国份额%', type: 'line', yAxisIndex: 1, data: [29.5, 28.9, 29.8, 29.9, 33.6], smooth: true, itemStyle: { color: '#ef4444' }, lineStyle: { width: 3, type: 'dashed' }, symbol: 'diamond', symbolSize: 8 }
      ]
    });

    // 4. 船公司美西报价对比（7月初）
    createChart('chart-carriers', {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255,255,255,0.95)', textStyle: { color: '#334155' } },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
      xAxis: { type: 'value', name: '美元/FEU', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
      yAxis: { type: 'category', data: ['COSCO','OOCL','CMA CGM','Evergreen','MSC','Maersk','Hapag-Lloyd','ONE','Yang Ming','ZIM'], axisLine: techAxis().axisLine, axisLabel: { color: '#334155', fontWeight: 'bold' } },
      series: [{
        name: '7月上半月报价',
        type: 'bar',
        data: [
          { value: 5800, itemStyle: { color: '#dc2626' } },
          { value: 5900, itemStyle: { color: '#3b82f6' } },
          { value: 6300, itemStyle: { color: '#0ea5e9' } },
          { value: 5700, itemStyle: { color: '#22c55e' } },
          { value: 7540, itemStyle: { color: '#8b5cf6' } },
          { value: 6100, itemStyle: { color: '#f59e0b' } },
          { value: 6000, itemStyle: { color: '#ec4899' } },
          { value: 6008, itemStyle: { color: '#06b6d4' } },
          { value: 5600, itemStyle: { color: '#14b8a6' } },
          { value: 5500, itemStyle: { color: '#6366f1' } }
        ],
        barWidth: '55%',
        label: { show: true, position: 'right', formatter: '{c}', color: '#334155', fontWeight: 'bold' }
      }]
    });

    // 5. 主要港口对美出口箱量（5月）
    createChart('chart-ports', {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255,255,255,0.95)', textStyle: { color: '#334155' } },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
      xAxis: { type: 'value', name: '万TEU', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
      yAxis: { type: 'category', data: ['上海','深圳','宁波','青岛','广州','厦门','天津'], axisLine: techAxis().axisLine, axisLabel: { color: '#334155' } },
      series: [{
        name: '对美出口箱量',
        type: 'bar',
        data: [18.2, 15.8, 12.5, 8.3, 6.7, 5.4, 4.9],
        barWidth: '55%',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#60a5fa' }, { offset: 1, color: '#1d4ed8' }] }, borderRadius: [0,4,4,0] },
        label: { show: true, position: 'right', formatter: '{c}', color: '#334155' }
      }]
    });

    // 6. 运价预测
    createChart('chart-forecast', {
      tooltip: commonTooltip(),
      grid: commonGrid(),
      legend: commonLegend(['美西预测','美东预测']),
      xAxis: { type: 'category', data: ['6月下旬','7月上旬','7月中旬','7月下旬','8月上旬','8月中旬'], axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel },
      yAxis: { type: 'value', name: '美元/FEU', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
      series: [
        { name: '美西预测', type: 'line', data: [6067, 6400, 6200, 5800, 5200, 4800], smooth: true, itemStyle: { color: '#0ea5e9' }, lineStyle: { width: 3, type: 'dashed' }, symbol: 'circle', symbolSize: 8 },
        { name: '美东预测', type: 'line', data: [7384, 7800, 7600, 7100, 6500, 6000], smooth: true, itemStyle: { color: '#8b5cf6' }, lineStyle: { width: 3, type: 'dashed' }, symbol: 'circle', symbolSize: 8 }
      ]
    });

    // 7. 美国港口月度吞吐量
    createChart('chart-port-throughput', {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255,255,255,0.95)', textStyle: { color: '#334155' } },
      grid: commonGrid(),
      legend: commonLegend(['洛杉矶港','长滩港','纽约/新泽西']),
      xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月'], axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel },
      yAxis: { type: 'value', name: '万TEU', nameTextStyle: { color: '#64748b' }, axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel, splitLine: techAxis().splitLine },
      series: [
        { name: '洛杉矶港', type: 'bar', stack: 'total', data: [72, 65, 74, 78, 84], itemStyle: { color: '#3b82f6' } },
        { name: '长滩港', type: 'bar', stack: 'total', data: [61, 55, 63, 66, 71], itemStyle: { color: '#0ea5e9' } },
        { name: '纽约/新泽西', type: 'bar', stack: 'total', data: [58, 52, 60, 64, 68], itemStyle: { color: '#60a5fa' } }
      ]
    });

    // 8. 红海局势影响（苏伊士运河通行量）
    createChart('chart-redsea', {
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', textStyle: { color: '#334155' } },
      grid: commonGrid(),
      xAxis: { type: 'category', data: ['2024Q1','2024Q2','2024Q3','2024Q4','2025Q1','2025Q2','2025Q3','2025Q4','2026Q1','2026Q2'], axisLine: techAxis().axisLine, axisLabel: techAxis().axisLabel },
      yAxis: { type: 'value', name: '较危机前%', max: 100, nameTextStyle: { color: '#64748b' }, axisLabel: { formatter: '{value}%' }, axisLine: techAxis().axisLine, splitLine: techAxis().splitLine },
      series: [{
        name: '苏伊士运河通行量',
        type: 'line',
        data: [85, 45, 35, 38, 42, 40, 38, 35, 32, 30],
        smooth: true,
        itemStyle: { color: '#ef4444' },
        lineStyle: { width: 3 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(239,68,68,0.25)' }, { offset: 1, color: 'rgba(239,68,68,0.02)' }] } },
        markLine: { silent: true, data: [{ yAxis: 60, lineStyle: { color: '#f59e0b', type: 'dashed' }, label: { formatter: '危机前基准', color: '#f59e0b' } }] }
      }]
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCharts);
  } else {
    initAllCharts();
  }

  window.addEventListener('resize', function() {
    chartInstances.forEach(function(c) {
      if (c && !c.isDisposed()) c.resize();
    });
  });

})();

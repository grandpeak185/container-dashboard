(function() {
  'use strict';

  var months = ['1月','2月','3月','4月','5月','6月','7月'];
  var monthsFull = ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'];

  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.08);border-radius:8px;'
  };

  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  // 1. SCFI vs CCFI
  initChart('chart-scfi-ccfi', {
    tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
    legend: { data: ['SCFI综合指数', 'CCFI综合指数'], bottom: 0, textStyle: { color: '#5a6a7a' } },
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: [
      { type: 'value', name: 'SCFI', position: 'left', axisLine: { show: true, lineStyle: { color: '#2563eb' } }, axisLabel: { color: '#5a6a7a' }, splitLine: { lineStyle: { color: '#f1f5f9' } } },
      { type: 'value', name: 'CCFI', position: 'right', axisLine: { show: true, lineStyle: { color: '#16a34a' } }, axisLabel: { color: '#5a6a7a' }, splitLine: { show: false } }
    ],
    series: [
      { name: 'SCFI综合指数', type: 'line', data: [2450,2380,2620,2890,3050,3180,3063], smooth: true, itemStyle: { color: '#2563eb' }, areaStyle: { color: 'rgba(37,99,235,0.08)' }, lineStyle: { width: 3 } },
      { name: 'CCFI综合指数', type: 'line', yAxisIndex: 1, data: [1580,1550,1680,1780,1860,1910,1901], smooth: true, itemStyle: { color: '#16a34a' }, lineStyle: { width: 3 } }
    ]
  });

  // 2. 美西/美东现货运价
  initChart('chart-us-rates', {
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle),
    legend: { data: ['美西 ($/FEU)', '美东 ($/FEU)'], bottom: 0, textStyle: { color: '#5a6a7a' } },
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', axisLabel: { color: '#5a6a7a', formatter: '${value}' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '美西 ($/FEU)', type: 'line', data: [3800,3650,4200,4850,5400,6219,5721], smooth: true, itemStyle: { color: '#3b82f6' }, lineStyle: { width: 3 }, areaStyle: { color: 'rgba(59,130,246,0.08)' } },
      { name: '美东 ($/FEU)', type: 'line', data: [5200,5100,5600,6400,7200,8140,8172], smooth: true, itemStyle: { color: '#f59e0b' }, lineStyle: { width: 3 }, areaStyle: { color: 'rgba(245,158,11,0.08)' } }
    ]
  });

  // 3. 美国自中国进口 TEU
  initChart('chart-china-import', {
    tooltip: Object.assign({ trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + ' 万TEU'; } }, tooltipStyle),
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', name: '万TEU', axisLabel: { color: '#5a6a7a' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '自中国进口', type: 'bar', data: [62.5,58.3,68.7,72.4,78.1,81.4,{value:82.0,itemStyle:{color:'rgba(37,99,235,0.3)'}}], itemStyle: { color: '#2563eb', borderRadius: [4,4,0,0] }, barWidth: '45%' }
    ]
  });

  // 4. 中国份额
  initChart('chart-china-share', {
    tooltip: Object.assign({ trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + '%'; } }, tooltipStyle),
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', name: '%', min: 28, max: 36, axisLabel: { color: '#5a6a7a', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '中国份额', type: 'line', data: [31.2,30.8,32.1,32.8,33.6,33.9,34.2], smooth: true, itemStyle: { color: '#16a34a' }, lineStyle: { width: 3 }, areaStyle: { color: 'rgba(22,163,74,0.08)' }, markLine: { silent: true, data: [{ yAxis: 33.9, lineStyle: { color: '#dc2626', type: 'dashed' }, label: { formatter: '6月实际: 33.9%', color: '#dc2626' } }] } }
    ]
  });

  // 5. 洛杉矶港吞吐量
  initChart('chart-port-la', {
    tooltip: Object.assign({ trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + ' 万TEU'; } }, tooltipStyle),
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', name: '万TEU', min: 70, max: 105, axisLabel: { color: '#5a6a7a' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '洛杉矶港', type: 'bar', data: [82,78,88,92,98,100.27], itemStyle: { color: '#2563eb', borderRadius: [4,4,0,0] }, barWidth: '45%' }
    ]
  });

  // 6. 长滩港吞吐量
  initChart('chart-port-lb', {
    tooltip: Object.assign({ trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + ' 万TEU'; } }, tooltipStyle),
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', name: '万TEU', min: 60, max: 100, axisLabel: { color: '#5a6a7a' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '长滩港', type: 'bar', data: [75,70,80,85,90,94], itemStyle: { color: '#3b82f6', borderRadius: [4,4,0,0] }, barWidth: '45%' }
    ]
  });

  // 7. 红海/苏伊士通行状态（相对于危机前正常水平的%）
  initChart('chart-redsea', {
    tooltip: Object.assign({ trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + '%（相对危机前）'; } }, tooltipStyle),
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', name: '%', max: 100, axisLabel: { color: '#5a6a7a', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '苏伊士通行量', type: 'bar', data: [35,32,38,40,42,40,40], itemStyle: { color: '#dc2626', borderRadius: [4,4,0,0] }, barWidth: '45%', markLine: { silent: true, data: [{ yAxis: 60, lineStyle: { color: '#f59e0b', type: 'dashed' }, label: { formatter: '当前水平: ~40%', color: '#f59e0b' } }] } }
    ]
  });

  // 8. 美线空班与运力取消率
  initChart('chart-blank', {
    tooltip: Object.assign({ trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + '%'; } }, tooltipStyle),
    grid: gridDefault,
    xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a' } },
    yAxis: { type: 'value', name: '取消率%', max: 16, axisLabel: { color: '#5a6a7a', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLine: { show: true, lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '运力取消率', type: 'line', data: [12,11,13,10,9,8,7], smooth: true, itemStyle: { color: '#f59e0b' }, lineStyle: { width: 3 }, areaStyle: { color: 'rgba(245,158,11,0.08)' }, markLine: { silent: true, data: [{ yAxis: 10, lineStyle: { color: '#2563eb', type: 'dashed' }, label: { formatter: '上半年均值: 10-14%', color: '#2563eb' } }] } }
    ]
  });

})();

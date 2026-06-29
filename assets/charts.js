(function() {
  'use strict';

  function initChart(domId, option) {
    var el = document.getElementById(domId);
    if (!el) return;
    var chart = echarts.init(el);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  var colors = {
    primary: '#2563eb',
    secondary: '#0ea5e9',
    accent: '#f59e0b',
    danger: '#dc2626',
    success: '#16a34a',
    purple: '#8b5cf6',
    teal: '#14b8a6',
    gray: '#94a3b8'
  };

  // 1. SCFI 走势
  initChart('scfi-chart', {
    title: { text: 'SCFI 综合指数', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['1月W1','1月W3','2月W1','2月W3','3月W1','3月W3','4月W1','4月W3','5月W1','5月W3','6月W1','6月W3','6月W4'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: { type: 'value', min: 1500, axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [{
      name: 'SCFI', type: 'line', smooth: true, data: [2150,2100,1980,2050,2250,2180,2100,1875,2200,2680,2900,3122,3240],
      itemStyle: { color: colors.primary },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.3)' }, { offset: 1, color: 'rgba(37,99,235,0.05)' }] } },
      lineStyle: { width: 3 },
      markPoint: { data: [{ type: 'max', name: '最高' }, { type: 'min', name: '最低' }] }
    }]
  });

  // 2. CCFI 走势
  initChart('ccfi-chart', {
    title: { text: 'CCFI 综合指数', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月中','6月底'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: { type: 'value', min: 1200, axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [{
      name: 'CCFI', type: 'line', smooth: true, data: [1420,1350,1480,1520,1580,1599,1710],
      itemStyle: { color: colors.secondary },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(14,165,233,0.3)' }, { offset: 1, color: 'rgba(14,165,233,0.05)' }] } },
      lineStyle: { width: 3 },
      markPoint: { data: [{ type: 'max', name: '最高' }] }
    }]
  });

  // 3. 美线现货运价走势
  initChart('freight-rate-chart', {
    title: { text: '上海→美西/美东 现货运价（$/FEU）', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['美西', '美东', '宁波-美西(参考)', '宁波-美东(参考)'], bottom: 0, textStyle: { color: '#64748b', fontSize: 11 } },
    grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
    xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月初','5月中','6月初','6月中','6月底(参考)'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '美西', type: 'line', smooth: true, data: [2800,2650,3100,2580,3200,4149,4500,5101,6300], itemStyle: { color: colors.primary }, lineStyle: { width: 3 } },
      { name: '美东', type: 'line', smooth: true, data: [3900,3750,4200,3570,4500,5333,5800,6321,7500], itemStyle: { color: colors.danger }, lineStyle: { width: 3 } },
      { name: '宁波-美西(参考)', type: 'line', smooth: true, lineStyle: { type: 'dashed', width: 2 }, data: [2900,2750,3200,2900,3500,4300,5000,5800,6300], itemStyle: { color: colors.teal } },
      { name: '宁波-美东(参考)', type: 'line', smooth: true, lineStyle: { type: 'dashed', width: 2 }, data: [4000,3850,4300,3900,4600,5500,6200,6800,7500], itemStyle: { color: colors.accent } }
    ]
  });

  // 4. 美国总进口TEU
  initChart('us-import-chart', {
    title: { text: '美国集装箱总进口量（万TEU）', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + '万TEU'; } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月(预测)'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: { type: 'value', min: 180, axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [{
      name: '总进口量', type: 'bar', barWidth: '50%',
      data: [
        { value: 228.5, itemStyle: { color: colors.primary } },
        { value: 198.2, itemStyle: { color: colors.primary } },
        { value: 221.8, itemStyle: { color: colors.primary } },
        { value: 227.8, itemStyle: { color: colors.primary } },
        { value: 242.9, itemStyle: { color: colors.success } },
        { value: 250, itemStyle: { color: colors.gray } }
      ],
      markLine: { data: [{ type: 'average', name: '平均' }], lineStyle: { color: colors.danger, type: 'dashed' } }
    }]
  });

  // 5. 中国份额
  initChart('china-share-chart', {
    title: { text: '中国货量占美国总进口比例', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis', formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' ' + p[0].seriesName + ': ' + p[0].value + '%'; } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月(预测)'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: { type: 'value', min: 20, max: 40, axisLabel: { formatter: '{value}%', color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [{
      name: '中国份额', type: 'line', smooth: true,
      data: [27.3, 26.0, 27.4, 29.9, 33.6, 34.0],
      itemStyle: { color: colors.danger },
      lineStyle: { width: 3 },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(220,38,38,0.3)' }, { offset: 1, color: 'rgba(220,38,38,0.05)' }] } },
      markLine: { data: [{ yAxis: 30, name: '30%线' }], lineStyle: { color: colors.accent, type: 'dashed' }, label: { formatter: '30%基准' } }
    }]
  });

  // 6. 港口吞吐量
  initChart('port-volume-chart', {
    title: { text: '中国主要港口5月吞吐量（万TEU）及同比增速', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['5月吞吐量', '累计同比(%)'], bottom: 0, textStyle: { color: '#64748b', fontSize: 11 } },
    grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
    xAxis: { type: 'category', data: ['上海港', '宁波舟山港', '深圳港', '青岛港', '天津港', '厦门港'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: [
      { type: 'value', name: '万TEU', axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
      { type: 'value', name: '同比%', min: -5, max: 15, axisLabel: { formatter: '{value}%', color: '#64748b' }, splitLine: { show: false } }
    ],
    series: [
      { name: '5月吞吐量', type: 'bar', barWidth: '40%', yAxisIndex: 0, data: [376, 377.9, 209, 210, 180, 110], itemStyle: { color: colors.primary } },
      { name: '累计同比(%)', type: 'line', yAxisIndex: 1, data: [5.2, 9.9, 1.8, 4.5, 2.1, 3.8], itemStyle: { color: colors.accent }, lineStyle: { width: 3 } }
    ]
  });

  // 7. 船公司运价对比
  initChart('carrier-rate-chart', {
    title: { text: '6月线上/参考报价对比（$/FEU）', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['美西报价', '美东报价'], bottom: 0, textStyle: { color: '#64748b', fontSize: 11 } },
    grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
    xAxis: { type: 'category', data: ['HMM', 'ONE', 'MSC(线下)', 'COSCO', 'Maersk', 'Yang Ming', 'Wan Hai', 'Evergreen'], axisLabel: { color: '#64748b', fontSize: 11, rotate: 20 } },
    yAxis: { type: 'value', axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [
      { name: '美西报价', type: 'bar', barWidth: '35%', data: [3928, 4006, 4240, 4500, 4670, 4600, 4500, 4700], itemStyle: { color: colors.primary } },
      { name: '美东报价', type: 'bar', barWidth: '35%', data: [4800, 5100, 5300, 5600, 5800, 5700, 5500, 5800], itemStyle: { color: colors.danger } }
    ]
  });

  // 8. 预测图表
  initChart('forecast-chart', {
    title: { text: 'SCFI与美中进口量趋势预测（2026H2）', left: 'center', textStyle: { fontSize: 14, color: '#0f172a' } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['SCFI实际', 'SCFI预测', '美自华进口(万TEU)', '美自华进口预测'], bottom: 0, textStyle: { color: '#64748b', fontSize: 11 } },
    grid: { left: '3%', right: '4%', bottom: '14%', containLabel: true },
    xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月','7月(E)','8月(E)','9月(E)','10月(E)','11月(E)','12月(E)'], axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: [
      { type: 'value', name: 'SCFI', position: 'left', axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
      { type: 'value', name: '万TEU', position: 'right', axisLabel: { color: '#64748b' }, splitLine: { show: false } }
    ],
    series: [
      { name: 'SCFI实际', type: 'line', yAxisIndex: 0, data: [2150,1980,2250,1875,2680,3240,null,null,null,null,null,null], itemStyle: { color: colors.primary }, lineStyle: { width: 3 } },
      { name: 'SCFI预测', type: 'line', yAxisIndex: 0, data: [null,null,null,null,null,null,3100,2800,2500,2200,2100,2300], itemStyle: { color: colors.gray }, lineStyle: { type: 'dashed', width: 3 } },
      { name: '美自华进口(万TEU)', type: 'bar', yAxisIndex: 1, barWidth: '30%', data: [62.3,51.5,60.8,68.1,81.62,null,null,null,null,null,null,null], itemStyle: { color: colors.success } },
      { name: '美自华进口预测', type: 'bar', yAxisIndex: 1, barWidth: '30%', data: [null,null,null,null,null,null,85,90,82,75,70,78], itemStyle: { color: colors.teal } }
    ]
  });
})();

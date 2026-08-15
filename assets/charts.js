(function() {
  'use strict';

  // ============ 通用工具函数 ============
  function getTooltip() {
    return {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332', fontSize: 12 },
      axisPointer: { type: 'cross', crossStyle: { color: '#999' } }
    };
  }

  function getGrid(overrides) {
    return Object.assign({ left: 55, right: 25, top: 35, bottom: 45, containLabel: false }, overrides || {});
  }

  // 日期标签 - 周度数据（SCFI发布日附近的周五/周六）
  var scfiWeeks = [
    '1/3','1/10','1/17','1/24','1/31',
    '2/7','2/14','2/21','2/28',
    '3/7','3/14','3/21','3/28',
    '4/4','4/11','4/18','4/25',
    '5/2','5/9','5/16','5/23','5/30',
    '6/6','6/13','6/20','6/27',
    '7/4','7/11','7/18','7/25',
    '8/1','8/8','8/15'
  ];

  var ccfiWeeks = scfiWeeks;

  // SCFI 综合指数周度数据
  var scfiValues = [
    2250, 2310, 2380, 2420, 2350,
    2180, 2120, 2150, 2200,
    2280, 2320, 2350, 2400,
    2450, 2480, 2520, 2580,
    2680, 2750, 2820, 2850, 2900,
    2980, 3050, 3120, 3150,
    3205, 3230, 3206, 3100,
    3206, 3276, 3355
  ];

  // CCFI 综合指数周度数据
  var ccfiValues = [
    1480, 1505, 1520, 1530, 1510,
    1450, 1420, 1430, 1440,
    1470, 1490, 1500, 1520,
    1550, 1570, 1580, 1600,
    1650, 1680, 1720, 1740, 1760,
    1780, 1800, 1810, 1820,
    1835, 1842, 1840, 1830,
    1840, 1840, 1847
  ];

  // ============ 1. SCFI 综合指数走势 ============
  (function() {
    var dom = document.getElementById('chart-scfi');
    if (!dom) return;
    var chart = echarts.init(dom);
    var option = {
      tooltip: getTooltip(),
      grid: getGrid({ right: 30 }),
      xAxis: { type: 'category', data: scfiWeeks, axisLabel: { fontSize: 10, color: '#718096', rotate: 45 }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      yAxis: { type: 'value', name: 'SCFI 指数', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { lineStyle: { color: '#f0f0f0' } }, min: 1800 },
      series: [{
        name: 'SCFI', type: 'line', data: scfiValues,
        smooth: true, symbol: 'circle', symbolSize: 4,
        lineStyle: { color: '#3182ce', width: 2.5 },
        itemStyle: { color: '#3182ce' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(49,130,206,0.25)' },
          { offset: 1, color: 'rgba(49,130,206,0.02)' }
        ])},
        markLine: { silent: true, symbol: 'none', lineStyle: { type: 'dashed', color: '#e53e3e', width: 1 }, label: { fontSize: 10, color: '#e53e3e', formatter: '年内高点 {c}' }, data: [{ yAxis: 3355.24 }] }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  })();

  // ============ 2. CCFI 综合指数走势 ============
  (function() {
    var dom = document.getElementById('chart-ccfi');
    if (!dom) return;
    var chart = echarts.init(dom);
    var option = {
      tooltip: getTooltip(),
      grid: getGrid({ right: 30 }),
      xAxis: { type: 'category', data: ccfiWeeks, axisLabel: { fontSize: 10, color: '#718096', rotate: 45 }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      yAxis: { type: 'value', name: 'CCFI 指数', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { lineStyle: { color: '#f0f0f0' } }, min: 1300 },
      series: [{
        name: 'CCFI', type: 'line', data: ccfiValues,
        smooth: true, symbol: 'circle', symbolSize: 4,
        lineStyle: { color: '#38a169', width: 2.5 },
        itemStyle: { color: '#38a169' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(56,161,105,0.2)' },
          { offset: 1, color: 'rgba(56,161,105,0.02)' }
        ])}
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  })();

  // ============ 3. 上海至美西/美东现货运价 ============
  (function() {
    var dom = document.getElementById('chart-spot');
    if (!dom) return;
    var chart = echarts.init(dom);
    var option = {
      tooltip: getTooltip(),
      grid: getGrid({ right: 55 }),
      legend: { data: ['美西 (USWC)', '美东 (USEC)'], top: 5, textStyle: { fontSize: 11, color: '#4a5568' } },
      xAxis: { type: 'category', data: scfiWeeks, axisLabel: { fontSize: 10, color: '#718096', rotate: 45 }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      yAxis: { type: 'value', name: 'USD/FEU', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { lineStyle: { color: '#f0f0f0' } }, min: 3000 },
      series: [{
        name: '美西 (USWC)', type: 'line',
        data: [4200,4350,4500,4700,4850, 4400,4100,4200,4300, 4450,4550,4650,4800, 4900,4950,5100,5300, 5450,5600,5700,5800,5900, 5950,6100,6200,6229, 6250,6230,6100,6000, 6229,6484,6714],
        smooth: true, symbol: 'circle', symbolSize: 4,
        lineStyle: { color: '#3182ce', width: 2.5 },
        itemStyle: { color: '#3182ce' }
      }, {
        name: '美东 (USEC)', type: 'line',
        data: [5900,6100,6300,6500,6820, 6200,5900,6000,6100, 6250,6450,6600,6800, 7000,7100,7300,7550, 7700,7900,8100,8250,8400, 8450,8600,8800,8900, 9054,8980,8800,8600, 9054,9290,9568],
        smooth: true, symbol: 'circle', symbolSize: 4,
        lineStyle: { color: '#e53e3e', width: 2.5 },
        itemStyle: { color: '#e53e3e' }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  })();

  // ============ 4. 美国自中国进口TEU及中国份额 ============
  (function() {
    var dom = document.getElementById('chart-import');
    if (!dom) return;
    var chart = echarts.init(dom);
    var months = ['1月','2月','3月','4月','5月','6月','7月'];
    var cnTeu = [931000, 615000, 720000, 790000, 830000, 814000, 873129];
    var share = [39.7, 32.5, 34.0, 34.6, 35.3, 33.9, 34.8];
    var option = {
      tooltip: getTooltip(),
      grid: getGrid({ right: 50 }),
      legend: { data: ['自中国进口 (TEU)', '中国份额 (%)'], top: 5, textStyle: { fontSize: 11, color: '#4a5568' } },
      xAxis: { type: 'category', data: months, axisLabel: { fontSize: 11, color: '#718096' }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      yAxis: [
        { type: 'value', name: 'TEU', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096', formatter: function(v) { return (v/10000).toFixed(0) + '万'; } }, splitLine: { lineStyle: { color: '#f0f0f0' } }, min: 400000 },
        { type: 'value', name: '%', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096', formatter: '{value}%' }, splitLine: { show: false }, min: 25, max: 45 }
      ],
      series: [{
        name: '自中国进口 (TEU)', type: 'bar', data: cnTeu,
        barWidth: '40%',
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#63b3ed' }, { offset: 1, color: '#3182ce' }]), borderRadius: [4,4,0,0] },
        label: { show: true, position: 'top', fontSize: 10, color: '#4a5568', formatter: function(p) { return (p.value/10000).toFixed(1) + '万'; } }
      }, {
        name: '中国份额 (%)', type: 'line', yAxisIndex: 1, data: share,
        smooth: true, symbol: 'diamond', symbolSize: 8,
        lineStyle: { color: '#dd6b20', width: 2.5 },
        itemStyle: { color: '#dd6b20' },
        label: { show: true, fontSize: 10, color: '#dd6b20', formatter: '{c}%' }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  })();

  // ============ 5. SCFI 美西 vs 美东运价走势（月度均值） ============
  (function() {
    var dom = document.getElementById('chart-us-routes');
    if (!dom) return;
    var chart = echarts.init(dom);
    var months2 = ['1月','2月','3月','4月','5月','6月','7月','8月*'];
    var uswcMonthly = [4850, 4200, 4450, 4800, 5350, 5950, 6200, 6700];
    var usecMonthly = [6820, 6100, 6450, 6900, 7600, 8400, 8900, 9430];
    var option = {
      tooltip: getTooltip(),
      grid: getGrid({ right: 50 }),
      legend: { data: ['美西均值', '美东均值', '美东-美西价差'], top: 5, textStyle: { fontSize: 11, color: '#4a5568' } },
      xAxis: { type: 'category', data: months2, axisLabel: { fontSize: 11, color: '#718096' }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      yAxis: [
        { type: 'value', name: 'USD/FEU', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { lineStyle: { color: '#f0f0f0' } }, min: 3000 },
        { type: 'value', name: 'USD/FEU', nameTextStyle: { fontSize: 11, color: '#718096' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { show: false }, min: 1500 }
      ],
      series: [{
        name: '美西均值', type: 'bar', data: uswcMonthly,
        barWidth: '30%', barGap: '20%',
        itemStyle: { color: '#3182ce', borderRadius: [4,4,0,0] }
      }, {
        name: '美东均值', type: 'bar', data: usecMonthly,
        barWidth: '30%',
        itemStyle: { color: '#e53e3e', borderRadius: [4,4,0,0] }
      }, {
        name: '美东-美西价差', type: 'line', yAxisIndex: 1,
        data: [1970, 1900, 2000, 2100, 2250, 2450, 2700, 2730],
        smooth: true, symbol: 'triangle', symbolSize: 8,
        lineStyle: { color: '#dd6b20', width: 2, type: 'dashed' },
        itemStyle: { color: '#dd6b20' },
        label: { show: true, fontSize: 10, color: '#dd6b20', formatter: '${c}' }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  })();

  // ============ 6. Drewry WCI vs SCFI 对比 ============
  (function() {
    var dom = document.getElementById('chart-wci-vs-scfi');
    if (!dom) return;
    var chart = echarts.init(dom);
    var months3 = ['1月','2月','3月','4月','5月','6月','7月','8月'];
    var wciMonthly = [3800, 3500, 3700, 3900, 4100, 4250, 4300, 4339];
    var scfiMonthly = [2380, 2150, 2320, 2450, 2780, 3050, 3180, 3315];
    var option = {
      tooltip: getTooltip(),
      grid: getGrid({ right: 55 }),
      legend: { data: ['Drewry WCI', 'SCFI'], top: 5, textStyle: { fontSize: 11, color: '#4a5568' } },
      xAxis: { type: 'category', data: months3, axisLabel: { fontSize: 11, color: '#718096' }, axisLine: { lineStyle: { color: '#e2e8f0' } } },
      yAxis: [
        { type: 'value', name: 'WCI ($/FEU)', nameTextStyle: { fontSize: 11, color: '#dd6b20' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { lineStyle: { color: '#f0f0f0' } }, min: 3000 },
        { type: 'value', name: 'SCFI (指数)', nameTextStyle: { fontSize: 11, color: '#3182ce' }, axisLabel: { fontSize: 10, color: '#718096' }, splitLine: { show: false }, min: 1500 }
      ],
      series: [{
        name: 'Drewry WCI', type: 'line', data: wciMonthly,
        smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#dd6b20', width: 2.5 },
        itemStyle: { color: '#dd6b20' },
        label: { show: true, fontSize: 10, color: '#dd6b20', formatter: '${c}' }
      }, {
        name: 'SCFI', type: 'line', yAxisIndex: 1, data: scfiMonthly,
        smooth: true, symbol: 'diamond', symbolSize: 6,
        lineStyle: { color: '#3182ce', width: 2.5 },
        itemStyle: { color: '#3182ce' },
        label: { show: true, fontSize: 10, color: '#3182ce', formatter: '{c}' }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  })();

})();
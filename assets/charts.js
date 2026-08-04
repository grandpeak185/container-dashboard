(function() {
  'use strict';

  var themeColors = ['#2563eb', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  var tooltipOpt = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08);'
  };

  var gridOpt = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  // 1. SCFI / CCFI 综合指数走势
  var indexDates = ['1月3日','1月10日','1月17日','1月24日','1月31日','2月7日','2月14日','2月21日','2月28日','3月7日','3月14日','3月21日','3月28日','4月4日','4月11日','4月18日','4月25日','5月2日','5月9日','5月16日','5月23日','5月30日','6月6日','6月13日','6月20日','6月27日','7月4日','7月11日','7月18日','7月25日','8月1日'];
  var scfiData = [2189,2205,2150,2080,2120,2050,1980,1920,1950,2100,2250,2350,2450,2600,2700,2800,2920,2850,2900,2950,3020,3080,3120,3150,3100,3080,3184,3050,3080,3063,3206];
  var ccfiData = [1412,1420,1405,1380,1395,1360,1320,1280,1300,1380,1420,1450,1480,1520,1580,1620,1680,1720,1740,1760,1780,1800,1850,1880,1900,1920,1890,1880,1910,1901,1857];

  initChart('chart-index', {
    color: [themeColors[0], themeColors[2]],
    tooltip: tooltipOpt,
    legend: { data: ['SCFI综合指数', 'CCFI综合指数'], top: 0, textStyle: { color: '#5a6a7a', fontSize: 12 } },
    grid: gridOpt,
    xAxis: { type: 'category', data: indexDates, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a', fontSize: 11, rotate: 45, interval: 3 } },
    yAxis: [
      { type: 'value', name: 'SCFI', nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
      { type: 'value', name: 'CCFI', nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: '#5a6a7a', fontSize: 11 } }
    ],
    series: [
      { name: 'SCFI综合指数', type: 'line', data: scfiData, smooth: true, symbol: 'none', lineStyle: { width: 2.5 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.15)' }, { offset: 1, color: 'rgba(37,99,235,0.01)' }] } } },
      { name: 'CCFI综合指数', type: 'line', yAxisIndex: 1, data: ccfiData, smooth: true, symbol: 'none', lineStyle: { width: 2.5 } }
    ]
  });

  // 2. 上海→美西/美东 现货运价
  var freightDates = ['1月3日','1月10日','1月17日','1月24日','1月31日','2月7日','2月14日','2月21日','2月28日','3月7日','3月14日','3月21日','3月28日','4月4日','4月11日','4月18日','4月25日','5月2日','5月9日','5月16日','5月23日','5月30日','6月6日','6月13日','6月20日','6月27日','7月4日','7月11日','7月18日','7月25日','8月1日'];
  var uswcData = [3850,3920,3800,3750,3900,3500,3400,3350,3450,3800,4000,4150,4300,4500,4700,4900,5100,5000,5200,5300,5400,5500,5550,5600,5450,5350,5800,5500,5700,5535,6229];
  var usecData = [5600,5750,5500,5400,5550,5100,4950,4900,5050,5500,5800,6100,6350,6700,7000,7200,7500,7400,7700,7850,8000,8100,8050,8200,8100,8040,8850,8950,8800,8040,9054];

  initChart('chart-freight', {
    color: [themeColors[0], themeColors[3]],
    tooltip: tooltipOpt,
    legend: { data: ['上海→美西', '上海→美东'], top: 0, textStyle: { color: '#5a6a7a', fontSize: 12 } },
    grid: gridOpt,
    xAxis: { type: 'category', data: freightDates, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a', fontSize: 11, rotate: 45, interval: 3 } },
    yAxis: { type: 'value', name: '美元/FEU', nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
    series: [
      { name: '上海→美西', type: 'line', data: uswcData, smooth: true, symbol: 'none', lineStyle: { width: 2.5 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.12)' }, { offset: 1, color: 'rgba(37,99,235,0.01)' }] } } },
      { name: '上海→美东', type: 'line', data: usecData, smooth: true, symbol: 'none', lineStyle: { width: 2.5 } }
    ]
  });

  // 3. 美国月度集装箱进口量（百万TEU）
  var monthLabels = ['1月','2月','3月','4月','5月','6月','7月','8月(预测)'];
  var usImportData = [1.98, 1.75, 2.10, 2.28, 2.43, null, 2.47, 2.38];
  var chinaImportData = [0.685, 0.582, 0.728, 0.681, 0.816, null, null, null];

  initChart('chart-us-import', {
    color: [themeColors[0], themeColors[4]],
    tooltip: tooltipOpt,
    legend: { data: ['美国总进口', '美国自华进口'], top: 0, textStyle: { color: '#5a6a7a', fontSize: 12 } },
    grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
    xAxis: { type: 'category', data: monthLabels, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
    yAxis: [
      { type: 'value', name: '百万TEU', nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
      { type: 'value', name: '百万TEU', nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: '#5a6a7a', fontSize: 11 } }
    ],
    series: [
      { name: '美国总进口', type: 'bar', data: usImportData, barWidth: '35%', itemStyle: { borderRadius: [4, 4, 0, 0] } },
      { name: '美国自华进口', type: 'line', yAxisIndex: 1, data: chinaImportData, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2.5 } }
    ]
  });

  // 4. 中国占美国集装箱进口份额
  var shareMonths = ['1月','2月','3月','4月','5月','6月','7月'];
  var shareData = [34.6, 33.3, 34.7, 29.9, 33.6, null, null];

  initChart('chart-share', {
    color: [themeColors[0]],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1a2332', fontSize: 12 },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08);',
      formatter: function(params) {
        var p = params[0];
        if (p.value == null) return p.name + '<br/>月度完整数据待发布';
        return p.name + '<br/>中国份额: ' + p.value + '%';
      }
    },
    grid: gridOpt,
    xAxis: { type: 'category', data: shareMonths, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
    yAxis: { type: 'value', name: '%', min: 20, max: 40, nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#5a6a7a', fontSize: 11, formatter: '{value}%' } },
    series: [
      { name: '中国份额', type: 'line', data: shareData, smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.2)' }, { offset: 1, color: 'rgba(37,99,235,0.02)' }] } },
      { name: '基准线', type: 'line', data: [30,30,30,30,30,30,30], symbol: 'none', lineStyle: { type: 'dashed', color: '#cbd5e1', width: 1.5 }, tooltip: { show: false } }
    ]
  });

  // 5. 美西主要港口船舶等泊时间（天）
  var portNames = ['洛杉矶 LA', '长滩 LB', '奥克兰', '西雅图'];
  var delayCurrent = [6.5, 5.8, 4.2, 3.5];
  var delayPeak = [10.0, 8.5, 6.5, 5.0];
  var delayNormal = [2.5, 2.5, 1.8, 1.5];

  initChart('chart-port-delay', {
    color: [themeColors[4], themeColors[3], themeColors[2]],
    tooltip: tooltipOpt,
    legend: { data: ['当前等泊', '高峰期', '正常水平'], top: 0, textStyle: { color: '#5a6a7a', fontSize: 12 } },
    grid: gridOpt,
    xAxis: { type: 'category', data: portNames, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
    yAxis: { type: 'value', name: '天', nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
    series: [
      { name: '当前等泊', type: 'bar', data: delayCurrent, barWidth: '22%', itemStyle: { borderRadius: [3, 3, 0, 0] } },
      { name: '高峰期', type: 'bar', data: delayPeak, barWidth: '22%', itemStyle: { borderRadius: [3, 3, 0, 0] } },
      { name: '正常水平', type: 'bar', data: delayNormal, barWidth: '22%', itemStyle: { borderRadius: [3, 3, 0, 0] } }
    ]
  });

  // 6. 堆场利用率与空班率
  var weeks = ['1月','2月','3月','4月','5月','6月','7月','8月初'];
  var yardUtil = [75, 78, 82, 85, 88, 90, 91, 91];
  var blankRate = [8, 9, 10, 11, 12, 13, 13, 12];

  initChart('chart-yard', {
    color: [themeColors[4], themeColors[0]],
    tooltip: tooltipOpt,
    legend: { data: ['堆场利用率(%)', '空班率(%)'], top: 0, textStyle: { color: '#5a6a7a', fontSize: 12 } },
    grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
    xAxis: { type: 'category', data: weeks, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisLabel: { color: '#5a6a7a', fontSize: 11 } },
    yAxis: [
      { type: 'value', name: '利用率%', max: 100, nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { color: '#5a6a7a', fontSize: 11, formatter: '{value}%' } },
      { type: 'value', name: '空班率%', max: 20, nameTextStyle: { color: '#5a6a7a', fontSize: 11 }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: '#5a6a7a', fontSize: 11, formatter: '{value}%' } }
    ],
    series: [
      { name: '堆场利用率(%)', type: 'line', data: yardUtil, smooth: true, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2.5 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(239,68,68,0.12)' }, { offset: 1, color: 'rgba(239,68,68,0.01)' }] } } },
      { name: '空班率(%)', type: 'bar', yAxisIndex: 1, data: blankRate, barWidth: '30%', itemStyle: { borderRadius: [3, 3, 0, 0] } }
    ]
  });

})();

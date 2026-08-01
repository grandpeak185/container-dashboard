(function() {
  'use strict';

  var tooltipBase = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    axisPointer: { type: 'line', lineStyle: { color: '#cbd5e1' } }
  };

  var gridBase = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  // SCFI 综合指数走势（2026年1月至今，周度近似数据）
  var scfiDates = [
    '1/3','1/10','1/17','1/24','1/31',
    '2/7','2/14','2/21','2/28',
    '3/7','3/14','3/21','3/28',
    '4/4','4/11','4/18','4/25',
    '5/2','5/9','5/16','5/23','5/30',
    '6/6','6/13','6/20','6/27',
    '7/4','7/11','7/18','7/25','8/1'
  ];
  var scfiValues = [
    2380,2410,2450,2420,2480,
    2510,2550,2520,2580,
    2650,2700,2680,2750,
    2800,2780,2850,2820,
    2900,2950,3020,3100,3150,
    3200,3250,3300,3320,
    3327,3185,3080,3063,3206
  ];

  var scfiChart = echarts.init(document.getElementById('chart-scfi'));
  scfiChart.setOption({
    tooltip: tooltipBase,
    grid: gridBase,
    xAxis: {
      type: 'category',
      data: scfiDates,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#5a6a7a', fontSize: 11, rotate: 45 }
    },
    yAxis: {
      type: 'value',
      min: 2000,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6a7a', fontSize: 11 }
    },
    series: [{
      name: 'SCFI综合指数',
      type: 'line',
      data: scfiValues,
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: '#2563eb', width: 2.5 },
      itemStyle: { color: '#2563eb', borderColor: '#fff', borderWidth: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0,0,0,1,[
          { offset: 0, color: 'rgba(37,99,235,0.15)' },
          { offset: 1, color: 'rgba(37,99,235,0.02)' }
        ])
      }
    }]
  });

  // 美西 / 美东现货运价走势（美元/FEU，周度近似数据）
  var freightDates = [
    '1/3','1/17','1/31',
    '2/14','2/28',
    '3/14','3/28',
    '4/11','4/25',
    '5/9','5/23',
    '6/6','6/20',
    '7/4','7/18','8/1'
  ];
  var freightWest = [
    3200,3250,3300,
    3350,3400,
    3450,3500,
    3600,3800,
    4200,4800,
    5500,6200,
    6800,5800,5535
  ];
  var freightEast = [
    4500,4600,4700,
    4800,4900,
    5000,5100,
    5300,5600,
    6200,7000,
    7800,8500,
    9000,8300,8172
  ];

  var freightChart = echarts.init(document.getElementById('chart-freight'));
  freightChart.setOption({
    tooltip: tooltipBase,
    legend: {
      data: ['美西', '美东'],
      top: 0,
      textStyle: { color: '#5a6a7a', fontSize: 11 }
    },
    grid: gridBase,
    xAxis: {
      type: 'category',
      data: freightDates,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#5a6a7a', fontSize: 11, rotate: 45 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#5a6a7a', fontSize: 11, formatter: '${value}' }
    },
    series: [
      {
        name: '美西',
        type: 'line',
        data: freightWest,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#0ea5e9', width: 2.5 },
        itemStyle: { color: '#0ea5e9', borderColor: '#fff', borderWidth: 2 }
      },
      {
        name: '美东',
        type: 'line',
        data: freightEast,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#f59e0b', width: 2.5 },
        itemStyle: { color: '#f59e0b', borderColor: '#fff', borderWidth: 2 }
      }
    ]
  });

  // 美国自中国进口 TEU 及中国份额走势（月度数据）
  var monthLabels = ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'];
  var importTEU = [null, null, null, 680778, 816197, null, null];
  var sharePct = [null, null, null, 29.0, 33.6, null, null];

  var importChart = echarts.init(document.getElementById('chart-us-import'));
  importChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var res = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          if (p.value != null) {
            var val = p.seriesName === '中国份额' ? p.value + '%' : p.value.toLocaleString();
            res += p.marker + ' ' + p.seriesName + '：' + val + '<br/>';
          } else {
            res += p.marker + ' ' + p.seriesName + '：待发布<br/>';
          }
        });
        return res;
      }
    },
    legend: {
      data: ['美自华进口TEU', '中国份额'],
      top: 0,
      textStyle: { color: '#5a6a7a', fontSize: 11 }
    },
    grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: monthLabels,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#5a6a7a', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'TEU',
        nameTextStyle: { color: '#5a6a7a', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#5a6a7a', fontSize: 11 }
      },
      {
        type: 'value',
        name: '份额%',
        min: 20,
        max: 40,
        nameTextStyle: { color: '#5a6a7a', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#5a6a7a', fontSize: 11, formatter: '{value}%' }
      }
    ],
    series: [
      {
        name: '美自华进口TEU',
        type: 'bar',
        data: importTEU,
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#1d4ed8' }
          ]),
          borderRadius: [4,4,0,0]
        }
      },
      {
        name: '中国份额',
        type: 'line',
        yAxisIndex: 1,
        data: sharePct,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#f97316', width: 2.5 },
        itemStyle: { color: '#f97316', borderColor: '#fff', borderWidth: 2 }
      }
    ]
  });

  window.addEventListener('resize', function() {
    scfiChart.resize();
    freightChart.resize();
    importChart.resize();
  });
})();

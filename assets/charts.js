(function() {
  'use strict';

  var colorPrimary = '#2563eb';
  var colorAccent = '#0ea5e9';
  var colorSuccess = '#10b981';
  var colorWarning = '#f59e0b';
  var colorDanger = '#ef4444';
  var colorText = '#1e293b';
  var colorTextSecondary = '#64748b';
  var colorGrid = '#e2e8f0';

  function initChart(domId, option) {
    var el = document.getElementById(domId);
    if (!el) return;
    var chart = echarts.init(el);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  // Chart 1: SCFI / CCFI trend
  initChart('chart-scfi', {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['SCFI', 'CCFI'], bottom: 0, textStyle: { color: colorTextSecondary } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月初','1月中','1月底','2月初','2月中','2月底','3月初','3月中','3月底','4月初','4月中','4月底','5月初','5月中','5月底','6月初','6月中','6月底(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary }
    },
    series: [
      {
        name: 'SCFI',
        type: 'line',
        smooth: true,
        data: [1647,1574,1458,1317,1280,1251,1380,1420,1458,1620,1780,1875,2146,2218,2350,2572,3122,3350],
        lineStyle: { width: 3, color: colorPrimary },
        itemStyle: { color: colorPrimary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(37,99,235,0.25)'},{offset:1,color:'rgba(37,99,235,0.02)'}])
        },
        markPoint: {
          data: [
            { type: 'max', name: '最高', label: { formatter: '{c}' } }
          ]
        }
      },
      {
        name: 'CCFI',
        type: 'line',
        smooth: true,
        data: [1380,1350,1320,1280,1260,1240,1280,1300,1320,1380,1420,1450,1480,1500,1520,1550,1599,1650],
        lineStyle: { width: 3, color: colorSuccess },
        itemStyle: { color: colorSuccess }
      }
    ]
  });

  // Chart 2: Freight rates USWC / USEC
  initChart('chart-freight', {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['美西 $/FEU', '美东 $/FEU'], bottom: 0, textStyle: { color: colorTextSecondary } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月','2月','3月','4月','5月','6月初','6月中','6月底(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary, formatter: '${value}' }
    },
    series: [
      {
        name: '美西 $/FEU',
        type: 'line',
        smooth: true,
        data: [2800,2600,2900,3400,4600,5100,5683,6200],
        lineStyle: { width: 3, color: colorPrimary },
        itemStyle: { color: colorPrimary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(37,99,235,0.2)'},{offset:1,color:'rgba(37,99,235,0.02)'}])
        }
      },
      {
        name: '美东 $/FEU',
        type: 'line',
        smooth: true,
        data: [3600,3400,3700,4200,5400,5800,6873,7500],
        lineStyle: { width: 3, color: colorDanger },
        itemStyle: { color: colorDanger }
      }
    ]
  });

  // Chart 3: US monthly imports
  initChart('chart-imports', {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['美国总进口TEU', '自中国进口TEU(估)'], bottom: 0, textStyle: { color: colorTextSecondary } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary, formatter: function(v){ return (v/10000).toFixed(0)+'万'; } }
    },
    series: [
      {
        name: '美国总进口TEU',
        type: 'bar',
        data: [2130000,2090000,2353600,2277965,2428758,2550000],
        itemStyle: { color: colorPrimary, borderRadius: [4,4,0,0] }
      },
      {
        name: '自中国进口TEU(估)',
        type: 'bar',
        data: [680000,620000,720000,680000,814000,870000],
        itemStyle: { color: colorAccent, borderRadius: [4,4,0,0] }
      }
    ]
  });

  // Chart 4: China share
  initChart('chart-share', {
    tooltip: { trigger: 'axis' },
    legend: { data: ['洛杉矶港中国份额(%)', '美国整体中国份额(估%)'], bottom: 0, textStyle: { color: colorTextSecondary } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2020','2021','2022','2023','2024','2025','2026(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary }
    },
    yAxis: {
      type: 'value',
      min: 20,
      max: 70,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary, formatter: '{value}%' }
    },
    series: [
      {
        name: '洛杉矶港中国份额(%)',
        type: 'line',
        data: [61,58,52,48,46,53.4,40],
        lineStyle: { width: 3, color: colorDanger },
        itemStyle: { color: colorDanger },
        markPoint: { data: [{ coord: ['2026(预)', 40], value: '40%', itemStyle: { color: colorDanger } }] }
      },
      {
        name: '美国整体中国份额(估%)',
        type: 'line',
        data: [42,40,38,35,33,36,32],
        lineStyle: { width: 3, color: colorWarning, type: 'dashed' },
        itemStyle: { color: colorWarning }
      }
    ]
  });

  // Chart 5: Port congestion
  initChart('chart-congestion', {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['洛杉矶LA','长滩LB','奥克兰Oak','纽约NY/NJ','萨凡纳SAV','西雅图SEA','塔科马Tacoma'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary, fontSize: 11, rotate: 15 }
    },
    yAxis: {
      type: 'value',
      max: 10,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary, formatter: '{value}' }
    },
    series: [
      {
        name: '拥堵指数(1-10)',
        type: 'bar',
        data: [
          { value: 8, itemStyle: { color: colorDanger } },
          { value: 7, itemStyle: { color: colorDanger } },
          { value: 6, itemStyle: { color: colorWarning } },
          { value: 5, itemStyle: { color: colorWarning } },
          { value: 6, itemStyle: { color: colorWarning } },
          { value: 4, itemStyle: { color: colorSuccess } },
          { value: 4, itemStyle: { color: colorSuccess } }
        ],
        barWidth: '50%',
        label: { show: true, position: 'top', formatter: '{c}', color: colorTextSecondary }
      }
    ]
  });

  // Chart 6: Blank sailings / capacity
  initChart('chart-blank', {
    tooltip: { trigger: 'axis' },
    legend: { data: ['计划运力(万TEU)', '实际投放(万TEU)', '空班数'], bottom: 0, textStyle: { color: colorTextSecondary } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary }
    },
    yAxis: [
      {
        type: 'value',
        name: '运力(万TEU)',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
        axisLabel: { color: colorTextSecondary }
      },
      {
        type: 'value',
        name: '空班数',
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: colorTextSecondary }
      }
    ],
    series: [
      {
        name: '计划运力(万TEU)',
        type: 'bar',
        data: [48,45,50,49,51,52],
        itemStyle: { color: 'rgba(37,99,235,0.3)', borderRadius: [4,4,0,0] },
        barGap: '-100%'
      },
      {
        name: '实际投放(万TEU)',
        type: 'bar',
        data: [44,40,46,43,45,44],
        itemStyle: { color: colorPrimary, borderRadius: [4,4,0,0] }
      },
      {
        name: '空班数',
        type: 'line',
        yAxisIndex: 1,
        data: [12,18,14,16,15,20],
        lineStyle: { width: 2, color: colorDanger },
        itemStyle: { color: colorDanger },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  });

  // Chart 7: Forecast
  initChart('chart-forecast', {
    tooltip: { trigger: 'axis' },
    legend: { data: ['实际SCFI', '预测SCFI'], bottom: 0, textStyle: { color: colorTextSecondary } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['3月','4月','5月','6月','7月(预)','8月(预)','9月(预)','10月(预)'],
      axisLine: { lineStyle: { color: colorGrid } },
      axisLabel: { color: colorTextSecondary }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: colorGrid, type: 'dashed' } },
      axisLabel: { color: colorTextSecondary }
    },
    series: [
      {
        name: '实际SCFI',
        type: 'line',
        data: [1450,1875,2200,3122,null,null,null,null],
        lineStyle: { width: 3, color: colorPrimary },
        itemStyle: { color: colorPrimary },
        connectNulls: false
      },
      {
        name: '预测SCFI',
        type: 'line',
        smooth: true,
        data: [null,null,null,3122,3400,2900,2500,2300],
        lineStyle: { width: 3, color: colorWarning, type: 'dashed' },
        itemStyle: { color: colorWarning },
        connectNulls: false
      }
    ]
  });

})();

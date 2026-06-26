(function() {
  'use strict';

  function initCharts() {
    var chartIndex = echarts.init(document.getElementById('chartIndex'));
    var chartFreight = echarts.init(document.getElementById('chartFreight'));
    var chartUsImport = echarts.init(document.getElementById('chartUsImport'));

    var weeks = [
      '2026-01-10','2026-01-17','2026-01-24','2026-01-31',
      '2026-02-07','2026-02-14','2026-02-21','2026-02-28',
      '2026-03-07','2026-03-14','2026-03-21','2026-03-28',
      '2026-04-04','2026-04-11','2026-04-18','2026-04-25',
      '2026-05-02','2026-05-09','2026-05-16','2026-05-23','2026-05-30',
      '2026-06-06','2026-06-13','2026-06-20'
    ];

    // SCFI 综合指数（周度，基于公开数据与趋势）
    var scfiData = [
      2150, 2120, 2080, 2050,
      1980, 1950, 1920, 1880,
      2050, 2020, 1980, 1950,
      1920, 1890, 1875, 1875,
      1980, 2100, 2218, 2550, 2726,
      2985, 3122, 3122
    ];

    // CCFI 综合指数（周度，基于公开数据与趋势）
    var ccfiData = [
      1180, 1170, 1160, 1150,
      1120, 1110, 1100, 1090,
      1140, 1130, 1120, 1110,
      1150, 1180, 1200, 1222,
      1280, 1350, 1420, 1480, 1520,
      1560, 1599, 1599
    ];

    var optionIndex = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['SCFI', 'CCFI'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: weeks, axisLabel: { rotate: 30, fontSize: 10 } },
      yAxis: [
        { type: 'value', name: 'SCFI', position: 'left', axisLine: { lineStyle: { color: '#2563eb' } }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
        { type: 'value', name: 'CCFI', position: 'right', axisLine: { lineStyle: { color: '#16a34a' } }, splitLine: { show: false } }
      ],
      series: [
        { name: 'SCFI', type: 'line', smooth: true, yAxisIndex: 0, data: scfiData, itemStyle: { color: '#2563eb' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(37,99,235,0.2)'},{offset:1,color:'rgba(37,99,235,0)'}]) } },
        { name: 'CCFI', type: 'line', smooth: true, yAxisIndex: 1, data: ccfiData, itemStyle: { color: '#16a34a' }, lineStyle: { type: 'dashed' } }
      ]
    };

    var freightWeeks = [
      '2026-01-10','2026-01-17','2026-01-24','2026-01-31',
      '2026-02-07','2026-02-14','2026-02-21','2026-02-28',
      '2026-03-07','2026-03-14','2026-03-21','2026-03-28',
      '2026-04-04','2026-04-11','2026-04-18','2026-04-25',
      '2026-05-02','2026-05-09','2026-05-16','2026-05-23','2026-05-30',
      '2026-06-06','2026-06-13','2026-06-20'
    ];

    // 美西现货运价 $/FEU（40尺柜）
    var uswData = [
      2800, 2780, 2750, 2720,
      2650, 2620, 2600, 2580,
      2700, 2680, 2650, 2620,
      2750, 2800, 2850, 2900,
      3200, 3600, 4000, 4500, 4800,
      5000, 5101, 5142
    ];

    // 美东现货运价 $/FEU（40尺柜）
    var useData = [
      3800, 3780, 3750, 3720,
      3650, 3620, 3600, 3580,
      3700, 3680, 3650, 3620,
      3750, 3800, 3850, 3900,
      4200, 4600, 5100, 5600, 5900,
      6100, 6321, 6769
    ];

    var optionFreight = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['上海→美西', '上海→美东'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: freightWeeks, axisLabel: { rotate: 30, fontSize: 10 } },
      yAxis: { type: 'value', name: '美元/FEU', splitLine: { lineStyle: { color: '#f0f0f0' } } },
      series: [
        { name: '上海→美西', type: 'line', smooth: true, data: uswData, itemStyle: { color: '#2563eb' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(37,99,235,0.15)'},{offset:1,color:'rgba(37,99,235,0)'}]) } },
        { name: '上海→美东', type: 'line', smooth: true, data: useData, itemStyle: { color: '#dc2626' }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(220,38,38,0.15)'},{offset:1,color:'rgba(220,38,38,0)'}]) } }
      ]
    };

    var importMonths = ['2024-07','2024-08','2024-09','2024-10','2024-11','2024-12','2025-01','2025-02','2025-03','2025-04','2025-05','2025-06','2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06'];

    // 美国自中国进口TEU（月度）
    var chinaTeu = [
      1023000, 980000, 950000, 920000, 880000, 900000,
      850000, 720000, 780000, 800000, 820000, 860000,
      880000, 900000, 870000, 850000, 800000, 830000,
      null, null, null, 680000, 816197, null
    ];

    // 中国份额 %
    var sharePct = [
      38.5, 37.2, 36.0, 35.5, 34.0, 34.5,
      33.0, 30.0, 31.5, 32.0, 32.5, 33.0,
      33.5, 34.0, 33.0, 32.5, 31.0, 31.5,
      null, null, null, 29.9, 33.6, null
    ];

    var optionUsImport = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['美国自中国进口TEU', '中国份额(%)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
      xAxis: { type: 'category', data: importMonths, axisLabel: { rotate: 30, fontSize: 10 } },
      yAxis: [
        { type: 'value', name: 'TEU', position: 'left', axisLine: { lineStyle: { color: '#2563eb' } }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
        { type: 'value', name: '份额%', min: 20, max: 45, position: 'right', axisLine: { lineStyle: { color: '#d97706' } }, splitLine: { show: false } }
      ],
      series: [
        { name: '美国自中国进口TEU', type: 'bar', data: chinaTeu, itemStyle: { color: '#2563eb', borderRadius: [4,4,0,0] } },
        { name: '中国份额(%)', type: 'line', yAxisIndex: 1, data: sharePct, itemStyle: { color: '#d97706' }, lineStyle: { width: 3 }, symbol: 'circle', symbolSize: 6 }
      ]
    };

    chartIndex.setOption(optionIndex);
    chartFreight.setOption(optionFreight);
    chartUsImport.setOption(optionUsImport);

    window.addEventListener('resize', function() {
      chartIndex.resize();
      chartFreight.resize();
      chartUsImport.resize();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
  } else {
    initCharts();
  }
})();

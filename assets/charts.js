(function() {
  'use strict';

  var commonGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var commonTooltip = { trigger: 'axis', axisPointer: { type: 'cross' }, backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#dadce0', textStyle: { color: '#202124' } };
  var colorPalette = ['#1a73e8', '#00acc1', '#34a853', '#f9ab00', '#ea4335', '#9aa0a6'];

  function initIndexChart() {
    var el = document.getElementById('chart-index');
    if (!el) return;
    var chart = echarts.init(el);
    var dates = ['1/3','1/10','1/17','1/24','2/7','2/14','2/21','2/28','3/7','3/14','3/21','3/28','4/4','4/11','4/18','4/25','5/9','5/16','5/23','5/30','6/6','6/13','6/20','6/27','7/4','7/11','7/18','7/25'];
    var scfi = [2180,2220,2250,2280,2300,2280,2250,2200,2350,2420,2480,2550,2620,2680,2750,2820,2880,2920,2980,3050,3120,3200,3280,3320,3310,3185,3080,3063];
    var ccfi = [1650,1660,1670,1680,1660,1640,1620,1600,1650,1680,1700,1720,1730,1740,1760,1780,1790,1800,1810,1820,1830,1840,1850,1860,1870,1873,1911,1901];
    chart.setOption({
      color: colorPalette,
      tooltip: commonTooltip,
      legend: { data: ['SCFI','CCFI'], top: 0, textStyle: { color: '#5f6368' } },
      grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
      xAxis: { type: 'category', boundaryGap: false, data: dates, axisLine: { lineStyle: { color: '#dadce0' } }, axisLabel: { color: '#5f6368', interval: 3 } },
      yAxis: [
        { type: 'value', name: 'SCFI', position: 'left', axisLine: { show: true, lineStyle: { color: '#1a73e8' } }, axisLabel: { color: '#1a73e8' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
        { type: 'value', name: 'CCFI', position: 'right', axisLine: { show: true, lineStyle: { color: '#00acc1' } }, axisLabel: { color: '#00acc1' }, splitLine: { show: false } }
      ],
      series: [
        { name: 'SCFI', type: 'line', data: scfi, smooth: true, showSymbol: false, lineStyle: { width: 3 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(26,115,232,0.15)' }, { offset: 1, color: 'rgba(26,115,232,0)' }] } } },
        { name: 'CCFI', type: 'line', data: ccfi, smooth: true, showSymbol: false, lineStyle: { width: 3 }, yAxisIndex: 1, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(0,172,193,0.15)' }, { offset: 1, color: 'rgba(0,172,193,0)' }] } } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initFreightChart() {
    var el = document.getElementById('chart-freight');
    if (!el) return;
    var chart = echarts.init(el);
    var dates = ['1/3','1/10','1/17','1/24','2/7','2/14','2/21','2/28','3/7','3/14','3/21','3/28','4/4','4/11','4/18','4/25','5/9','5/16','5/23','5/30','6/6','6/13','6/20','6/27','7/4','7/11','7/18','7/25'];
    var uswc = [3850,3900,3950,4000,3800,3750,3700,3650,3900,4050,4150,4250,4400,4550,4700,4850,5100,5300,5500,5700,5900,6100,6300,6500,6630,6219,5721,5650];
    var usec = [5200,5250,5300,5350,5100,5050,5000,4950,5200,5350,5450,5550,5700,5850,6000,6200,6500,6700,6900,7200,7400,7600,7800,8000,8200,8134,8000,7950];
    chart.setOption({
      color: colorPalette,
      tooltip: commonTooltip,
      legend: { data: ['美西现货','美东现货'], top: 0, textStyle: { color: '#5f6368' } },
      grid: commonGrid,
      xAxis: { type: 'category', boundaryGap: false, data: dates, axisLine: { lineStyle: { color: '#dadce0' } }, axisLabel: { color: '#5f6368', interval: 3 } },
      yAxis: { type: 'value', name: '美元/FEU', axisLine: { show: true, lineStyle: { color: '#5f6368' } }, axisLabel: { color: '#5f6368' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
      series: [
        { name: '美西现货', type: 'line', data: uswc, smooth: true, showSymbol: false, lineStyle: { width: 3 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(26,115,232,0.15)' }, { offset: 1, color: 'rgba(26,115,232,0)' }] } } },
        { name: '美东现货', type: 'line', data: usec, smooth: true, showSymbol: false, lineStyle: { width: 3 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(0,172,193,0.15)' }, { offset: 1, color: 'rgba(0,172,193,0)' }] } } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initImportChart() {
    var el = document.getElementById('chart-import');
    if (!el) return;
    var chart = echarts.init(el);
    var months = ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07(预)'];
    var total = [228.5,205.3,232.1,236.8,243.0,240.1,null];
    var china = [72.3,65.1,74.8,77.2,81.6,81.4,null];
    chart.setOption({
      color: colorPalette,
      tooltip: commonTooltip,
      legend: { data: ['美国总进口TEU','自华进口TEU'], top: 0, textStyle: { color: '#5f6368' } },
      grid: commonGrid,
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#dadce0' } }, axisLabel: { color: '#5f6368' } },
      yAxis: [
        { type: 'value', name: '万TEU', position: 'left', axisLine: { show: true, lineStyle: { color: '#5f6368' } }, axisLabel: { color: '#5f6368' }, splitLine: { lineStyle: { color: '#f0f0f0' } } }
      ],
      series: [
        { name: '美国总进口TEU', type: 'bar', data: total, barWidth: '35%', itemStyle: { borderRadius: [4,4,0,0] } },
        { name: '自华进口TEU', type: 'bar', data: china, barWidth: '35%', itemStyle: { borderRadius: [4,4,0,0] } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initShareChart() {
    var el = document.getElementById('chart-share');
    if (!el) return;
    var chart = echarts.init(el);
    var months = ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06'];
    var share = [31.6,31.7,32.2,32.6,33.6,33.9];
    chart.setOption({
      color: colorPalette,
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#dadce0', textStyle: { color: '#202124' }, formatter: function(p) { return p[0].name + '<br/>' + p[0].marker + ' 中国份额: ' + p[0].value + '%'; } },
      grid: commonGrid,
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#dadce0' } }, axisLabel: { color: '#5f6368' } },
      yAxis: { type: 'value', name: '份额(%)', min: 28, max: 36, axisLine: { show: true, lineStyle: { color: '#5f6368' } }, axisLabel: { color: '#5f6368', formatter: '{value}%' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
      series: [
        { name: '中国份额', type: 'line', data: share, smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { width: 3, color: '#1a73e8' }, itemStyle: { color: '#1a73e8', borderColor: '#fff', borderWidth: 2 }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(26,115,232,0.2)' }, { offset: 1, color: 'rgba(26,115,232,0)' }] } }, label: { show: true, position: 'top', formatter: '{c}%', color: '#1a73e8', fontSize: 12, fontWeight: 'bold' } }
      ]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initIndexChart();
    initFreightChart();
    initImportChart();
    initShareChart();
  });
})();

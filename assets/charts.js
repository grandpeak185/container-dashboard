(function() {
'use strict';

// Color palette - light tech style
const COLORS = {
  blue: '#2563eb',
  blueLight: '#93c5fd',
  green: '#10b981',
  greenLight: '#a7f3d0',
  orange: '#f59e0b',
  orangeLight: '#fcd34d',
  red: '#ef4444',
  redLight: '#fca5a5',
  purple: '#8b5cf6',
  purpleLight: '#c4b5fd',
  teal: '#14b8a6',
  tealLight: '#99f6e4',
  gray: '#94a3b8',
};

// Common tooltip style
function tooltipStyle() {
  return {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 8px; padding: 10px 14px;',
  };
}

// Common grid
function commonGrid(extra) {
  return Object.assign({ left: 55, right: 25, top: 35, bottom: 45, containLabel: false }, extra || {});
}

// ===== CHART 1: SCFI Composite Index =====
(function() {
  var dom = document.getElementById('chart-scfi');
  if (!dom) return;
  var chart = echarts.init(dom);
  var months = ['1月','2月','3月','4月','5月','6月','7月','8月'];
  var scfi = [2505, 2168, 2345, 2617, 2932, 3105, 3206, 3276];
  var scfiPrev = [2310, 1980, 2150, 2420, 2710, 2890, 3050, null];

  var option = {
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle()),
    legend: {
      data: ['2026年 SCFI','2025年同期'],
      bottom: 0,
      textStyle: { fontSize: 11, color: '#5a6d80' },
      itemWidth: 14, itemHeight: 8,
    },
    grid: commonGrid(),
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#5a6d80', fontSize: 11 },
    },
    yAxis: {
      type: 'value', name: '指数',
      nameTextStyle: { color: '#94a3b8', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 },
    },
    series: [
      {
        name: '2026年 SCFI', type: 'line',
        data: scfi,
        smooth: true,
        symbol: 'circle', symbolSize: 7,
        lineStyle: { color: COLORS.blue, width: 2.5 },
        itemStyle: { color: COLORS.blue },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37,99,235,0.15)' },
            { offset: 1, color: 'rgba(37,99,235,0.01)' },
          ]),
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: '#ef4444', type: 'dashed', width: 1 },
          label: { color: '#ef4444', fontSize: 10, formatter: '疫情前均值~1,000' },
          data: [{ yAxis: 1000 }],
        },
      },
      {
        name: '2025年同期', type: 'line',
        data: scfiPrev,
        smooth: true,
        symbol: 'diamond', symbolSize: 6,
        lineStyle: { color: '#cbd5e1', width: 1.5, type: 'dashed' },
        itemStyle: { color: '#cbd5e1' },
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
})();

// ===== CHART 2: CCFI US Routes =====
(function() {
  var dom = document.getElementById('chart-ccfi');
  if (!dom) return;
  var chart = echarts.init(dom);
  var months = ['1月','2月','3月','4月','5月','6月','7月','8月'];
  var ccW = [1280, 1120, 1205, 1350, 1480, 1550, 1533, 1495];
  var ccE = [1410, 1250, 1320, 1485, 1620, 1710, 1758, 1788];

  var option = {
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle()),
    legend: {
      data: ['CCFI 美西','CCFI 美东'],
      bottom: 0,
      textStyle: { fontSize: 11, color: '#5a6d80' },
      itemWidth: 14, itemHeight: 8,
    },
    grid: commonGrid(),
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#5a6d80', fontSize: 11 },
    },
    yAxis: {
      type: 'value', name: '指数',
      nameTextStyle: { color: '#94a3b8', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 },
    },
    series: [
      {
        name: 'CCFI 美西', type: 'line',
        data: ccW,
        smooth: true,
        symbol: 'circle', symbolSize: 6,
        lineStyle: { color: COLORS.orange, width: 2.5 },
        itemStyle: { color: COLORS.orange },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245,158,11,0.12)' },
            { offset: 1, color: 'rgba(245,158,11,0.01)' },
          ]),
        },
      },
      {
        name: 'CCFI 美东', type: 'line',
        data: ccE,
        smooth: true,
        symbol: 'circle', symbolSize: 6,
        lineStyle: { color: COLORS.teal, width: 2.5 },
        itemStyle: { color: COLORS.teal },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(20,184,166,0.12)' },
            { offset: 1, color: 'rgba(20,184,166,0.01)' },
          ]),
        },
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
})();

// ===== CHART 3: Spot Rates Shanghai to USWC/USEC =====
(function() {
  var dom = document.getElementById('chart-spot');
  if (!dom) return;
  var chart = echarts.init(dom);
  var months = ['1月','2月','3月','4月','5月','6月','7月','8月'];
  var uswc = [4850, 3920, 4210, 4680, 5340, 5890, 6229, 6484];
  var usec = [6720, 5480, 5890, 6450, 7320, 8150, 9054, 9290];

  var option = {
    tooltip: Object.assign({
      trigger: 'axis',
      formatter: function(params) {
        var r = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          r += p.marker + ' ' + p.seriesName + ': $' + p.value.toLocaleString() + '/FEU<br/>';
        });
        return r;
      },
    }, tooltipStyle()),
    legend: {
      data: ['上海→美西','上海→美东'],
      bottom: 0,
      textStyle: { fontSize: 11, color: '#5a6d80' },
      itemWidth: 14, itemHeight: 8,
    },
    grid: commonGrid({ right: 50 }),
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#5a6d80', fontSize: 11 },
    },
    yAxis: {
      type: 'value', name: '$/FEU',
      nameTextStyle: { color: '#94a3b8', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { color: '#94a3b8', fontSize: 10, formatter: function(v) { return '$' + (v/1000).toFixed(1) + 'k'; } },
    },
    series: [
      {
        name: '上海→美西', type: 'bar',
        data: uswc,
        barWidth: '35%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#6366f1' },
            { offset: 1, color: '#818cf8' },
          ]),
        },
        label: {
          show: true, position: 'top',
          color: '#6366f1', fontSize: 9, fontWeight: 600,
          formatter: function(p) { return '$' + (p.value/1000).toFixed(1) + 'k'; },
        },
      },
      {
        name: '上海→美东', type: 'bar',
        data: usec,
        barWidth: '35%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#a78bfa' },
          ]),
        },
        label: {
          show: true, position: 'top',
          color: '#8b5cf6', fontSize: 9, fontWeight: 600,
          formatter: function(p) { return '$' + (p.value/1000).toFixed(1) + 'k'; },
        },
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
})();

// ===== CHART 4: US Import from China & Share =====
(function() {
  var dom = document.getElementById('chart-import');
  if (!dom) return;
  var chart = echarts.init(dom);
  var months = ['1月','2月','3月','4月','5月','6月','7月'];
  var imports = [79.8, 68.2, 72.5, 78.4, 80.1, 81.5, 87.3];
  var share = [35.3, 33.5, 33.9, 34.4, 34.0, 33.9, 34.8];

  var option = {
    tooltip: Object.assign({
      trigger: 'axis',
      formatter: function(params) {
        var r = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          if (p.seriesName === '自中国进口') {
            r += p.marker + ' ' + p.seriesName + ': ' + p.value + ' 万TEU<br/>';
          } else {
            r += p.marker + ' ' + p.seriesName + ': ' + p.value + '%<br/>';
          }
        });
        return r;
      },
    }, tooltipStyle()),
    legend: {
      data: ['自中国进口','中国份额'],
      bottom: 0,
      textStyle: { fontSize: 11, color: '#5a6d80' },
      itemWidth: 14, itemHeight: 8,
    },
    grid: commonGrid({ right: 50 }),
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#5a6d80', fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value', name: '万TEU',
        nameTextStyle: { color: '#94a3b8', fontSize: 10 },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        axisLabel: { color: '#94a3b8', fontSize: 10 },
      },
      {
        type: 'value', name: '%',
        min: 30, max: 38,
        nameTextStyle: { color: '#94a3b8', fontSize: 10 },
        splitLine: { show: false },
        axisLabel: { color: '#94a3b8', fontSize: 10, formatter: '{value}%' },
      },
    ],
    series: [
      {
        name: '自中国进口', type: 'bar',
        yAxisIndex: 0,
        data: imports,
        barWidth: '50%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#10b981' },
            { offset: 1, color: '#34d399' },
          ]),
        },
        label: {
          show: true, position: 'top',
          color: '#10b981', fontSize: 9, fontWeight: 600,
        },
      },
      {
        name: '中国份额', type: 'line',
        yAxisIndex: 1,
        data: share,
        smooth: true,
        symbol: 'diamond', symbolSize: 8,
        lineStyle: { color: '#ef4444', width: 2.5 },
        itemStyle: { color: '#ef4444' },
        label: {
          show: true,
          color: '#ef4444', fontSize: 9, fontWeight: 600,
          formatter: '{c}%',
        },
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
})();

// ===== CHART 5: US Top Ports Import Volume (July 2026) =====
(function() {
  var dom = document.getElementById('chart-ports');
  if (!dom) return;
  var chart = echarts.init(dom);
  var ports = ['LA','LB','NY/NJ','Savannah','Houston','Norfolk','Charleston','Seattle','Tacoma','Miami'];
  var volumes = [482000, 435000, 398000, 252000, 218000, 165000, 128000, 115000, 108000, 102000];
  var changes = [2.1, 16.8, 3.5, 4.2, 16.2, 3.8, 2.5, 1.9, -0.5, 1.2];

  var option = {
    tooltip: Object.assign({
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var r = params[0].name + '<br/>';
        params.forEach(function(p) {
          if (p.seriesName === '进口量') {
            r += p.marker + ' ' + p.seriesName + ': ' + (p.value/1000).toFixed(0) + 'k TEU<br/>';
          } else {
            r += p.marker + ' ' + p.seriesName + ': ' + (p.value > 0 ? '+' : '') + p.value + '%<br/>';
          }
        });
        return r;
      },
    }, tooltipStyle()),
    legend: {
      data: ['进口量','环比变化'],
      bottom: 0,
      textStyle: { fontSize: 11, color: '#5a6d80' },
      itemWidth: 14, itemHeight: 8,
    },
    grid: commonGrid({ right: 50, bottom: 55 }),
    xAxis: {
      type: 'category', data: ports,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#5a6d80', fontSize: 10, rotate: 30 },
    },
    yAxis: [
      {
        type: 'value', name: 'TEU',
        nameTextStyle: { color: '#94a3b8', fontSize: 10 },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        axisLabel: { color: '#94a3b8', fontSize: 10, formatter: function(v) { return (v/1000).toFixed(0) + 'k'; } },
      },
      {
        type: 'value', name: '%',
        nameTextStyle: { color: '#94a3b8', fontSize: 10 },
        splitLine: { show: false },
        axisLabel: { color: '#94a3b8', fontSize: 10, formatter: '{value}%' },
      },
    ],
    series: [
      {
        name: '进口量', type: 'bar',
        yAxisIndex: 0,
        data: volumes,
        barWidth: '55%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#60a5fa' },
          ]),
        },
      },
      {
        name: '环比变化', type: 'line',
        yAxisIndex: 1,
        data: changes,
        symbol: 'triangle', symbolSize: 10,
        lineStyle: { color: '#f59e0b', width: 2 },
        itemStyle: { color: '#f59e0b' },
        label: {
          show: true,
          color: '#f59e0b', fontSize: 9, fontWeight: 600,
          formatter: function(p) { return (p.value > 0 ? '+' : '') + p.value + '%'; },
        },
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
})();

// ===== CHART 6: China Major Ports US Export Estimate =====
(function() {
  var dom = document.getElementById('chart-cnports');
  if (!dom) return;
  var chart = echarts.init(dom);
  var months = ['1月','2月','3月','4月','5月','6月'];
  var shanghai = [20, 15, 18, 21, 22, 23];
  var ningbo = [19, 14, 17, 20, 21, 22];
  var shenzhen = [24, 18, 21, 25, 26, 27];
  var qingdao = [8, 6, 7, 9, 9, 10];
  var xiamen = [5, 4, 5, 5, 6, 6];

  var option = {
    tooltip: Object.assign({ trigger: 'axis' }, tooltipStyle()),
    legend: {
      data: ['深圳','上海','宁波-舟山','青岛','厦门'],
      bottom: 0,
      textStyle: { fontSize: 10, color: '#5a6d80' },
      itemWidth: 12, itemHeight: 8,
    },
    grid: commonGrid({ bottom: 55 }),
    xAxis: {
      type: 'category', data: months,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#5a6d80', fontSize: 11 },
    },
    yAxis: {
      type: 'value', name: '万TEU',
      nameTextStyle: { color: '#94a3b8', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { color: '#94a3b8', fontSize: 10 },
    },
    series: [
      {
        name: '深圳', type: 'line',
        data: shenzhen,
        smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#ef4444', width: 2.5 },
        itemStyle: { color: '#ef4444' },
      },
      {
        name: '上海', type: 'line',
        data: shanghai,
        smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#2563eb', width: 2.5 },
        itemStyle: { color: '#2563eb' },
      },
      {
        name: '宁波-舟山', type: 'line',
        data: ningbo,
        smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#10b981', width: 2.5 },
        itemStyle: { color: '#10b981' },
      },
      {
        name: '青岛', type: 'line',
        data: qingdao,
        smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#f59e0b', width: 2 },
        itemStyle: { color: '#f59e0b' },
      },
      {
        name: '厦门', type: 'line',
        data: xiamen,
        smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#8b5cf6', width: 2 },
        itemStyle: { color: '#8b5cf6' },
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });
})();

})();
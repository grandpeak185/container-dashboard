(function() {
  'use strict';

  /* ============================
     公共配色与主题
     ============================ */
  var COLORS = {
    blue: '#2b6cb0',
    teal: '#2c7a7b',
    red: '#c53030',
    orange: '#c05621',
    green: '#276749',
    purple: '#553c9a',
    gray: '#a0aec0',
    lightBlue: '#90cdf4',
    lightTeal: '#81e6d9',
    lightRed: '#feb2b2',
    lightOrange: '#fbd38d',
    lightGreen: '#9ae6b4',
    lightGray: '#e2e8f0',
    bg: '#f0f4f8',
    text: '#1a2332',
    textSec: '#5a6b7f'
  };

  var BASE_TEXT_STYLE = { color: COLORS.textSec, fontSize: 11 };
  var AXIS_LINE_STYLE = { lineStyle: { color: COLORS.lightGray } };
  var SPLIT_LINE_STYLE = { lineStyle: { color: COLORS.lightGray, type: 'dashed' } };

  function baseOption() {
    return {
      backgroundColor: 'transparent',
      textStyle: BASE_TEXT_STYLE,
      grid: { left: 60, right: 30, top: 50, bottom: 50, containLabel: false },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: COLORS.lightGray,
        textStyle: { color: COLORS.text, fontSize: 12 },
        axisPointer: { lineStyle: { color: COLORS.lightBlue } }
      },
      legend: { textStyle: { fontSize: 11, color: COLORS.textSec }, top: 5, itemWidth: 14, itemHeight: 10 }
    };
  }

  /* ============================
     图表1: SCFI/CCFI 走势
     ============================ */
  var scfiCcfiEl = document.getElementById('chart_scfi_ccfi');
  if (scfiCcfiEl) {
    var scfiCcfiChart = echarts.init(scfiCcfiEl);
    var scfiCcfiOpt = baseOption();
    scfiCcfiOpt.title = { text: 'SCFI / CCFI 周度走势', left: 'center', textStyle: { fontSize: 13, fontWeight: 600, color: COLORS.text } };
    scfiCcfiOpt.xAxis = Object.assign({ type: 'category', data: ['1/3','1/10','1/17','1/24','2/7','2/14','2/21','2/28','3/7','3/14','3/21','3/28','4/4','4/11','4/18','4/24','5/2','5/9','5/16','5/23','5/30','6/6','6/13','6/20','6/27','7/3','7/10','7/17'], axisLabel: { rotate: 45, fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    scfiCcfiOpt.yAxis = { type: 'value', name: '指数', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10 }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE };
    scfiCcfiOpt.legend.data = ['SCFI', 'CCFI'];
    scfiCcfiOpt.series = [
      {
        name: 'SCFI',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 2.5, color: COLORS.blue },
        itemStyle: { color: COLORS.blue },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(43,108,176,0.15)' }, { offset: 1, color: 'rgba(43,108,176,0.02)' }] } },
        data: [1650,1580,1540,1520,1495,1510,1530,1555,1580,1620,1670,1710,1760,1810,1875,1875,1920,1980,2050,2150,2280,2450,2600,2750,2900,3327,3185,3080]
      },
      {
        name: 'CCFI',
        type: 'line',
        smooth: true,
        symbol: 'diamond',
        symbolSize: 5,
        lineStyle: { width: 2, color: COLORS.orange },
        itemStyle: { color: COLORS.orange },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(192,86,33,0.12)' }, { offset: 1, color: 'rgba(192,86,33,0.02)' }] } },
        data: [1380,1360,1345,1330,1320,1310,1315,1330,1340,1360,1390,1420,1460,1500,1550,1560,1590,1630,1680,1740,1800,1700,1740,1770,1810,1811,1873,1911]
      }
    ];
    scfiCcfiChart.setOption(scfiCcfiOpt);
    window.addEventListener('resize', function() { scfiCcfiChart.resize(); });
  }

  /* ============================
     图表2: 上海至美西/美东现货运价
     ============================ */
  var spotRatesEl = document.getElementById('chart_spot_rates');
  if (spotRatesEl) {
    var spotRatesChart = echarts.init(spotRatesEl);
    var spotOpt = baseOption();
    spotOpt.title = { text: '上海至美西/美东现货运价 ($/FEU)', left: 'center', textStyle: { fontSize: 13, fontWeight: 600, color: COLORS.text } };
    spotOpt.xAxis = Object.assign({ type: 'category', data: ['1月','2月','3月','4月','5月','6月','7月(截至7/17)'], axisLabel: { fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    spotOpt.yAxis = { type: 'value', name: '$/FEU', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10, formatter: '${value}' }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE };
    spotOpt.legend.data = ['美西 (PSW)', '美东 (USEC)'];
    spotOpt.series = [
      {
        name: '美西 (PSW)',
        type: 'bar',
        barWidth: '30%',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: COLORS.blue }, { offset: 1, color: '#4299e1' }] }, borderRadius: [4,4,0,0] },
        data: [2100,2050,2200,2400,2900,6300,5500]
      },
      {
        name: '美东 (USEC)',
        type: 'bar',
        barWidth: '30%',
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: COLORS.orange }, { offset: 1, color: '#ed8936' }] }, borderRadius: [4,4,0,0] },
        data: [3200,3100,3300,3500,4200,7500,7800]
      }
    ];
    spotRatesChart.setOption(spotOpt);
    window.addEventListener('resize', function() { spotRatesChart.resize(); });
  }

  /* ============================
     图表3: 美国自中国进口月度 TEU
     ============================ */
  var usChinaEl = document.getElementById('chart_us_china_teu');
  if (usChinaEl) {
    var usChinaChart = echarts.init(usChinaEl);
    var usChinaOpt = baseOption();
    usChinaOpt.title = { text: '美国自中国进口月度 TEU', left: 'center', textStyle: { fontSize: 13, fontWeight: 600, color: COLORS.text } };
    usChinaOpt.xAxis = Object.assign({ type: 'category', data: ['2025/7','2025/8','2025/9','2025/10','2025/11','2025/12','2026/1','2026/2','2026/3','2026/4','2026/5','2026/6'], axisLabel: { rotate: 45, fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    usChinaOpt.yAxis = { type: 'value', name: 'TEU (千)', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10, formatter: function(v) { return (v/1000).toFixed(0) + 'K'; } }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE };
    usChinaOpt.legend.data = ['美国自中国进口'];
    usChinaOpt.series = [
      {
        name: '美国自中国进口',
        type: 'bar',
        barWidth: '55%',
        itemStyle: {
          color: function(params) {
            var val = params.value;
            if (val > 850000) return COLORS.red;
            if (val > 750000) return COLORS.blue;
            return COLORS.teal;
          },
          borderRadius: [4,4,0,0]
        },
        label: { show: true, position: 'top', fontSize: 9, formatter: function(p) { return (p.value/1000).toFixed(0) + 'K'; } },
        data: [923075, 870000, 762000, 803901, 713131, 706000, 771093, 728562, 711652, 680778, 816197, 814474]
      }
    ];
    usChinaOpt.markLine = { silent: true };
    usChinaChart.setOption(usChinaOpt);
    window.addEventListener('resize', function() { usChinaChart.resize(); });
  }

  /* ============================
     图表4: 中国份额 vs 美国总进口 TEU
     ============================ */
  var shareTotalEl = document.getElementById('chart_share_total');
  if (shareTotalEl) {
    var shareTotalChart = echarts.init(shareTotalEl);
    var shareOpt = baseOption();
    shareOpt.title = { text: '中国份额 vs 美国总进口', left: 'center', textStyle: { fontSize: 13, fontWeight: 600, color: COLORS.text } };
    shareOpt.xAxis = Object.assign({ type: 'category', data: ['2025/7','2025/8','2025/9','2025/10','2025/11','2025/12','2026/1','2026/2','2026/3','2026/4','2026/5','2026/6'], axisLabel: { rotate: 45, fontSize: 10 }, axisLine: AXIS_LINE_STYLE, axisTick: { alignWithLabel: true } }, {});
    shareOpt.yAxis = [
      { type: 'value', name: '美国总进口 TEU (千)', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10, formatter: function(v) { return (v/1000).toFixed(0) + 'K'; } }, axisLine: AXIS_LINE_STYLE, splitLine: SPLIT_LINE_STYLE },
      { type: 'value', name: '中国份额 %', nameTextStyle: { fontSize: 10 }, min: 25, max: 40, axisLabel: { fontSize: 10, formatter: '{value}%' }, axisLine: AXIS_LINE_STYLE, splitLine: { show: false } }
    ];
    shareOpt.legend.data = ['美国总进口 TEU', '中国份额'];
    shareOpt.series = [
      {
        name: '美国总进口 TEU',
        type: 'bar',
        barWidth: '40%',
        yAxisIndex: 0,
        itemStyle: { color: COLORS.lightBlue, borderRadius: [4,4,0,0] },
        data: [2621910, 2520000, 2240000, 2306687, 2180000, 2227000, 2318722, 2093422, 2353611, 2277965, 2428758, 2400627]
      },
      {
        name: '中国份额',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 2.5, color: COLORS.red },
        itemStyle: { color: COLORS.red },
        label: { show: true, position: 'top', fontSize: 9, formatter: '{c}%' },
        data: [35.2, 34.5, 34.0, 34.0, 32.7, 31.7, 33.3, 34.8, 30.2, 29.9, 33.6, 33.9]
      }
    ];
    shareTotalChart.setOption(shareOpt);
    window.addEventListener('resize', function() { shareTotalChart.resize(); });
  }

})();

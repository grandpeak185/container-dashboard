(function() {
  'use strict';

  /* ---- Theme colors ---- */
  var accent = '#2563eb';
  var accent2 = '#0891b2';
  var accent3 = '#7c3aed';
  var ink = '#0f172a';
  var muted = '#64748b';
  var rule = '#e2e8f0';

  /* ---- Shared config ---- */
  var glassTooltip = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    appendToBody: true
  };

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var dualGrid = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };

  function axisLine() {
    return { lineStyle: { color: rule } };
  }
  function splitLineStyle() {
    return { lineStyle: { color: rule, type: 'dashed' } };
  }
  function axisLabelStyle() {
    return { color: muted, fontSize: 11 };
  }
  function nameTextStyle() {
    return { color: muted, fontSize: 11 };
  }
  function areaGradient(color) {
    return {
      type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: color + '30' },
        { offset: 1, color: color + '05' }
      ]
    };
  }

  /* ============================================================
     Chart 1: SCFI 综合指数走势（含预测）
     ============================================================ */
  var c1 = echarts.init(document.getElementById('chart-scfi'), null, { renderer: 'svg' });
  c1.setOption({
    tooltip: glassTooltip,
    legend: {
      data: ['SCFI综合指数(实际)', '趋势预测'],
      top: 0, right: 10,
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 14, itemHeight: 8
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['1/9', '1/30', '5/22', '6/5', '7/10', '7/24', '8/14', '8/21*', '8/28*'],
      axisLabel: axisLabelStyle(),
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '点',
      nameTextStyle: nameTextStyle(),
      axisLabel: axisLabelStyle(),
      splitLine: splitLineStyle(),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'SCFI综合指数(实际)',
        type: 'line',
        data: [1647.39, 1316.75, 2218.15, 2726.48, 3184.82, 3062.95, 3355, null, null],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: accent },
        lineStyle: { width: 3, color: accent },
        areaStyle: { color: areaGradient(accent) }
      },
      {
        name: '趋势预测',
        type: 'line',
        data: [null, null, null, null, null, null, 3355, 3450, 3520],
        smooth: true,
        symbol: 'diamond',
        symbolSize: 7,
        itemStyle: { color: accent2 },
        lineStyle: { width: 2, type: 'dashed', color: accent2 }
      }
    ]
  });
  window.addEventListener('resize', function() { c1.resize(); });

  /* ============================================================
     Chart 2: CCFI 综合指数走势
     ============================================================ */
  var c2 = echarts.init(document.getElementById('chart-ccfi'), null, { renderer: 'svg' });
  c2.setOption({
    tooltip: glassTooltip,
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['1月(月均)', '6月5日', '8月7日', '8月14日'],
      axisLabel: axisLabelStyle(),
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '点',
      nameTextStyle: nameTextStyle(),
      axisLabel: axisLabelStyle(),
      splitLine: splitLineStyle(),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'line',
        data: [1197.27, 1411.60, 1839.61, 1846.96],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: accent },
        lineStyle: { width: 3, color: accent },
        areaStyle: { color: areaGradient(accent) },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 11,
          formatter: function(p) { return p.value.toFixed(1); }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { c2.resize(); });

  /* ============================================================
     Chart 3: 上海→美西 / 美东现货运价走势
     ============================================================ */
  var c3 = echarts.init(document.getElementById('chart-spot'), null, { renderer: 'svg' });
  c3.setOption({
    tooltip: glassTooltip,
    legend: {
      data: ['上海→美西', '上海→美东'],
      top: 0, right: 10,
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 14, itemHeight: 8
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['1月初', '1月底', '2月*', '6月*', '8月14日'],
      axisLabel: axisLabelStyle(),
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/FEU',
      nameTextStyle: nameTextStyle(),
      axisLabel: axisLabelStyle(),
      splitLine: splitLineStyle(),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '上海→美西',
        type: 'line',
        data: [2617, 2442, 2200, 4350, 6714],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: accent },
        lineStyle: { width: 3, color: accent },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 10,
          formatter: function(p) { return '$' + p.value; }
        }
      },
      {
        name: '上海→美东',
        type: 'line',
        data: [3757, 2969, 2950, null, 9568],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: accent2 },
        lineStyle: { width: 3, color: accent2 },
        label: {
          show: true,
          position: 'bottom',
          color: ink,
          fontSize: 10,
          formatter: function(p) {
            return p.value == null ? '' : '$' + p.value;
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { c3.resize(); });

  /* ============================================================
     Chart 4: 美国自中国进口 TEU 及中国份额（双Y轴）
     ============================================================ */
  var c4 = echarts.init(document.getElementById('chart-imports'), null, { renderer: 'svg' });
  c4.setOption({
    tooltip: glassTooltip,
    legend: {
      data: ['美国自中国进口(千TEU)', '中国份额(%)'],
      top: 0, right: 10,
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 14, itemHeight: 8
    },
    grid: dualGrid,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLabel: axisLabelStyle(),
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: '千TEU',
        nameTextStyle: nameTextStyle(),
        axisLabel: axisLabelStyle(),
        splitLine: splitLineStyle(),
        axisLine: { show: false },
        axisTick: { show: false }
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: nameTextStyle(),
        axisLabel: axisLabelStyle(),
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        min: 30,
        max: 40
      }
    ],
    series: [
      {
        name: '美国自中国进口(千TEU)',
        type: 'bar',
        data: [771, 728, 712, 681, 816, 814, 873],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        barWidth: '45%'
      },
      {
        name: '中国份额(%)',
        type: 'line',
        yAxisIndex: 1,
        data: [33.0, 33.0, 33.0, 33.0, null, 33.9, 34.8],
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        itemStyle: { color: accent2 },
        lineStyle: { width: 2, color: accent2 },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 10,
          formatter: function(p) {
            return p.value == null ? '' : p.value + '%';
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { c4.resize(); });

  /* ============================================================
     Chart 5: 各船公司 GRI 对比（7月15日 vs 8月1日）
     ============================================================ */
  var c5 = echarts.init(document.getElementById('chart-gri'), null, { renderer: 'svg' });
  c5.setOption({
    tooltip: glassTooltip,
    legend: {
      data: ['7月15日 GRI', '8月1日 GRI'],
      top: 0, right: 10,
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 14, itemHeight: 8
    },
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['CMA CGM', 'COSCO', 'Evergreen', 'Hapag-Lloyd', 'HMM', 'Yang Ming', 'ZIM'],
      axisLabel: { color: muted, fontSize: 10, rotate: 20 },
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/FEU',
      nameTextStyle: nameTextStyle(),
      axisLabel: axisLabelStyle(),
      splitLine: splitLineStyle(),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '7月15日 GRI',
        type: 'bar',
        data: [2000, 2000, 3000, 3000, 3000, 2000, 2000],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        barGap: '15%'
      },
      {
        name: '8月1日 GRI',
        type: 'bar',
        data: [2000, 2000, 3000, null, 3000, 2000, 2000],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
      }
    ]
  });
  window.addEventListener('resize', function() { c5.resize(); });

  /* ============================================================
     Chart 6: 空班情况（2月9日-3月1日，按联盟）
     ============================================================ */
  var c6 = echarts.init(document.getElementById('chart-blank'), null, { renderer: 'svg' });
  c6.setOption({
    tooltip: glassTooltip,
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['Ocean Alliance', '2M联盟', 'Premier Alliance', 'CMA CGM(独立)'],
      axisLabel: { color: muted, fontSize: 10, rotate: 15 },
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '空班次数',
      nameTextStyle: nameTextStyle(),
      axisLabel: axisLabelStyle(),
      splitLine: splitLineStyle(),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: [27, 22, 18, 6],
        itemStyle: {
          color: function(params) {
            var colors = [accent, accent2, accent3, muted];
            return colors[params.dataIndex];
          },
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 13,
          fontWeight: 'bold'
        }
      }
    ]
  });
  window.addEventListener('resize', function() { c6.resize(); });

  /* ============================================================
     Chart 7: 美国主要港口拥堵指标（船舶等待/滞留天数）
     ============================================================ */
  var c7 = echarts.init(document.getElementById('chart-port'), null, { renderer: 'svg' });
  c7.setOption({
    tooltip: glassTooltip,
    grid: defaultGrid,
    xAxis: {
      type: 'category',
      data: ['洛杉矶(7月)', '长滩(7月)', '纽约(2月底)', '休斯顿(7月)'],
      axisLabel: { color: muted, fontSize: 10, rotate: 15 },
      axisLine: axisLine(),
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '天数',
      nameTextStyle: nameTextStyle(),
      axisLabel: axisLabelStyle(),
      splitLine: splitLineStyle(),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: [1.8, 5.2, 2.7, 6.5],
        itemStyle: {
          color: function(params) {
            var v = params.value;
            if (v >= 5) return '#dc2626';
            if (v >= 3) return '#ea580c';
            return '#059669';
          },
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '45%',
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 13,
          fontWeight: 'bold',
          formatter: '{c}天'
        }
      }
    ]
  });
  window.addEventListener('resize', function() { c7.resize(); });

})();

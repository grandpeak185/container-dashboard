(function() {
  'use strict';

  // ===== 全局配色与通用配置 =====
  var COLORS = {
    primary: '#2563eb',
    primaryDark: '#1e40af',
    accent: '#0ea5e9',
    accent2: '#06b6d4',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f59e0b',
    purple: '#8b5cf6',
    pink: '#ec4899',
    teal: '#14b8a6',
    indigo: '#6366f1',
    gray: '#94a3b8',
    textMuted: '#64748b'
  };

  var TOOLTIP_STYLE = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332', fontSize: 12 }
  };

  var DEFAULT_GRID = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var DUAL_GRID = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };

  // ===== 图表1: SCFI 与 CCFI 综合指数走势 =====
  var chart1 = echarts.init(document.getElementById('chart-scfi-ccfi'));
  chart1.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      textStyle: TOOLTIP_STYLE.textStyle,
      axisPointer: { type: 'cross', crossStyle: { color: '#cbd5e1' } }
    },
    legend: {
      data: ['SCFI综合指数', 'CCFI综合指数'],
      top: 0,
      right: 0,
      textStyle: { fontSize: 11, color: COLORS.textMuted },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: DUAL_GRID,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(最新)'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: COLORS.textMuted, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: 'SCFI',
        nameTextStyle: { color: COLORS.primary, fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: COLORS.textMuted, fontSize: 10 },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        min: 1000,
        max: 3600
      },
      {
        type: 'value',
        name: 'CCFI',
        nameTextStyle: { color: COLORS.accent, fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: COLORS.textMuted, fontSize: 10 },
        splitLine: { show: false },
        min: 1000,
        max: 2200
      }
    ],
    series: [
      {
        name: 'SCFI综合指数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5, color: COLORS.primary },
        itemStyle: { color: COLORS.primary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37,99,235,0.15)' },
            { offset: 1, color: 'rgba(37,99,235,0.01)' }
          ])
        },
        data: [1500, 1400, 1350, 1200, 2000, 2726.48, 3205.97, 3276.14],
        markPoint: {
          symbol: 'pin',
          symbolSize: 45,
          data: [
            { name: '年内高点', value: 3326.87, xAxis: 6, yAxis: 3326.87,
              itemStyle: { color: COLORS.red } }
          ],
          label: { fontSize: 9, color: '#fff' }
        },
        markLine: {
          silent: true,
          lineStyle: { type: 'dashed', color: COLORS.orange },
          data: [{ yAxis: 3326.87, label: { formatter: '年内高点 3326.87', position: 'end', fontSize: 10, color: COLORS.orange } }]
        }
      },
      {
        name: 'CCFI综合指数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        yAxisIndex: 1,
        lineStyle: { width: 2.5, color: COLORS.accent },
        itemStyle: { color: COLORS.accent },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(14,165,233,0.12)' },
            { offset: 1, color: 'rgba(14,165,233,0.01)' }
          ])
        },
        data: [1197.27, 1250, 1300, 1330, 1360, 1411.60, 1857.04, 1839.61]
      }
    ]
  });

  // ===== 图表2: 上海至美西/美东现货运价走势 =====
  var chart2 = echarts.init(document.getElementById('chart-spot-rates'));
  chart2.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      textStyle: TOOLTIP_STYLE.textStyle,
      formatter: function(params) {
        var html = '<div style="font-weight:600;margin-bottom:4px;">' + params[0].axisValue + '</div>';
        params.forEach(function(p) {
          html += '<div style="display:flex;align-items:center;gap:6px;">'
            + '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + p.color + ';"></span>'
            + '<span>' + p.seriesName + ': <b>$' + p.value.toLocaleString() + '/FEU</b></span>'
            + '</div>';
        });
        return html;
      }
    },
    legend: {
      data: ['上海→美西', '上海→美东'],
      top: 0,
      right: 0,
      textStyle: { fontSize: 11, color: COLORS.textMuted },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: DEFAULT_GRID,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月初', '7月中', '7月末', '8月初'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: COLORS.textMuted, fontSize: 10, rotate: 30 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/FEU',
      nameTextStyle: { color: COLORS.textMuted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: COLORS.textMuted, fontSize: 10, formatter: '${value}' },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      min: 0,
      max: 10000
    },
    series: [
      {
        name: '上海→美西',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5, color: COLORS.primary },
        itemStyle: { color: COLORS.primary },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37,99,235,0.15)' },
            { offset: 1, color: 'rgba(37,99,235,0.01)' }
          ])
        },
        data: [2800, 2600, 2500, 2400, 2800, 4200, 6630, 5721, 6229, 6484]
      },
      {
        name: '上海→美东',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5, color: COLORS.red },
        itemStyle: { color: COLORS.red },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(239,68,68,0.10)' },
            { offset: 1, color: 'rgba(239,68,68,0.01)' }
          ])
        },
        data: [3800, 3600, 3500, 3400, 3800, 5500, 8900, 8172, 9054, 9290],
        markLine: {
          silent: true,
          lineStyle: { type: 'dashed', color: COLORS.orange, width: 1.5 },
          data: [{ yAxis: 10000, label: { formatter: '$10,000心理关口', position: 'end', fontSize: 10, color: COLORS.orange } }]
        }
      }
    ]
  });

  // ===== 图表3: 美国自中国进口TEU及中国份额 =====
  var chart3 = echarts.init(document.getElementById('chart-us-imports'));
  chart3.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      textStyle: TOOLTIP_STYLE.textStyle,
      axisPointer: { type: 'cross', crossStyle: { color: '#cbd5e1' } }
    },
    legend: {
      data: ['美自华进口(TEU)', '中国份额(%)'],
      top: 0,
      right: 0,
      textStyle: { fontSize: 11, color: COLORS.textMuted },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: DUAL_GRID,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: COLORS.textMuted, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        name: 'TEU',
        nameTextStyle: { color: COLORS.primary, fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: COLORS.textMuted, fontSize: 10, formatter: function(v) { return (v / 1000) + 'K'; } },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        min: 600000,
        max: 950000
      },
      {
        type: 'value',
        name: '份额%',
        nameTextStyle: { color: COLORS.orange, fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: COLORS.textMuted, fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        min: 28,
        max: 38
      }
    ],
    series: [
      {
        name: '美自华进口(TEU)',
        type: 'bar',
        barWidth: '45%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37,99,235,0.85)' },
            { offset: 1, color: 'rgba(37,99,235,0.5)' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        data: [771000, 728562, 711400, 680778, 816197, 814474, 873129],
        label: {
          show: true,
          position: 'top',
          fontSize: 9,
          color: COLORS.textMuted,
          formatter: function(p) { return (p.value / 1000).toFixed(0) + 'K'; }
        }
      },
      {
        name: '中国份额(%)',
        type: 'line',
        smooth: true,
        symbol: 'diamond',
        symbolSize: 8,
        yAxisIndex: 1,
        lineStyle: { width: 2.5, color: COLORS.orange },
        itemStyle: { color: COLORS.orange },
        data: [33.3, 34.8, 30.3, 29.9, 33.6, 33.9, 34.8]
      }
    ]
  });

  // ===== 图表4: Drewry WCI 综合指数及主要航线 =====
  var chart4 = echarts.init(document.getElementById('chart-wci'));
  chart4.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      textStyle: TOOLTIP_STYLE.textStyle,
      formatter: function(params) {
        var html = '<div style="font-weight:600;margin-bottom:4px;">' + params[0].axisValue + '</div>';
        params.forEach(function(p) {
          html += '<div style="display:flex;align-items:center;gap:6px;">'
            + '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + p.color + ';"></span>'
            + '<span>' + p.seriesName + ': <b>$' + p.value.toLocaleString() + '</b></span>'
            + '</div>';
        });
        return html;
      }
    },
    legend: {
      data: ['WCI综合', '上海→洛杉矶', '上海→纽约'],
      top: 0,
      right: 0,
      textStyle: { fontSize: 11, color: COLORS.textMuted },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: DEFAULT_GRID,
    xAxis: {
      type: 'category',
      data: ['6月初', '7月初', '7月中', '7月末', '8月初'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: COLORS.textMuted, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/FEU',
      nameTextStyle: { color: COLORS.textMuted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: COLORS.textMuted, fontSize: 10, formatter: '${value}' },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      min: 0,
      max: 9000
    },
    series: [
      {
        name: 'WCI综合',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, color: COLORS.purple, type: 'dashed' },
        itemStyle: { color: COLORS.purple },
        data: [3500, 4000, 4100, 4374, 4297]
      },
      {
        name: '上海→洛杉矶',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5, color: COLORS.primary },
        itemStyle: { color: COLORS.primary },
        data: [3200, 5500, 5700, 5878, 5894]
      },
      {
        name: '上海→纽约',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5, color: COLORS.red },
        itemStyle: { color: COLORS.red },
        data: [4500, 7000, 7400, 7598, 7893]
      }
    ]
  });

  // ===== 图表5: 主要港口拥堵情况 =====
  var chart5 = echarts.init(document.getElementById('chart-port-congestion'));
  chart5.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      textStyle: TOOLTIP_STYLE.textStyle,
      formatter: function(params) {
        var p = params[0];
        return '<div style="font-weight:600;">' + p.name + '</div>'
          + '<div>船舶等待：' + p.value + ' 天</div>';
      }
    },
    grid: DEFAULT_GRID,
    xAxis: {
      type: 'category',
      data: ['洛杉矶', '长滩', '纽约/新泽西', '萨凡纳', '休斯顿', '青岛', '上海', '宁波', '新加坡', '鹿特丹', '汉堡'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: COLORS.textMuted, fontSize: 9, rotate: 40 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '等待天数',
      nameTextStyle: { color: COLORS.textMuted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: COLORS.textMuted, fontSize: 10 },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      min: 0,
      max: 22
    },
    series: [
      {
        name: '等待天数',
        type: 'bar',
        barWidth: '55%',
        itemStyle: {
          color: function(params) {
            var val = params.value;
            if (val >= 15) return COLORS.red;
            if (val >= 8) return COLORS.orange;
            if (val >= 4) return '#fbbf24';
            return COLORS.green;
          },
          borderRadius: [4, 4, 0, 0]
        },
        data: [5.8, 2.2, 20, 11, 5, 4, 2.5, 2.5, 1, 2.5, 2],
        label: {
          show: true,
          position: 'top',
          fontSize: 9,
          color: COLORS.textMuted,
          formatter: '{c}天'
        },
        markLine: {
          silent: true,
          lineStyle: { type: 'dashed', color: COLORS.red, width: 1 },
          data: [{ yAxis: 10, label: { formatter: '拥堵警戒线(10天)', position: 'end', fontSize: 9, color: COLORS.red } }]
        }
      }
    ]
  });

  // ===== 图表6: 各船公司8月1日GRI幅度对比 =====
  var chart6 = echarts.init(document.getElementById('chart-carrier-grp'));
  chart6.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      textStyle: TOOLTIP_STYLE.textStyle,
      formatter: function(params) {
        var p = params[0];
        return '<div style="font-weight:600;">' + p.name + '</div>'
          + '<div>GRI幅度：+$' + p.value.toLocaleString() + '/FEU</div>';
      }
    },
    grid: DEFAULT_GRID,
    xAxis: {
      type: 'category',
      data: ['中远海运', '达飞', '长荣', 'HMM', '阳明', '以星'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: COLORS.textMuted, fontSize: 11 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'USD/FEU',
      nameTextStyle: { color: COLORS.textMuted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: COLORS.textMuted, fontSize: 10, formatter: '${value}' },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      min: 0,
      max: 3500
    },
    series: [
      {
        name: 'GRI幅度',
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: function(params) {
            var colors = [COLORS.primary, COLORS.accent, COLORS.red, COLORS.red, COLORS.orange, COLORS.orange];
            return colors[params.dataIndex];
          },
          borderRadius: [4, 4, 0, 0]
        },
        data: [1500, 2000, 3000, 3000, 2000, 2000],
        label: {
          show: true,
          position: 'top',
          fontSize: 11,
          fontWeight: 600,
          formatter: '+${c}'
        }
      }
    ]
  });

  // ===== 响应式调整 =====
  window.addEventListener('resize', function() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
    chart4.resize();
    chart5.resize();
    chart6.resize();
  });

})();

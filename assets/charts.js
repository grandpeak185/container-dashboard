/**
 * China-US Container Dashboard Charts
 * IIFE format - auto-executes on page load
 * Date: 2026-08-07
 */
(function() {
  'use strict';

  var colorPalette = ['#2563eb', '#0ea5e9', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4'];

  function initChart(domId, option) {
    var el = document.getElementById(domId);
    if (!el) return null;
    var chart = echarts.init(el);
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
    return chart;
  }

  var months = ['1月','2月','3月','4月','5月','6月','7月','8月'];

  // Chart 1: SCFI & CCFI Trend
  initChart('chart-scfi-ccfi', {
    color: ['#2563eb', '#ef4444'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' }
    },
    legend: { data: ['SCFI综合指数', 'CCFI综合指数'], top: 0, textStyle: { color: '#475569' } },
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      name: '指数点',
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b' }
    },
    series: [
      {
        name: 'SCFI综合指数',
        type: 'line',
        data: [2150, 2080, 2320, 2580, 2850, 3050, 3168, 3206],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#2563eb' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37,99,235,0.15)' },
            { offset: 1, color: 'rgba(37,99,235,0.01)' }
          ])
        },
        markPoint: {
          data: [{ coord: ['7月', 3168], value: '3168', itemStyle: { color: '#2563eb' } }]
        }
      },
      {
        name: 'CCFI综合指数',
        type: 'line',
        data: [1500, 1450, 1550, 1650, 1750, 1820, 1911, 1920],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#ef4444' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(239,68,68,0.15)' },
            { offset: 1, color: 'rgba(239,68,68,0.01)' }
          ])
        }
      }
    ]
  });

  // Chart 2: Shanghai to US West/East Coast Spot Rates
  initChart('chart-us-rates', {
    color: ['#0ea5e9', '#f59e0b'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      formatter: function(p) {
        var r = p[0].name + '<br/>';
        for (var i = 0; i < p.length; i++) {
          r += p[i].marker + ' ' + p[i].seriesName + ': $' + p[i].value.toLocaleString() + '/FEU<br/>';
        }
        return r;
      }
    },
    legend: { data: ['美西航线', '美东航线'], top: 0, textStyle: { color: '#475569' } },
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      name: '美元/FEU',
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', formatter: '${value}' }
    },
    series: [
      {
        name: '美西航线',
        type: 'line',
        data: [3500, 3200, 3800, 4200, 4800, 5200, 6067, 6229],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#0ea5e9' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(14,165,233,0.15)' },
            { offset: 1, color: 'rgba(14,165,233,0.01)' }
          ])
        }
      },
      {
        name: '美东航线',
        type: 'line',
        data: [5000, 4800, 5200, 5800, 6500, 7200, 8339, 9054],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#f59e0b' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245,158,11,0.15)' },
            { offset: 1, color: 'rgba(245,158,11,0.01)' }
          ])
        }
      }
    ]
  });

  // Chart 3: US Imports from China TEU
  initChart('chart-china-teu', {
    color: ['#10b981'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      formatter: function(p) {
        var r = p[0].name + '<br/>';
        r += p[0].marker + ' 自中国进口: ' + p[0].value.toLocaleString() + ' TEU';
        return r;
      }
    },
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      name: 'TEU',
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b' }
    },
    series: [
      {
        name: '自中国进口',
        type: 'bar',
        data: [
          { value: 771093, itemStyle: { color: '#10b981' } },
          { value: 680000, itemStyle: { color: '#10b981' } },
          { value: 750000, itemStyle: { color: '#10b981' } },
          { value: 780000, itemStyle: { color: '#10b981' } },
          { value: 816200, itemStyle: { color: '#10b981' } },
          { value: 814474, itemStyle: { color: '#10b981' } },
          { value: 0, itemStyle: { color: '#cbd5e1' } },
          { value: 0, itemStyle: { color: '#cbd5e1' } }
        ],
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          color: '#64748b',
          formatter: function(p) {
            if (p.value === 0) return '待发布';
            return (p.value / 10000).toFixed(1) + '万';
          }
        },
        markLine: {
          silent: true,
          lineStyle: { color: '#94a3b8', type: 'dashed' },
          data: [{ yAxis: 800000, label: { formatter: '80万TEU线', color: '#94a3b8' } }]
        }
      }
    ]
  });

  // Chart 4: China Share of US Imports
  initChart('chart-china-share', {
    color: ['#8b5cf6'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      formatter: function(p) {
        return p[0].name + '<br/>' + p[0].marker + ' 中国份额: ' + p[0].value + '%';
      }
    },
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      name: '%',
      min: 25,
      max: 45,
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', formatter: '{value}%' }
    },
    series: [
      {
        name: '中国份额',
        type: 'line',
        data: [36.7, 35.8, 36.6, 35.5, 33.6, 33.9, null, null],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#8b5cf6' },
        connectNulls: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139,92,246,0.15)' },
            { offset: 1, color: 'rgba(139,92,246,0.01)' }
          ])
        },
        markLine: {
          silent: true,
          lineStyle: { color: '#ef4444', type: 'dashed' },
          data: [{ yAxis: 35, label: { formatter: '35%警戒线', color: '#ef4444' } }]
        }
      }
    ]
  });

  // Chart 5: US Total Container Imports
  initChart('chart-us-total', {
    color: ['#ec4899'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      formatter: function(p) {
        var r = p[0].name + '<br/>';
        r += p[0].marker + ' 美国总进口: ' + p[0].value.toLocaleString() + ' TEU';
        return r;
      }
    },
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      name: 'TEU',
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b' }
    },
    series: [
      {
        name: '美国总进口',
        type: 'bar',
        data: [
          { value: 2100000, itemStyle: { color: '#ec4899' } },
          { value: 1900000, itemStyle: { color: '#ec4899' } },
          { value: 2050000, itemStyle: { color: '#ec4899' } },
          { value: 2200000, itemStyle: { color: '#ec4899' } },
          { value: 2430000, itemStyle: { color: '#ec4899' } },
          { value: 2400627, itemStyle: { color: '#ec4899' } },
          { value: 0, itemStyle: { color: '#cbd5e1' } },
          { value: 0, itemStyle: { color: '#cbd5e1' } }
        ],
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          color: '#64748b',
          formatter: function(p) {
            if (p.value === 0) return '待发布';
            return (p.value / 10000).toFixed(0) + '万';
          }
        }
      }
    ]
  });

  // Chart 6: Carrier GRI August 2026
  initChart('chart-carrier-gri', {
    color: ['#2563eb', '#0ea5e9', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      formatter: function(p) {
        var r = p[0].name + '<br/>';
        for (var i = 0; i < p.length; i++) {
          if (p[i].value != null && p[i].value !== 0) {
            r += p[i].marker + ' ' + p[i].seriesName + ': $' + p[i].value + '/FEU<br/>';
          }
        }
        return r;
      }
    },
    legend: { data: ['COSCO', 'CMA CGM', 'Evergreen', 'HMM', 'Yang Ming', 'ZIM', 'Maersk', 'ONE'], top: 0, textStyle: { color: '#475569', fontSize: 10 }, itemWidth: 14, itemHeight: 8 },
    grid: { left: 55, right: 25, top: 45, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: ['美西GRI', '美东GRI', 'PSS/其他'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '美元/FEU',
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', formatter: '${value}' }
    },
    series: [
      { name: 'COSCO', type: 'bar', data: [2000, 2200, 2250], barGap: '10%', barWidth: 10 },
      { name: 'CMA CGM', type: 'bar', data: [2000, 2200, 1800], barWidth: 10 },
      { name: 'Evergreen', type: 'bar', data: [3000, 3200, 2500], barWidth: 10 },
      { name: 'HMM', type: 'bar', data: [3000, 3200, 2000], barWidth: 10 },
      { name: 'Yang Ming', type: 'bar', data: [2000, 2200, 1500], barWidth: 10 },
      { name: 'ZIM', type: 'bar', data: [2000, 2200, 1800], barWidth: 10 },
      { name: 'Maersk', type: 'bar', data: [1500, 1800, 2200], barWidth: 10 },
      { name: 'ONE', type: 'bar', data: [1800, 2000, 1600], barWidth: 10 }
    ]
  });

  // Chart 7: Port Congestion Index (estimated)
  initChart('chart-port-congestion', {
    color: ['#f59e0b'],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' }
    },
    legend: { data: ['亚洲港口延误天数'], top: 0, textStyle: { color: '#475569' } },
    grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
    xAxis: {
      type: 'category',
      data: ['上海', '宁波', '新加坡', '洛杉矶', '长滩', '纽约/新泽西'],
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#64748b', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '天',
      max: 7,
      nameTextStyle: { color: '#64748b' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b' }
    },
    series: [
      {
        name: '亚洲港口延误天数',
        type: 'bar',
        data: [
          { value: 3.5, itemStyle: { color: '#f59e0b' } },
          { value: 4.0, itemStyle: { color: '#f59e0b' } },
          { value: 2.5, itemStyle: { color: '#10b981' } },
          { value: 2.0, itemStyle: { color: '#10b981' } },
          { value: 1.8, itemStyle: { color: '#10b981' } },
          { value: 2.2, itemStyle: { color: '#10b981' } }
        ],
        barWidth: '45%',
        label: {
          show: true,
          position: 'top',
          color: '#64748b',
          formatter: '{c}天'
        }
      }
    ]
  });

  // Chart 8: Service Coverage Matrix (radar chart)
  initChart('chart-service-matrix', {
    color: ['#2563eb', '#ef4444', '#10b981', '#f59e0b'],
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' }
    },
    legend: { data: ['COSCO', 'Maersk', 'MSC', 'CMA CGM'], top: 0, textStyle: { color: '#475569' } },
    radar: {
      indicator: [
        { name: '美西覆盖', max: 100 },
        { name: '美东覆盖', max: 100 },
        { name: '内陆联运', max: 100 },
        { name: '冷链服务', max: 100 },
        { name: '电商快航', max: 100 },
        { name: '特种箱', max: 100 }
      ],
      splitArea: {
        areaStyle: {
          color: ['rgba(241,245,249,0.5)', 'rgba(255,255,255,0.8)']
        }
      },
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      splitLine: { lineStyle: { color: '#e2e8f0' } },
      axisName: { color: '#64748b' }
    },
    series: [
      {
        name: '服务覆盖',
        type: 'radar',
        data: [
          { value: [95, 90, 88, 85, 92, 80], name: 'COSCO', itemStyle: { color: '#2563eb' }, areaStyle: { color: 'rgba(37,99,235,0.15)' } },
          { value: [90, 92, 95, 90, 85, 88], name: 'Maersk', itemStyle: { color: '#ef4444' }, areaStyle: { color: 'rgba(239,68,68,0.15)' } },
          { value: [92, 88, 82, 80, 88, 85], name: 'MSC', itemStyle: { color: '#10b981' }, areaStyle: { color: 'rgba(16,185,129,0.15)' } },
          { value: [88, 90, 85, 88, 82, 90], name: 'CMA CGM', itemStyle: { color: '#f59e0b' }, areaStyle: { color: 'rgba(245,158,11,0.15)' } }
        ]
      }
    ]
  });

})();

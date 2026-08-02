(function() {
  'use strict';

  var colors = {
    primary: '#2563eb',
    secondary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#8b5cf6',
    teal: '#14b8a6',
    gray: '#94a3b8'
  };

  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    padding: 12,
    borderWidth: 1,
    extraCssText: 'box-shadow:0 4px 12px rgba(0,0,0,0.1);border-radius:8px;'
  };

  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  function initChartIndex() {
    var el = document.getElementById('chart-index');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['SCFI', 'CCFI'], bottom: 0, textStyle: { color: '#5a6a7a' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月(截至24日)'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#5a6a7a' }
      },
      yAxis: {
        type: 'value',
        name: '指数点',
        nameTextStyle: { color: '#5a6a7a' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#5a6a7a' }
      },
      series: [
        {
          name: 'SCFI',
          type: 'line',
          data: [2450, 2380, 2520, 2680, 2890, 3080, 3063],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: colors.primary, width: 3 },
          itemStyle: { color: colors.primary },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(37,99,235,0.2)' },
                { offset: 1, color: 'rgba(37,99,235,0.02)' }
              ]
            }
          }
        },
        {
          name: 'CCFI',
          type: 'line',
          data: [1520, 1480, 1550, 1620, 1750, 1910, 1901],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: colors.success, width: 3 },
          itemStyle: { color: colors.success },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(16,185,129,0.2)' },
                { offset: 1, color: 'rgba(16,185,129,0.02)' }
              ]
            }
          }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartFreight() {
    var el = document.getElementById('chart-freight');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipStyle),
      legend: { data: ['美西现货', '美东现货'], bottom: 0, textStyle: { color: '#5a6a7a' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月初', '7月下旬'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#5a6a7a' }
      },
      yAxis: {
        type: 'value',
        name: '美元/FEU',
        nameTextStyle: { color: '#5a6a7a' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#5a6a7a' }
      },
      series: [
        {
          name: '美西现货',
          type: 'bar',
          data: [2800, 2650, 2900, 3200, 4500, 6000, 7500, 6600],
          itemStyle: { color: colors.primary, borderRadius: [4, 4, 0, 0] },
          barWidth: '30%'
        },
        {
          name: '美东现货',
          type: 'bar',
          data: [3600, 3450, 3700, 4100, 5800, 7800, 9000, 8900],
          itemStyle: { color: colors.warning, borderRadius: [4, 4, 0, 0] },
          barWidth: '30%'
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartImport() {
    var el = document.getElementById('chart-import');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['自华进口TEU', '中国份额(%)'], bottom: 0, textStyle: { color: '#5a6a7a' } },
      grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月(预估)'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#5a6a7a' }
      },
      yAxis: [
        {
          type: 'value',
          name: 'TEU',
          nameTextStyle: { color: '#5a6a7a' },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
          axisLabel: { color: '#5a6a7a' }
        },
        {
          type: 'value',
          name: '份额%',
          min: 25,
          max: 40,
          nameTextStyle: { color: '#5a6a7a' },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { color: '#5a6a7a', formatter: '{value}%' }
        }
      ],
      series: [
        {
          name: '自华进口TEU',
          type: 'bar',
          data: [720000, 650000, 710000, 740000, 816197, 814474, 840000],
          itemStyle: { color: colors.primary, borderRadius: [4, 4, 0, 0] },
          barWidth: '35%'
        },
        {
          name: '中国份额(%)',
          type: 'line',
          yAxisIndex: 1,
          data: [31.2, 30.8, 31.5, 31.0, 33.6, 33.9, 34.0],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: colors.danger, width: 3 },
          itemStyle: { color: colors.danger }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartTotalImport() {
    var el = document.getElementById('chart-total-import');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipStyle),
      legend: { data: ['美国总进口TEU', '预测值'], bottom: 0, textStyle: { color: '#5a6a7a' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月(预估)'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#5a6a7a' }
      },
      yAxis: {
        type: 'value',
        name: 'TEU',
        nameTextStyle: { color: '#5a6a7a' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#5a6a7a' }
      },
      series: [
        {
          name: '美国总进口TEU',
          type: 'bar',
          data: [2310000, 2110000, 2250000, 2390000, 2429000, 2401000, 2470000],
          itemStyle: { color: colors.teal, borderRadius: [4, 4, 0, 0] },
          barWidth: '35%'
        },
        {
          name: '预测值',
          type: 'line',
          data: [2310000, 2110000, 2250000, 2390000, 2429000, 2401000, 2470000],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: colors.purple, width: 3, type: 'dashed' },
          itemStyle: { color: colors.purple }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initChartIndex();
    initChartFreight();
    initChartImport();
    initChartTotalImport();
  });

})();
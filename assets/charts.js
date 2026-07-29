(function() {
  'use strict';

  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332' },
    padding: 12,
    borderRadius: 8,
    extraCssText: 'box-shadow:0 4px 20px rgba(30,41,59,0.12);'
  };

  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };

  function initChartIndex() {
    var chart = echarts.init(document.getElementById('chart-index'));
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['SCFI', 'CCFI'], top: 0, textStyle: { color: '#475569' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7/3', '7/10', '7/17', '7/24'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '指数点',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        {
          name: 'SCFI',
          type: 'line',
          data: [2100, 2180, 2250, 2380, 2650, 3150, 3326.87, 3184.82, 3080.31, 3062.95],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#2563eb' },
          itemStyle: { color: '#2563eb' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(37,99,235,0.15)' },
              { offset: 1, color: 'rgba(37,99,235,0.02)' }
            ])
          }
        },
        {
          name: 'CCFI',
          type: 'line',
          data: [1500, 1550, 1580, 1620, 1750, 1880, null, null, 1910.67, 1901.27],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#0ea5e9' },
          itemStyle: { color: '#0ea5e9' },
          connectNulls: true
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartFreight() {
    var chart = echarts.init(document.getElementById('chart-freight'));
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['美西（美元/FEU）', '美东（美元/FEU）'], top: 0, textStyle: { color: '#475569' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7/3', '7/10', '7/17', '7/24'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '美元/FEU',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        {
          name: '美西（美元/FEU）',
          type: 'line',
          data: [3200, 3350, 3500, 4200, 5200, 6100, 6630, 6219, 5721, 5535],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#ef4444' },
          itemStyle: { color: '#ef4444' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(239,68,68,0.12)' },
              { offset: 1, color: 'rgba(239,68,68,0.02)' }
            ])
          }
        },
        {
          name: '美东（美元/FEU）',
          type: 'line',
          data: [4500, 4700, 4900, 5800, 7200, 8200, 8296, 8134, 8172, 8040],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(245,158,11,0.12)' },
              { offset: 1, color: 'rgba(245,158,11,0.02)' }
            ])
          }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartUsImport() {
    var chart = echarts.init(document.getElementById('chart-us-import'));
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['美国总进口TEU', '美国自中国进口TEU', '中国份额(%)'], top: 0, textStyle: { color: '#475569' } },
      grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月(预)'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: [
        {
          type: 'value',
          name: 'TEU（万）',
          nameTextStyle: { color: '#64748b', fontSize: 11 },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
          axisLabel: { color: '#64748b', fontSize: 11, formatter: '{value}' }
        },
        {
          type: 'value',
          name: '份额(%)',
          nameTextStyle: { color: '#64748b', fontSize: 11 },
          min: 0,
          max: 50,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { color: '#64748b', fontSize: 11, formatter: '{value}%' }
        }
      ],
      series: [
        {
          name: '美国总进口TEU',
          type: 'bar',
          data: [210, 195, 215, 228, 242.88, 240.10, 247],
          barWidth: '30%',
          itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '美国自中国进口TEU',
          type: 'bar',
          data: [null, null, null, null, 81.62, 81.45, null],
          barWidth: '30%',
          itemStyle: { color: '#0ea5e9', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '中国份额(%)',
          type: 'line',
          yAxisIndex: 1,
          data: [null, null, null, null, 33.6, 33.9, null],
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color: '#ef4444' },
          itemStyle: { color: '#ef4444' },
          connectNulls: false
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartPort() {
    var chart = echarts.init(document.getElementById('chart-port'));
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['上海港', '深圳港', '宁波舟山港', '青岛港'], top: 0, textStyle: { color: '#475569' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        {
          name: '上海港',
          type: 'line',
          data: [42, 38, 41, 43, 48, 47],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#2563eb' },
          itemStyle: { color: '#2563eb' }
        },
        {
          name: '深圳港',
          type: 'line',
          data: [28, 25, 27, 29, 33, 32],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#0ea5e9' },
          itemStyle: { color: '#0ea5e9' }
        },
        {
          name: '宁波舟山港',
          type: 'line',
          data: [26, 23, 25, 27, 30, 29],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#10b981' },
          itemStyle: { color: '#10b981' }
        },
        {
          name: '青岛港',
          type: 'line',
          data: [18, 16, 17, 19, 22, 21],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartCongestion() {
    var chart = echarts.init(document.getElementById('chart-congestion'));
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'shadow' } }, tooltipStyle),
      legend: { data: ['洛杉矶港', '长滩港', '正常水平'], top: 0, textStyle: { color: '#475569' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '天',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        {
          name: '洛杉矶港',
          type: 'bar',
          data: [5.0, 5.5, 6.0, 6.5, 7.5, 9.0, 10.0],
          barWidth: '25%',
          itemStyle: { color: '#ef4444', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '长滩港',
          type: 'bar',
          data: [4.5, 5.0, 5.5, 6.0, 7.0, 8.5, 9.5],
          barWidth: '25%',
          itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '正常水平',
          type: 'line',
          data: [4, 4, 4, 4, 4, 4, 4],
          lineStyle: { width: 2, type: 'dashed', color: '#94a3b8' },
          itemStyle: { color: '#94a3b8' },
          symbol: 'none'
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartBlank() {
    var chart = echarts.init(document.getElementById('chart-blank'));
    var option = {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tooltipStyle),
      legend: { data: ['实际空班数', '预测空班数'], top: 0, textStyle: { color: '#475569' } },
      grid: gridDefault,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(预)'],
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '班次数',
        nameTextStyle: { color: '#64748b', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      series: [
        {
          name: '实际空班数',
          type: 'bar',
          data: [35, 40, 42, 48, 55, 54, 39, null],
          barWidth: '35%',
          itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '预测空班数',
          type: 'bar',
          data: [null, null, null, null, null, null, null, 36],
          barWidth: '35%',
          itemStyle: { color: '#93c5fd', borderRadius: [4, 4, 0, 0] }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initAll() {
    var charts = [];
    if (document.getElementById('chart-index')) charts.push(initChartIndex());
    if (document.getElementById('chart-freight')) charts.push(initChartFreight());
    if (document.getElementById('chart-us-import')) charts.push(initChartUsImport());
    if (document.getElementById('chart-port')) charts.push(initChartPort());
    if (document.getElementById('chart-congestion')) charts.push(initChartCongestion());
    if (document.getElementById('chart-blank')) charts.push(initChartBlank());

    window.addEventListener('resize', function() {
      charts.forEach(function(c) { c.resize(); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
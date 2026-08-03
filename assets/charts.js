(function() {
  'use strict';

  var commonTooltip = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 },
    axisPointer: { type: 'line', lineStyle: { color: '#94a3b8', type: 'dashed' } }
  };

  var commonGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var dualAxisGrid = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };

  function initChartIndex() {
    var chart = echarts.init(document.getElementById('chart-index'));
    var option = {
      tooltip: commonTooltip,
      legend: { data: ['SCFI', 'CCFI'], bottom: 0, textStyle: { color: '#64748b' } },
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b' }
      },
      series: [
        {
          name: 'SCFI',
          type: 'line',
          data: [2341, 2156, 2489, 2612, 2890, 3056, 3206],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#2563eb', width: 3 },
          itemStyle: { color: '#2563eb' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(37,99,235,0.15)' },
                { offset: 1, color: 'rgba(37,99,235,0.01)' }
              ]
            }
          }
        },
        {
          name: 'CCFI',
          type: 'line',
          data: [1412, 1386, 1523, 1618, 1724, 1901, 1857],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#0ea5e9', width: 3 },
          itemStyle: { color: '#0ea5e9' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(14,165,233,0.12)' },
                { offset: 1, color: 'rgba(14,165,233,0.01)' }
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
    var chart = echarts.init(document.getElementById('chart-freight'));
    var option = {
      tooltip: commonTooltip,
      legend: { data: ['美西现货', '美东现货'], bottom: 0, textStyle: { color: '#64748b' } },
      grid: dualAxisGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        name: '美元/FEU',
        nameTextStyle: { color: '#94a3b8', fontSize: 11 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b' }
      },
      series: [
        {
          name: '美西现货',
          type: 'line',
          data: [3850, 3420, 4150, 4680, 5721, 6350, 6229],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#10b981', width: 3 },
          itemStyle: { color: '#10b981' }
        },
        {
          name: '美东现货',
          type: 'line',
          data: [5200, 4780, 5450, 6120, 7580, 8450, 9054],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#f59e0b', width: 3 },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartVolume() {
    var chart = echarts.init(document.getElementById('chart-volume'));
    var option = {
      tooltip: commonTooltip,
      legend: { data: ['美国总进口', '自华进口'], bottom: 0, textStyle: { color: '#64748b' } },
      grid: dualAxisGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: [
        {
          type: 'value',
          name: '万TEU',
          nameTextStyle: { color: '#94a3b8', fontSize: 11 },
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
          axisLabel: { color: '#64748b' }
        }
      ],
      series: [
        {
          name: '美国总进口',
          type: 'bar',
          data: [228.5, 197.3, 219.8, 226.4, 243.0, 240.1],
          barWidth: '30%',
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#93c5fd' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: '自华进口',
          type: 'bar',
          data: [72.4, 58.6, 68.2, 67.7, 81.6, 81.4],
          barWidth: '30%',
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#ef4444' },
                { offset: 1, color: '#fca5a5' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartShare() {
    var chart = echarts.init(document.getElementById('chart-share'));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#1a2332', fontSize: 12 },
        formatter: function(params) {
          return params[0].name + '<br/>' + params[0].marker + ' 中国份额: ' + params[0].value + '%';
        }
      },
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        min: 25,
        max: 36,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', formatter: '{value}%' }
      },
      series: [
        {
          name: '中国份额',
          type: 'line',
          data: [31.7, 29.7, 31.0, 29.9, 33.6, 33.9],
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#ef4444', width: 3 },
          itemStyle: { color: '#ef4444' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(239,68,68,0.12)' },
                { offset: 1, color: 'rgba(239,68,68,0.01)' }
              ]
            }
          },
          markLine: {
            silent: true,
            lineStyle: { color: '#94a3b8', type: 'dashed' },
            data: [{ yAxis: 33.9, label: { formatter: '6月: 33.9%', color: '#64748b', fontSize: 10 } }]
          }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartForecast() {
    var chart = echarts.init(document.getElementById('chart-forecast'));
    var option = {
      tooltip: commonTooltip,
      legend: { data: ['美西现货(实际)', '美东现货(实际)', '美西预测', '美东预测'], bottom: 0, textStyle: { color: '#64748b' } },
      grid: { left: 55, right: 50, top: 35, bottom: 55, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(E)', '9月(E)', '10月(E)'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: [
        {
          type: 'value',
          name: '美元/FEU',
          nameTextStyle: { color: '#94a3b8', fontSize: 11 },
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
          axisLabel: { color: '#64748b' }
        }
      ],
      series: [
        {
          name: '美西现货(实际)',
          type: 'line',
          data: [3850, 3420, 4150, 4680, 5721, 6350, 6229, null, null, null],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#10b981', width: 3 },
          itemStyle: { color: '#10b981' }
        },
        {
          name: '美东现货(实际)',
          type: 'line',
          data: [5200, 4780, 5450, 6120, 7580, 8450, 9054, null, null, null],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#f59e0b', width: 3 },
          itemStyle: { color: '#f59e0b' }
        },
        {
          name: '美西预测',
          type: 'line',
          data: [null, null, null, null, null, null, 6229, 6800, 7200, 6500],
          smooth: true,
          symbol: 'diamond',
          symbolSize: 8,
          lineStyle: { color: '#10b981', width: 3, type: 'dashed' },
          itemStyle: { color: '#10b981' }
        },
        {
          name: '美东预测',
          type: 'line',
          data: [null, null, null, null, null, null, 9054, 9800, 10200, 9200],
          smooth: true,
          symbol: 'diamond',
          symbolSize: 8,
          lineStyle: { color: '#f59e0b', width: 3, type: 'dashed' },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initChartIndex();
    initChartFreight();
    initChartVolume();
    initChartShare();
    initChartForecast();
  });
})();

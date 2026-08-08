(function() {
  'use strict';

  var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
  var monthFull = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08-07'];

  function initChartIndex() {
    var el = document.getElementById('chart-index');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['SCFI', 'CCFI'],
        top: 5,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' }
      },
      yAxis: [
        {
          type: 'value',
          name: 'SCFI',
          position: 'left',
          axisLine: { show: true, lineStyle: { color: '#2563eb' } },
          axisLabel: { color: '#2563eb' },
          splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        {
          type: 'value',
          name: 'CCFI',
          position: 'right',
          axisLine: { show: true, lineStyle: { color: '#059669' } },
          axisLabel: { color: '#059669' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: 'SCFI',
          type: 'line',
          data: [2450.30, 2380.15, 2520.80, 2680.45, 2850.20, 3020.60, 3172.19, 3276.14],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#2563eb' },
          itemStyle: { color: '#2563eb' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(37,99,235,0.15)' },
                { offset: 1, color: 'rgba(37,99,235,0.02)' }
              ]
            }
          }
        },
        {
          name: 'CCFI',
          type: 'line',
          yAxisIndex: 1,
          data: [1412.50, 1385.20, 1450.60, 1520.30, 1580.70, 1620.40, 1870.66, 1839.61],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#059669' },
          itemStyle: { color: '#059669' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(5,150,105,0.15)' },
                { offset: 1, color: 'rgba(5,150,105,0.02)' }
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
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'cross' },
        formatter: function(params) {
          var res = params[0].axisValue + '<br/>';
          for (var i = 0; i < params.length; i++) {
            res += params[i].marker + ' ' + params[i].seriesName + ': $' + params[i].value.toLocaleString() + '/FEU<br/>';
          }
          return res;
        }
      },
      legend: {
        data: ['美西', '美东'],
        top: 5,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' }
      },
      yAxis: {
        type: 'value',
        name: '美元/FEU',
        axisLine: { show: true, lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568', formatter: '${value}' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      series: [
        {
          name: '美西',
          type: 'line',
          data: [3850, 3720, 3980, 4250, 4680, 5350, 6067, 6229],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#0891b2' },
          itemStyle: { color: '#0891b2' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(8,145,178,0.15)' },
                { offset: 1, color: 'rgba(8,145,178,0.02)' }
              ]
            }
          }
        },
        {
          name: '美东',
          type: 'line',
          data: [5620, 5450, 5780, 6100, 6720, 7580, 8339, 8134],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#7c3aed' },
          itemStyle: { color: '#7c3aed' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(124,58,237,0.15)' },
                { offset: 1, color: 'rgba(124,58,237,0.02)' }
              ]
            }
          }
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
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['自华进口TEU', '中国份额(%)'],
        top: 5,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 50, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' }
      },
      yAxis: [
        {
          type: 'value',
          name: '万TEU',
          position: 'left',
          axisLine: { show: true, lineStyle: { color: '#2563eb' } },
          axisLabel: { color: '#2563eb' },
          splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        {
          type: 'value',
          name: '份额(%)',
          position: 'right',
          min: 28,
          max: 36,
          axisLine: { show: true, lineStyle: { color: '#d97706' } },
          axisLabel: { color: '#d97706', formatter: '{value}%' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '自华进口TEU',
          type: 'bar',
          data: [68.2, 62.5, 71.8, 75.3, 81.6, 81.4],
          barWidth: '40%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#1d4ed8' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: '中国份额(%)',
          type: 'line',
          yAxisIndex: 1,
          data: [32.1, 31.5, 32.6, 32.9, 33.6, 33.9],
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color: '#d97706' },
          itemStyle: { color: '#d97706', borderWidth: 2, borderColor: '#fff' }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initChartTotal() {
    var el = document.getElementById('chart-total');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'cross' },
        formatter: function(params) {
          var res = params[0].axisValue + '<br/>';
          for (var i = 0; i < params.length; i++) {
            var val = params[i].value;
            if (val === null || val === undefined) {
              res += params[i].marker + ' ' + params[i].seriesName + ': 待发布<br/>';
            } else {
              res += params[i].marker + ' ' + params[i].seriesName + ': ' + val + '万TEU<br/>';
            }
          }
          return res;
        }
      },
      legend: {
        data: ['实际进口', 'NRF预测'],
        top: 5,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' }
      },
      yAxis: {
        type: 'value',
        name: '万TEU',
        axisLine: { show: true, lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      series: [
        {
          name: '实际进口',
          type: 'bar',
          data: [212.5, 198.3, 220.4, 228.7, 242.9, 240.1, null, null, null, null],
          barWidth: '35%',
          itemStyle: {
            color: '#6366f1',
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: 'NRF预测',
          type: 'line',
          data: [null, null, null, null, null, 240.1, 221, 215, 210, 225],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3, color: '#ec4899', type: 'dashed' },
          itemStyle: { color: '#ec4899' },
          connectNulls: true
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
    initChartTotal();
  });
})();

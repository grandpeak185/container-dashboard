(function() {
  'use strict';

  var isMobile = window.innerWidth < 768;

  function initFreightChart() {
    var el = document.getElementById('chart-freight');
    if (!el) return;
    var chart = echarts.init(el);

    var weeks = [
      '1/3','1/10','1/17','1/24','1/31',
      '2/7','2/14','2/21','2/28',
      '3/7','3/14','3/21','3/28',
      '4/4','4/11','4/18','4/25',
      '5/2','5/9','5/16','5/23','5/30',
      '6/6','6/13','6/20','6/27',
      '7/4','7/11','7/18','7/25',
      '8/1','8/8','8/15','8/22','8/29',
      '9/5','9/12','9/19','9/26'
    ];

    var scfiData = [
      2150,2180,2200,2250,2280,
      2100,2050,2080,2150,
      2100,2120,2150,2180,
      2100,2000,1920,1875,
      1950,2100,2300,2500,2700,
      2900,3100,3121,3239,
      3400,3550,3600,3500,
      3300,3100,2900,2800,2750,
      2700,2650,2600,2550
    ];

    var usWestData = [
      3200,3250,3300,3400,3450,
      3000,2950,2980,3100,
      3050,3080,3100,3150,
      3200,3400,3600,3500,
      3800,4200,4500,4800,5100,
      5300,5683,5900,6067,
      6800,7200,7500,7600,
      7000,6200,5600,5200,5000,
      4800,4600,4500,4400
    ];

    var usEastData = [
      4500,4600,4700,4800,4900,
      4300,4200,4250,4400,
      4350,4380,4400,4450,
      4500,4700,4900,4800,
      5200,5600,5900,6200,6600,
      6800,7200,7300,7384,
      8200,8600,8900,9100,
      8500,7800,7200,6800,6500,
      6300,6100,6000,5900
    ];

    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1a1a2e', fontSize: 12 },
        axisPointer: { type: 'cross', crossStyle: { color: '#999' } }
      },
      legend: {
        data: ['SCFI综合指数','上海-美西现货(USD/FEU)','上海-美东现货(USD/FEU)'],
        bottom: 0,
        textStyle: { fontSize: 11, color: '#5a5a6e' },
        itemWidth: 18,
        itemHeight: 10
      },
      grid: {
        left: 48, right: 48, top: 40, bottom: 56,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: weeks,
        axisLabel: { fontSize: 10, color: '#5a5a6e', rotate: isMobile ? 45 : 0 },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          name: 'SCFI',
          position: 'left',
          nameTextStyle: { color: '#5a5a6e', fontSize: 11 },
          axisLabel: { fontSize: 10, color: '#5a5a6e' },
          splitLine: { lineStyle: { color: '#f3f4f6' } },
          axisLine: { show: false }
        },
        {
          type: 'value',
          name: 'USD/FEU',
          position: 'right',
          nameTextStyle: { color: '#5a5a6e', fontSize: 11 },
          axisLabel: { fontSize: 10, color: '#5a5a6e' },
          splitLine: { show: false },
          axisLine: { show: false }
        }
      ],
      series: [
        {
          name: 'SCFI综合指数',
          type: 'line',
          data: scfiData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#2563eb' },
          itemStyle: { color: '#2563eb' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(37,99,235,0.15)' },
                { offset: 1, color: 'rgba(37,99,235,0.01)' }
              ]
            }
          },
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { type: 'dashed', color: '#ef4444', width: 1 },
            data: [
              { xAxis: '6/27', label: { formatter: '预测→', fontSize: 10, color: '#ef4444' } }
            ]
          }
        },
        {
          name: '上海-美西现货(USD/FEU)',
          type: 'line',
          yAxisIndex: 1,
          data: usWestData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2, color: '#10b981' },
          itemStyle: { color: '#10b981' }
        },
        {
          name: '上海-美东现货(USD/FEU)',
          type: 'line',
          yAxisIndex: 1,
          data: usEastData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initVolumeChart() {
    var el = document.getElementById('chart-volume');
    if (!el) return;
    var chart = echarts.init(el);

    var months = ['1月','2月','3月','4月','5月','6月','7月(预)','8月(预)','9月(预)'];

    var totalImport = [
      231.9,
      null,
      235.4,
      228.0,
      242.9,
      null,
      250,
      245,
      238
    ];

    var chinaImport = [
      65.3,
      null,
      null,
      68.1,
      81.6,
      null,
      85,
      82,
      78
    ];

    var chinaShare = [
      28.2,
      null,
      null,
      29.9,
      33.6,
      null,
      34.0,
      33.5,
      32.8
    ];

    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1a1a2e', fontSize: 12 },
        axisPointer: { type: 'cross', crossStyle: { color: '#999' } },
        formatter: function(params) {
          var res = params[0].axisValue + '<br/>';
          for (var i = 0; i < params.length; i++) {
            var p = params[i];
            if (p.value == null) continue;
            if (p.seriesName === '中国份额(%)') {
              res += p.marker + ' ' + p.seriesName + ': ' + p.value + '%<br/>';
            } else {
              res += p.marker + ' ' + p.seriesName + ': ' + p.value + '万TEU<br/>';
            }
          }
          return res;
        }
      },
      legend: {
        data: ['美国总进口(万TEU)','美国自中国进口(万TEU)','中国份额(%)'],
        bottom: 0,
        textStyle: { fontSize: 11, color: '#5a5a6e' },
        itemWidth: 18,
        itemHeight: 10
      },
      grid: {
        left: 48, right: 48, top: 40, bottom: 56,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { fontSize: 11, color: '#5a5a6e' },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          name: '万TEU',
          position: 'left',
          nameTextStyle: { color: '#5a5a6e', fontSize: 11 },
          axisLabel: { fontSize: 10, color: '#5a5a6e' },
          splitLine: { lineStyle: { color: '#f3f4f6' } },
          axisLine: { show: false }
        },
        {
          type: 'value',
          name: '占比%',
          position: 'right',
          min: 0, max: 50,
          nameTextStyle: { color: '#5a5a6e', fontSize: 11 },
          axisLabel: { fontSize: 10, color: '#5a5a6e', formatter: '{value}%' },
          splitLine: { show: false },
          axisLine: { show: false }
        }
      ],
      series: [
        {
          name: '美国总进口(万TEU)',
          type: 'bar',
          data: totalImport,
          barWidth: '30%',
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#60a5fa' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: '美国自中国进口(万TEU)',
          type: 'bar',
          data: chinaImport,
          barWidth: '30%',
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#10b981' },
                { offset: 1, color: '#34d399' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: '中国份额(%)',
          type: 'line',
          yAxisIndex: 1,
          data: chinaShare,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5, color: '#ef4444' },
          itemStyle: { color: '#ef4444' },
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { type: 'dashed', color: '#ef4444', width: 1 },
            data: [
              { xAxis: '5月', label: { formatter: '预测→', fontSize: 10, color: '#ef4444' } }
            ]
          }
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initCharts() {
    initFreightChart();
    initVolumeChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
  } else {
    initCharts();
  }
})();

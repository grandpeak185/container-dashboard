(function() {
  'use strict';

  var months = ['1月','2月','3月','4月','5月','6月','7月'];
  var weeks = ['6/6','6/13','6/20','6/27','7/4','7/11','7/18','7/25'];

  function initSCFI() {
    var chart = echarts.init(document.getElementById('chart-scfi'));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' }
      },
      legend: {
        data: ['SCFI综合指数'],
        bottom: 0,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: weeks,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' }
      },
      yAxis: {
        type: 'value',
        min: 2800,
        max: 3400,
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#4a5568' }
      },
      series: [{
        name: 'SCFI综合指数',
        type: 'line',
        data: [3250, 3320, 3380, 3350, 3270, 3185, 3080, 3063],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#2563eb' },
        itemStyle: { color: '#2563eb' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(37,99,235,0.2)' },
              { offset: 1, color: 'rgba(37,99,235,0.02)' }
            ]
          }
        }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initCCFI() {
    var chart = echarts.init(document.getElementById('chart-ccfi'));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' }
      },
      legend: {
        data: ['CCFI综合指数'],
        bottom: 0,
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
        min: 1400,
        max: 2000,
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#4a5568' }
      },
      series: [{
        name: 'CCFI综合指数',
        type: 'line',
        data: [1480, 1520, 1580, 1650, 1750, 1811, 1901],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#0d9488' },
        itemStyle: { color: '#0d9488' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(13,148,136,0.2)' },
              { offset: 1, color: 'rgba(13,148,136,0.02)' }
            ]
          }
        }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initFreight() {
    var chart = echarts.init(document.getElementById('chart-freight'));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' }
      },
      legend: {
        data: ['美西现货($/FEU)', '美东现货($/FEU)'],
        bottom: 0,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1/10','1/24','2/14','2/28','3/14','3/28','4/11','4/25','5/9','5/23','6/6','6/20','7/4','7/18','7/24'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        min: 3000,
        max: 9000,
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#4a5568', formatter: '${value}' }
      },
      series: [
        {
          name: '美西现货($/FEU)',
          type: 'line',
          data: [3800, 3700, 3650, 3600, 4000, 4200, 4500, 4800, 5800, 6200, 6000, 5800, 5800, 5720, 5535],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 3, color: '#2563eb' },
          itemStyle: { color: '#2563eb' }
        },
        {
          name: '美东现货($/FEU)',
          type: 'line',
          data: [5600, 5500, 5450, 5400, 5800, 6000, 6400, 6800, 7900, 8200, 8100, 8000, 8200, 8170, 8040],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 3, color: '#7c3aed' },
          itemStyle: { color: '#7c3aed' }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initUSImport() {
    var chart = echarts.init(document.getElementById('chart-us-import'));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' }
      },
      legend: {
        data: ['美国总进口(万TEU)', '自中国进口(万TEU)', '中国份额(%)'],
        bottom: 0,
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
          name: 'TEU(万)',
          min: 0,
          max: 300,
          splitLine: { lineStyle: { color: '#f1f5f9' } },
          axisLabel: { color: '#4a5568' },
          nameTextStyle: { color: '#4a5568' }
        },
        {
          type: 'value',
          name: '份额(%)',
          min: 25,
          max: 40,
          splitLine: { show: false },
          axisLabel: { color: '#4a5568', formatter: '{value}%' },
          nameTextStyle: { color: '#4a5568' }
        }
      ],
      series: [
        {
          name: '美国总进口(万TEU)',
          type: 'bar',
          data: [218.5, 195.3, 210.7, 225.4, 242.9, 245, null],
          itemStyle: { color: 'rgba(37,99,235,0.7)', borderRadius: [4,4,0,0] },
          barMaxWidth: 30
        },
        {
          name: '自中国进口(万TEU)',
          type: 'bar',
          data: [68.2, 58.5, 65.1, 70.3, 81.6, 81.5, null],
          itemStyle: { color: 'rgba(13,148,136,0.7)', borderRadius: [4,4,0,0] },
          barMaxWidth: 30
        },
        {
          name: '中国份额(%)',
          type: 'line',
          yAxisIndex: 1,
          data: [31.2, 30.0, 30.9, 31.2, 33.6, 33.9, null],
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
          lineStyle: { width: 3, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initCongestion() {
    var chart = echarts.init(document.getElementById('chart-congestion'));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        formatter: function(params) {
          var r = params[0].name + '<br/>';
          for (var i = 0; i < params.length; i++) {
            r += params[i].marker + ' ' + params[i].seriesName + ': ' + params[i].value + '%<br/>';
          }
          return r;
        }
      },
      legend: {
        data: ['上海港','洛杉矶港','长滩港'],
        bottom: 0,
        textStyle: { color: '#4a5568' }
      },
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['1月','2月','3月','4月','5月','6月','7月'],
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#4a5568' }
      },
      yAxis: {
        type: 'value',
        min: 60,
        max: 100,
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#4a5568', formatter: '{value}%' }
      },
      series: [
        {
          name: '上海港',
          type: 'line',
          data: [82, 80, 85, 88, 90, 92, 94],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#dc2626' },
          itemStyle: { color: '#dc2626' }
        },
        {
          name: '洛杉矶港',
          type: 'line',
          data: [72, 70, 75, 78, 82, 84, 86],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#ea580c' },
          itemStyle: { color: '#ea580c' }
        },
        {
          name: '长滩港',
          type: 'line',
          data: [70, 68, 73, 76, 80, 82, 83],
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
  }

  function initAll() {
    initSCFI();
    initCCFI();
    initFreight();
    initUSImport();
    initCongestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();

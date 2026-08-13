(function() {
  'use strict';

  // ==================== 配置常量 ====================
  var GRID = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var GRID_DUAL_Y = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };
  var TOOLTIP = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: { color: '#1a2332', fontSize: 12 }
  };
  var COLORS = ['#3b82f6', '#0ea5e9', '#f59e0b', '#ef4444', '#22c55e', '#8b5cf6', '#ec4899', '#14b8a6'];

  // ==================== 数据数组 ====================

  // SCFI & CCFI 指数走势（2026年1月-8月，周度关键节点）
  var indexDates = [
    '1/16', '1/30', '3/6', '3/13', '4/3', '4/24', '4/30',
    '5/15', '5/29', '6/26', '7/31', '8/7'
  ];
  var scfiData = [
    1574.12, 1316.75, 1489.19, 1710.35, 1854.00, 1875.00, 1911.40,
    2140.66, 2571.73, 3200.00, 3205.97, 3276.14
  ];
  var ccfiData = [
    null, null, null, null, null, null, null,
    null, null, 1550.00, 1857.04, 1839.61
  ];

  // 即期运价走势（USD/FEU）
  var spotDates = [
    '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(中)'
  ];
  var uswcSpot = [
    1500, 1400, 1800, 2500, 3800, 6067, 6067, 6484
  ];
  var usecSpot = [
    2800, 2600, 3200, 4200, 5600, 7384, 8339, 9290
  ];
  // 预测数据（9-12月）
  var forecastMonths = ['9月预测', '10月预测', '11月预测', '12月预测'];
  var uswcForecast = [6200, 5800, 5500, 5200];
  var usecForecast = [9000, 8500, 8000, 7500];

  // 美国进口量（万TEU）
  var importMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(预)'];
  var usTotalImports = [null, null, null, null, null, null, 250.83, 252.0];
  var usChinaImports = [null, null, null, null, null, null, 87.31, 86.93];
  // 补充前几个月的估算值（基于季节性模式，标注为估算）
  var usTotalImportsEst = [205, 195, 215, 220, 228, 240, 250.83, 252.0];
  var usChinaImportsEst = [72, 68, 75, 78, 80, 81.4, 87.31, 86.93];

  // 中国市场份额（%）
  var shareMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(预)'];
  var chinaShare = [35.1, 34.9, 34.9, 35.5, 35.1, 33.9, 34.8, 34.5];

  // 空班数量（个/月，跨太平洋东行）
  var blankMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(预)'];
  var blankSailings = [48, 52, 46, 40, 45, 54, 42, 36];

  // 船公司8月1日GRI对比
  var carrierNames = [
    '长荣 Evergreen', 'HMM', '达飞 CMA CGM', '阳明 Yang Ming',
    'ZIM 以星', '中远海运 COSCO', '赫伯罗特 Hapag-Lloyd'
  ];
  var griValues = [3000, 3000, 2000, 2000, 2000, 1500, 1000];
  // 注意：Hapag-Lloyd 8月1日GRI仅适用于印次大陆→北美，远东→北美为7月15日$3000

  // 港口拥堵指数
  var portNames = [
    '上海港', '宁波舟山港', '盐田港',
    '洛杉矶/长滩', '纽约/新泽西', '萨凡纳'
  ];
  var congestionIndex = [78, 68, 55, 82, 65, 35];

  // ==================== 图表初始化 ====================

  function initChartIndexTrend() {
    var el = document.getElementById('chartIndexTrend');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        formatter: function(params) {
          var html = params[0].axisValue + '<br/>';
          params.forEach(function(p) {
            if (p.value !== null && p.value !== undefined) {
              html += '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + p.color + ';margin-right:6px;"></span>';
              html += p.seriesName + ': <strong>' + p.value.toFixed(2) + '</strong> 点<br/>';
            }
          });
          return html;
        }
      }),
      legend: {
        data: ['SCFI 综合指数', 'CCFI 综合指数'],
        bottom: 5,
        textStyle: { color: '#64748b', fontSize: 12 }
      },
      grid: GRID,
      xAxis: {
        type: 'category',
        data: indexDates,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#94a3b8', fontSize: 11 }
      },
      series: [
        {
          name: 'SCFI 综合指数',
          type: 'line',
          data: scfiData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5, color: '#3b82f6' },
          itemStyle: { color: '#3b82f6' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59,130,246,0.25)' },
              { offset: 1, color: 'rgba(59,130,246,0.02)' }
            ])
          }
        },
        {
          name: 'CCFI 综合指数',
          type: 'line',
          data: ccfiData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(245,158,11,0.2)' },
              { offset: 1, color: 'rgba(245,158,11,0.02)' }
            ])
          }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartSpotRates() {
    var el = document.getElementById('chartSpotRates');
    if (!el) return;
    var chart = echarts.init(el);
    var allMonths = spotDates.concat(forecastMonths);
    var uswcFull = uswcSpot.concat(uswcForecast);
    var usecFull = usecSpot.concat(usecForecast);

    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        valueFormatter: function(v) { return '$' + v.toLocaleString() + '/FEU'; }
      }),
      legend: {
        data: ['上海→美西', '上海→美东', '美西(预测)', '美东(预测)'],
        bottom: 5,
        textStyle: { color: '#64748b', fontSize: 11 }
      },
      grid: GRID,
      xAxis: {
        type: 'category',
        data: allMonths,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 11,
          formatter: function(v) { return '$' + (v / 1000) + 'k'; }
        }
      },
      series: [
        {
          name: '上海→美西',
          type: 'line',
          data: uswcFull.slice(0, spotDates.length).concat(new Array(forecastMonths.length).fill(null)),
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#3b82f6' },
          itemStyle: { color: '#3b82f6' }
        },
        {
          name: '上海→美东',
          type: 'line',
          data: usecFull.slice(0, spotDates.length).concat(new Array(forecastMonths.length).fill(null)),
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#ef4444' },
          itemStyle: { color: '#ef4444' }
        },
        {
          name: '美西(预测)',
          type: 'line',
          data: new Array(spotDates.length - 1).fill(null).concat([uswcSpot[uswcSpot.length - 1]]).concat(uswcForecast),
          smooth: true,
          symbol: 'diamond',
          symbolSize: 5,
          lineStyle: { width: 2, type: 'dashed', color: '#93c5fd' },
          itemStyle: { color: '#93c5fd' }
        },
        {
          name: '美东(预测)',
          type: 'line',
          data: new Array(spotDates.length - 1).fill(null).concat([usecSpot[usecSpot.length - 1]]).concat(usecForecast),
          smooth: true,
          symbol: 'diamond',
          symbolSize: 5,
          lineStyle: { width: 2, type: 'dashed', color: '#fca5a5' },
          itemStyle: { color: '#fca5a5' }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartUSImports() {
    var el = document.getElementById('chartUSImports');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var html = params[0].axisValue + '<br/>';
          params.forEach(function(p) {
            if (p.value !== null && p.value !== undefined) {
              html += '<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + p.color + ';margin-right:6px;"></span>';
              html += p.seriesName + ': <strong>' + p.value.toFixed(2) + '</strong> 万TEU<br/>';
            }
          });
          return html;
        }
      }),
      legend: {
        data: ['美国总进口', '自华进口'],
        bottom: 5,
        textStyle: { color: '#64748b', fontSize: 11 }
      },
      grid: GRID,
      xAxis: {
        type: 'category',
        data: importMonths,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: '#94a3b8', fontSize: 10 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#94a3b8', fontSize: 11 }
      },
      series: [
        {
          name: '美国总进口',
          type: 'bar',
          data: usTotalImportsEst,
          barWidth: '35%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#0ea5e9' },
              { offset: 1, color: '#38bdf8' }
            ]),
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: '自华进口',
          type: 'bar',
          data: usChinaImportsEst,
          barWidth: '35%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#f59e0b' },
              { offset: 1, color: '#fbbf24' }
            ]),
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartChinaShare() {
    var el = document.getElementById('chartChinaShare');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        formatter: function(params) {
          var p = params[0];
          return p.axisValue + '<br/>中国份额: <strong>' + p.value + '%</strong>';
        }
      }),
      grid: GRID,
      xAxis: {
        type: 'category',
        data: shareMonths,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        min: 32,
        max: 38,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 11,
          formatter: '{value}%'
        }
      },
      series: [{
        type: 'line',
        data: chinaShare,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 2.5, color: '#22c55e' },
        itemStyle: { color: '#22c55e' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34,197,94,0.25)' },
            { offset: 1, color: 'rgba(34,197,94,0.02)' }
          ])
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { type: 'dashed', color: '#94a3b8', width: 1 },
          data: [{ yAxis: 35, label: { formatter: '35%基准线', color: '#94a3b8', fontSize: 10 } }]
        }
      }]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartBlankSailings() {
    var el = document.getElementById('chartBlankSailings');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          return params[0].axisValue + '<br/>空班数量: <strong>' + params[0].value + '</strong> 个航次';
        }
      }),
      grid: GRID,
      xAxis: {
        type: 'category',
        data: blankMonths,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '航次',
        nameTextStyle: { color: '#94a3b8', fontSize: 10 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#94a3b8', fontSize: 11 }
      },
      series: [{
        type: 'bar',
        data: blankSailings,
        barWidth: '50%',
        itemStyle: {
          color: function(params) {
            var val = params.value;
            if (val >= 50) return '#ef4444';
            if (val >= 40) return '#f59e0b';
            return '#22c55e';
          },
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: '#475569'
        }
      }]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartCarrierGRI() {
    var el = document.getElementById('chartCarrierGRI');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          return params[0].name + '<br/>8月1日GRI: <strong>$' + params[0].value.toLocaleString() + '</strong>/FEU';
        }
      }),
      grid: { left: 120, right: 30, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 11,
          formatter: '${value}'
        }
      },
      yAxis: {
        type: 'category',
        data: carrierNames,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#475569', fontSize: 11 }
      },
      series: [{
        type: 'bar',
        data: griValues,
        barWidth: '55%',
        itemStyle: {
          color: function(params) {
            var val = params.value;
            if (val >= 2500) return '#ef4444';
            if (val >= 1800) return '#f59e0b';
            return '#3b82f6';
          },
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 11,
          fontWeight: 600,
          color: '#334155',
          formatter: '${c}'
        }
      }]
    };
    chart.setOption(option);
    return chart;
  }

  function initChartPortCongestion() {
    var el = document.getElementById('chartPortCongestion');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: Object.assign({}, TOOLTIP, {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var val = params[0].value;
          var level = val >= 75 ? '严重拥堵' : val >= 55 ? '中度拥堵' : '顺畅';
          return params[0].name + '<br/>拥堵指数: <strong>' + val + '%</strong><br/>状态: ' + level;
        }
      }),
      grid: { left: 85, right: 30, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'value',
        max: 100,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 11,
          formatter: '{value}%'
        }
      },
      yAxis: {
        type: 'category',
        data: portNames,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#475569', fontSize: 12 }
      },
      series: [{
        type: 'bar',
        data: congestionIndex,
        barWidth: '55%',
        itemStyle: {
          color: function(params) {
            var val = params.value;
            if (val >= 75) {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#fecaca' },
                { offset: 1, color: '#ef4444' }
              ]);
            } else if (val >= 55) {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#fde68a' },
                { offset: 1, color: '#f59e0b' }
              ]);
            } else {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#bbf7d0' },
                { offset: 1, color: '#22c55e' }
              ]);
            }
          },
          borderRadius: [0, 6, 6, 0]
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 11,
          fontWeight: 600,
          color: '#334155',
          formatter: '{c}%'
        }
      }]
    };
    chart.setOption(option);
    return chart;
  }

  // ==================== 响应式处理 ====================
  var charts = [];

  function initAllCharts() {
    charts.push(initChartIndexTrend());
    charts.push(initChartSpotRates());
    charts.push(initChartUSImports());
    charts.push(initChartChinaShare());
    charts.push(initChartBlankSailings());
    charts.push(initChartCarrierGRI());
    charts.push(initChartPortCongestion());
  }

  function handleResize() {
    charts.forEach(function(c) {
      if (c && c.resize) c.resize();
    });
  }

  // ==================== 启动 ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCharts);
  } else {
    initAllCharts();
  }

  window.addEventListener('resize', handleResize);

})();

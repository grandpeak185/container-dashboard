(function() {
  'use strict';

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#2563eb';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#0891b2';
  var accent3 = style.getPropertyValue('--accent3').trim() || '#7c3aed';
  var ink = style.getPropertyValue('--ink').trim() || '#1a2332';
  var muted = style.getPropertyValue('--muted').trim() || '#64748b';
  var rule = style.getPropertyValue('--rule').trim() || '#e2e8f0';
  var bg2 = style.getPropertyValue('--bg2').trim() || '#ffffff';

  var tooltipStyle = {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 8px;'
  };

  var defaultGrid = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var dualGrid = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };

  var axisLabelStyle = { color: muted, fontSize: 11 };
  var axisLineStyle = { lineStyle: { color: rule } };
  var splitLineStyle = { lineStyle: { color: rule, type: 'dashed', opacity: 0.5 } };

  var charts = [];

  // ========== Chart 1: SCFI & CCFI Monthly ==========
  var el1 = document.getElementById('chart-scfi-ccfi');
  if (el1) {
    var c1 = echarts.init(el1, null, { renderer: 'svg' });
    c1.setOption({
      tooltip: tooltipStyle,
      legend: {
        data: ['SCFI综合指数', 'CCFI综合指数'],
        top: 0, right: 10,
        textStyle: { color: ink, fontSize: 11 },
        itemWidth: 14, itemHeight: 8
      },
      grid: dualGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisLabel: axisLabelStyle,
        axisLine: axisLineStyle,
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value', name: 'SCFI', nameTextStyle: { color: accent, fontSize: 10 },
          axisLabel: axisLabelStyle, axisLine: { show: false },
          splitLine: splitLineStyle, min: 800, max: 3600
        },
        {
          type: 'value', name: 'CCFI', nameTextStyle: { color: accent2, fontSize: 10 },
          axisLabel: axisLabelStyle, axisLine: { show: false },
          splitLine: { show: false }, min: 800, max: 2400
        }
      ],
      series: [
        {
          name: 'SCFI综合指数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          data: [1499, 1284, 1683, 1884, 2222, 3018, 3172],
          itemStyle: { color: accent }, lineStyle: { color: accent, width: 2.5 },
          areaStyle: { color: accent, opacity: 0.08 },
          emphasis: { itemStyle: { borderColor: accent, borderWidth: 2 } }
        },
        {
          name: 'CCFI综合指数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          yAxisIndex: 1,
          data: [1197, 1085, 1097, 1222, 1311, 1550, 1871],
          itemStyle: { color: accent2 }, lineStyle: { color: accent2, width: 2.5 },
          emphasis: { itemStyle: { borderColor: accent2, borderWidth: 2 } }
        }
      ]
    });
    charts.push(c1);
  }

  // ========== Chart 2: Spot Rates ==========
  var el2 = document.getElementById('chart-spot-rates');
  if (el2) {
    var c2 = echarts.init(el2, null, { renderer: 'svg' });
    c2.setOption({
      tooltip: Object.assign({}, tooltipStyle, {
        formatter: function(params) {
          var html = params[0].axisValue + '<br/>';
          params.forEach(function(p) {
            if (p.value !== null && p.value !== undefined && !isNaN(p.value)) {
              html += p.marker + p.seriesName + ': $' + p.value.toLocaleString() + '/FEU<br/>';
            } else {
              html += p.marker + p.seriesName + ': 公开信息不足<br/>';
            }
          });
          return html;
        }
      }),
      legend: {
        data: ['上海→美西', '上海→美东'],
        top: 0, right: 10,
        textStyle: { color: ink, fontSize: 11 },
        itemWidth: 14, itemHeight: 8
      },
      grid: defaultGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月(周)'],
        axisLabel: axisLabelStyle,
        axisLine: axisLineStyle,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: 'USD/FEU', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: Object.assign({}, axisLabelStyle, { formatter: '${value}' }),
        axisLine: { show: false }, splitLine: splitLineStyle,
        min: 0, max: 11000
      },
      series: [
        {
          name: '上海→美西', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          connectNulls: false,
          data: [2091, null, 2149, null, 3312, 5351, 6067, 6484],
          itemStyle: { color: accent }, lineStyle: { color: accent, width: 2.5 },
          areaStyle: { color: accent, opacity: 0.08 }
        },
        {
          name: '上海→美东', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          connectNulls: false,
          data: [2949, null, 3004, null, null, 6580, 8339, 9290],
          itemStyle: { color: accent2 }, lineStyle: { color: accent2, width: 2.5 }
        }
      ]
    });
    charts.push(c2);
  }

  // ========== Chart 3: TEU Volumes ==========
  var el3 = document.getElementById('chart-teu-volumes');
  if (el3) {
    var c3 = echarts.init(el3, null, { renderer: 'svg' });
    c3.setOption({
      tooltip: Object.assign({}, tooltipStyle, {
        formatter: function(params) {
          var p = params[0];
          return p.axisValue + '<br/>' + p.marker + '中国对美出口: ' +
                 (p.value / 1000).toFixed(1) + 'K TEU<br/>(' +
                 p.value.toLocaleString() + ' TEU)';
        }
      }),
      grid: defaultGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLabel: axisLabelStyle,
        axisLine: axisLineStyle,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: 'TEU', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: Object.assign({}, axisLabelStyle, { formatter: function(v) { return (v / 1000) + 'K'; } }),
        axisLine: { show: false }, splitLine: splitLineStyle
      },
      series: [{
        name: '中国对美出口TEU', type: 'bar', barWidth: '50%',
        data: [771093, 728700, 711652, 680778, 816197, 814474],
        itemStyle: {
          color: function(p) {
            var colors = [accent, accent + 'cc', accent, accent + 'cc', accent2, accent2];
            return colors[p.dataIndex] || accent;
          },
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true, position: 'top',
          formatter: function(p) { return (p.value / 1000).toFixed(0) + 'K'; },
          color: muted, fontSize: 10
        },
        markLine: {
          data: [{ type: 'average', name: '均值' }],
          lineStyle: { color: accent3, type: 'dashed', width: 1.5 },
          label: { color: accent3, fontSize: 10, formatter: '均值: {c}' },
          symbol: 'none'
        }
      }]
    });
    charts.push(c3);
  }

  // ========== Chart 4: China Share ==========
  var el4 = document.getElementById('chart-china-share');
  if (el4) {
    var c4 = echarts.init(el4, null, { renderer: 'svg' });
    c4.setOption({
      tooltip: Object.assign({}, tooltipStyle, {
        formatter: function(params) {
          var p = params[0];
          return p.axisValue + '<br/>' + p.marker + '中国份额: ' + p.value + '%';
        }
      }),
      grid: defaultGrid,
      xAxis: {
        type: 'category',
        data: ['1月', '3月', '4月', '5月', '6月'],
        axisLabel: axisLabelStyle,
        axisLine: axisLineStyle,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: '%', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: Object.assign({}, axisLabelStyle, { formatter: '{value}%' }),
        axisLine: { show: false }, splitLine: splitLineStyle,
        min: 28, max: 36
      },
      series: [{
        name: '中国占美进口份额', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8,
        data: [33.3, 30.2, 29.9, 33.6, 33.9],
        itemStyle: { color: accent }, lineStyle: { color: accent, width: 2.5 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent + '33' },
              { offset: 1, color: accent + '05' }
            ]
          }
        },
        label: {
          show: true, position: 'top',
          formatter: '{c}%', color: ink, fontSize: 11, fontWeight: 600
        },
        markPoint: {
          data: [
            { type: 'min', name: '最低点' },
            { type: 'max', name: '最高点' }
          ],
          symbolSize: 40,
          itemStyle: { color: accent2 },
          label: { color: '#fff', fontSize: 10 }
        }
      }]
    });
    charts.push(c4);
  }

  // ========== Chart 5: GRI Comparison ==========
  var el5 = document.getElementById('chart-gri-comparison');
  if (el5) {
    var c5 = echarts.init(el5, null, { renderer: 'svg' });
    c5.setOption({
      tooltip: Object.assign({}, tooltipStyle, {
        formatter: function(params) {
          var html = params[0].axisValue + '<br/>';
          params.forEach(function(p) {
            var val = p.value === 0 ? '未公告' : '$' + p.value.toLocaleString() + '/40ft';
            html += p.marker + p.seriesName + ': ' + val + '<br/>';
          });
          return html;
        }
      }),
      legend: {
        data: ['7月15日GRI', '8月1日GRI'],
        top: 0, right: 10,
        textStyle: { color: ink, fontSize: 11 },
        itemWidth: 14, itemHeight: 8
      },
      grid: defaultGrid,
      xAxis: {
        type: 'category',
        data: ['COSCO', 'CMA CGM', 'Evergreen', 'Hapag-Lloyd', 'HMM', 'Yang Ming', 'ZIM'],
        axisLabel: Object.assign({}, axisLabelStyle, { rotate: 25, fontSize: 10 }),
        axisLine: axisLineStyle,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: 'USD/40ft', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: Object.assign({}, axisLabelStyle, { formatter: '${value}' }),
        axisLine: { show: false }, splitLine: splitLineStyle,
        min: 0, max: 4000
      },
      series: [
        {
          name: '7月15日GRI', type: 'bar', barWidth: '30%',
          data: [2000, 2000, 3000, 3000, 3000, 2000, 2000],
          itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '8月1日GRI', type: 'bar', barWidth: '30%',
          data: [2000, 2000, 3000, 0, 3000, 2000, 2000],
          itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
        }
      ]
    });
    charts.push(c5);
  }

  // ========== Chart 6: Drewry WCI ==========
  var el6 = document.getElementById('chart-wci');
  if (el6) {
    var c6 = echarts.init(el6, null, { renderer: 'svg' });
    c6.setOption({
      tooltip: Object.assign({}, tooltipStyle, {
        formatter: function(params) {
          var html = params[0].axisValue + '<br/>';
          params.forEach(function(p) {
            html += p.marker + p.seriesName + ': $' + p.value.toLocaleString() + '/40ft<br/>';
          });
          return html;
        }
      }),
      legend: {
        data: ['上海→洛杉矶(美西)', '上海→纽约(美东)'],
        top: 0, right: 10,
        textStyle: { color: ink, fontSize: 11 },
        itemWidth: 14, itemHeight: 8
      },
      grid: defaultGrid,
      xAxis: {
        type: 'category',
        data: ['6月(某周)', '7月9日', '8月8日'],
        axisLabel: axisLabelStyle,
        axisLine: axisLineStyle,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: 'USD/40ft', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: Object.assign({}, axisLabelStyle, { formatter: '${value}' }),
        axisLine: { show: false }, splitLine: splitLineStyle,
        min: 4000, max: 9000
      },
      series: [
        {
          name: '上海→洛杉矶(美西)', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8,
          data: [5750, 5739, 5894],
          itemStyle: { color: accent }, lineStyle: { color: accent, width: 2.5 },
          areaStyle: { color: accent, opacity: 0.08 },
          label: { show: true, position: 'top', formatter: '${c}', color: ink, fontSize: 10 }
        },
        {
          name: '上海→纽约(美东)', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8,
          data: [7149, 7578, 7893],
          itemStyle: { color: accent2 }, lineStyle: { color: accent2, width: 2.5 },
          label: { show: true, position: 'top', formatter: '${c}', color: ink, fontSize: 10 }
        }
      ]
    });
    charts.push(c6);
  }

  // ========== Resize Handler ==========
  window.addEventListener('resize', function() {
    charts.forEach(function(c) {
      if (c && !c.isDisposed()) {
        c.resize();
      }
    });
  });

})();

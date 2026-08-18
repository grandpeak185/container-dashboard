(function() {
  'use strict';

  /* ===== Read theme CSS variables ===== */
  var css = getComputedStyle(document.documentElement);
  var accent = css.getPropertyValue('--accent').trim() || '#2563eb';
  var accent2 = css.getPropertyValue('--accent2').trim() || '#06b6d4';
  var ink = css.getPropertyValue('--ink').trim() || '#1a2332';
  var muted = css.getPropertyValue('--muted').trim() || '#64748b';
  var rule = css.getPropertyValue('--rule').trim() || '#dde6f0';
  var bg2 = css.getPropertyValue('--bg2').trim() || '#ffffff';
  var warn = css.getPropertyValue('--warn').trim() || '#f59e0b';
  var danger = css.getPropertyValue('--danger').trim() || '#ef4444';
  var good = css.getPropertyValue('--good').trim() || '#10b981';
  var cosco = css.getPropertyValue('--cosco').trim() || '#e60012';

  var charts = [];

  /* Shared tooltip style (浅色玻璃框) */
  var tipStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e2e8f0',
    textStyle: { color: '#1a2332', fontSize: 12 },
    extraCssText: 'box-shadow:0 4px 16px rgba(15,23,42,.12);border-radius:10px;'
  };

  /* Default grid (top:35, 无需为 ECharts 内置标题留空间) */
  var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
  var gridDual = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };

  function axisLine(color) {
    return { lineStyle: { color: color || rule }, textStyle: { color: muted, fontSize: 11 } };
  }
  function splitLine() {
    return { show: true, lineStyle: { color: rule, type: 'dashed' } };
  }

  /* ============================================= */
  /* Chart 1: SCFI / CCFI monthly trend            */
  /* ============================================= */
  (function() {
    var el = document.getElementById('chart-scfi-ccfi');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
    /* SCFI 月度均值；6-8月为 Opencontainer 周度整理的月内均值（8月为截至8/17部分月） */
    var scfi = [1498.94, 1200.85, 1593.95, 1883.78, 2002.09, 3018.26, 3172.18, 3356.29];
    var ccfi = [1197.27, 1084.95, 1120.61, 1221.80, null, null, null, 1846.96];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis' }, tipStyle),
      legend: {
        data: ['SCFI 综合指数', 'CCFI 综合指数'],
        top: 2, right: 10, textStyle: { color: muted, fontSize: 11 }, itemWidth: 14, itemHeight: 8
      },
      grid: gridDual,
      xAxis: {
        type: 'category', data: months, boundaryGap: true,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: [
        {
          type: 'value', name: 'SCFI(点)', nameTextStyle: { color: muted, fontSize: 10 },
          axisLine: axisLine().lineStyle, axisLabel: { color: muted, fontSize: 11 },
          splitLine: splitLine()
        },
        {
          type: 'value', name: 'CCFI(点)', nameTextStyle: { color: muted, fontSize: 10 },
          axisLine: axisLine().lineStyle, axisLabel: { color: muted, fontSize: 11 },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: 'SCFI 综合指数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          data: scfi, yAxisIndex: 0,
          lineStyle: { width: 2.5, color: accent }, itemStyle: { color: accent },
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: 'rgba(37,99,235,.18)' }, { offset: 1, color: 'rgba(37,99,235,0)' }
          ]}},
          emphasis: { itemStyle: { borderColor: accent, borderWidth: 2 } },
          markPoint: {
            symbol: 'pin', symbolSize: 44, data: [
              { type: 'max', name: '最高', itemStyle: { color: accent } }
            ],
            label: { fontSize: 10, color: '#fff' }
          },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: warn, type: 'dotted', width: 1 },
            data: [{ xAxis: 7, label: { show: true, formatter: '8月部分月', color: warn, fontSize: 10 } }]
          }
        },
        {
          name: 'CCFI 综合指数', type: 'line', smooth: true, symbol: 'diamond', symbolSize: 7,
          data: ccfi, yAxisIndex: 1, connectNulls: false,
          lineStyle: { width: 2.5, color: accent2, type: 'dashed' }, itemStyle: { color: accent2 }
        }
      ]
    });
    charts.push(chart);
  })();

  /* ============================================= */
  /* Chart 2: Shanghai-US spot rates                */
  /* ============================================= */
  (function() {
    var el = document.getElementById('chart-spot-rates');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    /* 实际值：4月、5月下旬、6月下旬、7/31(SCFI)、8/6(Xeneta)、8/14(新浪/SCFI) */
    var periods = ['4月', '5月下旬', '6月下旬', '7/31(SCFI)', '8/6(Xeneta)', '8/14(SCFI)'];
    var usWest = [2566, 3473, 5750, 6629, 6824, 6484];
    var usEast = [3543, 4597, 7149, 9054, 9988, 9290];
    /* 预测：9月 */
    var fcLabels = ['9月(预测)'];
    var fcWest = [6100];
    var fcEast = [8900];
    var nullPad = usWest.map(function() { return null; });

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis', valueFormatter: function(v){ return v == null ? '—' : '$' + Number(v).toLocaleString() + '/FEU'; } }, tipStyle),
      legend: {
        data: ['美西', '美东', '美西(预测)', '美东(预测)'],
        top: 2, right: 10, textStyle: { color: muted, fontSize: 11 }, itemWidth: 14, itemHeight: 8
      },
      grid: gridDefault,
      xAxis: {
        type: 'category', data: periods.concat(fcLabels), boundaryGap: true,
        axisLine: { lineStyle: { color: rule } }, axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10, rotate: 0 }
      },
      yAxis: {
        type: 'value', name: 'USD/FEU', nameTextStyle: { color: muted, fontSize: 10 },
        axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11, formatter: '${value}' },
        splitLine: splitLine(), min: 2000
      },
      series: [
        {
          name: '美西', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          data: usWest, lineStyle: { width: 2.5, color: accent }, itemStyle: { color: accent },
          areaStyle: { color: { type: 'linear', x:0,y:0,x2:0,y2:1, colorStops: [
            { offset: 0, color: 'rgba(37,99,235,.15)' }, { offset: 1, color: 'rgba(37,99,235,0)' }
          ]}}
        },
        {
          name: '美东', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
          data: usEast, lineStyle: { width: 2.5, color: danger }, itemStyle: { color: danger },
          areaStyle: { color: { type: 'linear', x:0,y:0,x2:0,y2:1, colorStops: [
            { offset: 0, color: 'rgba(239,68,68,.15)' }, { offset: 1, color: 'rgba(239,68,68,0)' }
          ]}}
        },
        {
          name: '美西(预测)', type: 'line', smooth: true, symbol: 'diamond', symbolSize: 6,
          data: nullPad.concat(fcWest),
          lineStyle: { width: 2, color: accent, type: 'dashed' }, itemStyle: { color: accent, opacity: 0.7 }
        },
        {
          name: '美东(预测)', type: 'line', smooth: true, symbol: 'diamond', symbolSize: 6,
          data: nullPad.concat(fcEast),
          lineStyle: { width: 2, color: danger, type: 'dashed' }, itemStyle: { color: danger, opacity: 0.7 }
        }
      ]
    });
    charts.push(chart);
  })();

  /* ============================================= */
  /* Chart 3: US imports from China + share         */
  /* ============================================= */
  (function() {
    var el = document.getElementById('chart-us-china');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
    /* 1-7月均为 Descartes 公布值（已补全3月） */
    var teu = [771093, 728562, 711652, 680778, 816197, 814474, 873129];
    var share = [33.3, 34.8, 30.2, 29.9, 33.6, 33.9, 34.8];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis' }, tipStyle),
      legend: {
        data: ['美自华进口TEU', '中国份额(%)'],
        top: 2, right: 10, textStyle: { color: muted, fontSize: 11 }, itemWidth: 14, itemHeight: 8
      },
      grid: gridDual,
      xAxis: {
        type: 'category', data: months, boundaryGap: true,
        axisLine: { lineStyle: { color: rule } }, axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: [
        {
          type: 'value', name: 'TEU', nameTextStyle: { color: muted, fontSize: 10 },
          axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11, formatter: function(v){ return (v/1000)+'k'; } },
          splitLine: splitLine()
        },
        {
          type: 'value', name: '份额%', nameTextStyle: { color: muted, fontSize: 10 },
          min: 25, max: 40, axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '美自华进口TEU', type: 'bar', data: teu, yAxisIndex: 0, barWidth: '45%',
          itemStyle: {
            color: { type: 'linear', x:0,y:0,x2:0,y2:1, colorStops: [
              { offset: 0, color: accent }, { offset: 1, color: accent2 }
            ]}, borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: true, position: 'top', color: muted, fontSize: 9, formatter: function(p){
              return (p.value/1000).toFixed(0)+'k';
            }
          }
        },
        {
          name: '中国份额(%)', type: 'line', data: share, yAxisIndex: 1, smooth: true,
          symbol: 'circle', symbolSize: 7, connectNulls: false,
          lineStyle: { width: 2.5, color: warn }, itemStyle: { color: warn }
        }
      ]
    });
    charts.push(chart);
  })();

  /* ============================================= */
  /* Chart 4: US total imports                      */
  /* ============================================= */
  (function() {
    var el = document.getElementById('chart-us-total');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
    /* 已补全3月 Descartes 公布值 */
    var teu = [2318722, 2093422, 2353611, 2277965, 2428758, 2400627, 2508310];

    chart.setOption({
      tooltip: Object.assign({ trigger: 'axis', valueFormatter: function(v){ return v == null ? '公开信息不足' : Number(v).toLocaleString() + ' TEU'; } }, tipStyle),
      grid: gridDefault,
      xAxis: {
        type: 'category', data: months, boundaryGap: true,
        axisLine: { lineStyle: { color: rule } }, axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value', name: 'TEU', nameTextStyle: { color: muted, fontSize: 10 },
        axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11, formatter: function(v){ return (v/1000000).toFixed(1)+'M'; } },
        splitLine: splitLine()
      },
      series: [{
        type: 'bar', data: teu, barWidth: '50%',
        itemStyle: {
          color: { type: 'linear', x:0,y:0,x2:0,y2:1, colorStops: [
            { offset: 0, color: accent2 }, { offset: 1, color: 'rgba(6,182,212,.3)' }
          ]},
          borderRadius: [4, 4, 0, 0]
        },
        label: { show: true, position: 'top', color: muted, fontSize: 10, formatter: function(p){
          return (p.value/1000).toFixed(0)+'k';
        }}
      }]
    });
    charts.push(chart);
  })();

  /* ============================================= */
  /* Chart 5: Port congestion heatmap               */
  /* ============================================= */
  (function() {
    var el = document.getElementById('chart-congestion');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var xData = ['2月', '5月', '6月', '7月'];
    var yData = ['休斯顿', '诺福克', '查尔斯顿', '萨凡纳', '纽约/新泽西', '塔科马', '西雅图', '奥克兰', '长滩', '洛杉矶'];

    var rawData = [
      [0,9,4.0],[1,9,2.9],[2,9,5.8],[3,9,1.8],
      [0,8,5.3],[1,8,2.2],[2,8,2.3],[3,8,5.2],
      [0,7,4.7],[1,7,4.1],[2,7,4.5],[3,7,'-'],
      [0,6,6.6],[1,6,4.3],[2,6,4.4],[3,6,'-'],
      [0,5,4.2],[1,5,3.0],[2,5,3.4],[3,5,'-'],
      [0,4,6.5],[1,4,5.8],[2,4,5.0],[3,4,'-'],
      [0,3,'-'],[1,3,5.0],[2,3,4.4],[3,3,'-'],
      [0,2,'-'],[1,2,4.4],[2,2,4.2],[3,2,'-'],
      [0,1,5.5],[1,1,4.4],[2,1,4.0],[3,1,'-'],
      [0,0,5.7],[1,0,4.1],[2,0,3.7],[3,0,'-']
    ];

    var fullData = rawData.slice();
    yData.forEach(function(_, yi) {
      xData.forEach(function(_, xi) {
        if (!rawData.some(function(d){ return d[0]===xi && d[1]===yi; })) {
          fullData.push([xi, yi, '-']);
        }
      });
    });

    chart.setOption({
      tooltip: Object.assign({
        position: 'top',
        formatter: function(p) {
          var v = p.value[2];
          return yData[p.value[1]] + ' · ' + xData[p.value[0]] + '<br/>延误：' + (v === '-' ? 'N/A' : v + ' 天');
        }
      }, tipStyle),
      grid: { left: 80, right: 20, top: 35, bottom: 35, containLabel: false },
      xAxis: {
        type: 'category', data: xData, splitArea: { show: false },
        axisLine: { lineStyle: { color: rule } }, axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'category', data: yData, splitArea: { show: false },
        axisLine: { lineStyle: { color: rule } }, axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10 }
      },
      visualMap: {
        min: 1, max: 7, calculable: true, orient: 'horizontal', left: 'center', bottom: 2,
        itemWidth: 12, itemHeight: 90,
        inRange: { color: [bg2, accent2, warn, danger] },
        textStyle: { color: muted, fontSize: 10 },
        text: ['高延误', '低延误']
      },
      series: [{
        type: 'heatmap', data: fullData,
        label: {
          show: true,
          formatter: function(p) { return p.value[2] === '-' ? '' : p.value[2]; },
          color: ink, fontSize: 10, fontWeight: 600
        },
        emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,.2)' } }
      }]
    });
    charts.push(chart);
  })();

  /* ============================================= */
  /* Chart 6: Carrier surcharge comparison (Aug)    */
  /* ============================================= */
  (function() {
    var el = document.getElementById('chart-surcharge');
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    /* 2026年8月跨太平洋 GRI/PSS（40ft口径申报目标价） */
    var carriers = ['COSCO', 'CMA CGM', 'Evergreen', 'HMM', 'Yang Ming', 'ZIM', 'ONE', 'Maersk'];
    var amounts = [2000, 2000, 3000, 3000, 2000, 2000, 2000, 2000];
    var types = ['GRI', 'GRI', 'GRI', 'GRI', 'GRI', 'GRI', 'PSS', 'PSS'];

    chart.setOption({
      tooltip: Object.assign({
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var p = params[0];
          return p.name + '<br/>金额：$' + p.value.toLocaleString() + '/FEU<br/>类型：' + types[p.dataIndex] + '（8月）';
        }
      }, tipStyle),
      grid: { left: 55, right: 25, top: 35, bottom: 45, containLabel: false },
      xAxis: {
        type: 'category', data: carriers,
        axisLine: { lineStyle: { color: rule } }, axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10, interval: 0, rotate: 0 }
      },
      yAxis: {
        type: 'value', name: 'USD/FEU', nameTextStyle: { color: muted, fontSize: 10 },
        axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11, formatter: '${value}' },
        splitLine: splitLine()
      },
      series: [{
        type: 'bar', data: amounts.map(function(v, i) {
          return { value: v, itemStyle: { color: i === 0 ? cosco : accent, borderRadius: [4,4,0,0] } };
        }),
        barWidth: '52%',
        label: {
          show: true, position: 'top', color: ink, fontSize: 10, fontWeight: 700,
          formatter: '${c}'
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: muted, type: 'dashed', width: 1 },
          data: [{ type: 'average', name: '均值' }],
          label: { color: muted, fontSize: 10, formatter: '均值 ${c}' }
        }
      }]
    });
    charts.push(chart);
  })();

  /* ===== Resize handler ===== */
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      charts.forEach(function(c) { if (c) c.resize(); });
    }, 150);
  });

})();

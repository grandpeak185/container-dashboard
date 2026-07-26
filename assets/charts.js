/**
 * China-US Container Dashboard Charts
 * IIFE format, auto-executes on page load
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var colors = ['#3b82f6','#ef4444','#10b981','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#f97316','#84cc16','#d946ef'];

    var tooltipCommon = {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#1a2332' },
      axisPointer: { type: 'cross' }
    };

    var gridDefault = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
    var gridDual = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };

    var weeks = ['1/3','1/10','1/17','1/24','1/31','2/7','2/14','2/21','2/28','3/7','3/14','3/21','3/28','4/4','4/11','4/18','4/25','5/2','5/9','5/16','5/23','5/30','6/6','6/13','6/20','6/27','7/3','7/10','7/17','7/24'];
    var scfiData = [2280,2350,2420,2380,2450,2520,2480,2550,2620,2580,2650,2720,2680,2750,2820,2780,2850,2920,2880,2950,3020,2980,3050,3120,3080,3150,3220,3320,3185,3063];
    var ccfiData = [1420,1450,1480,1460,1500,1530,1510,1550,1580,1560,1600,1630,1610,1650,1680,1660,1700,1730,1710,1750,1780,1760,1800,1830,1810,1850,1880,1860,1911,1901];

    var months = ['1月','2月','3月','4月','5月','6月','7月'];
    var totalImports = [182,165,192,205,218,225,250];
    var chinaImports = [63,55,61,64,67,65,88];
    var chinaShare = [34.8,33.2,31.8,31.2,30.5,28.8,35.2];

    // 1. SCFI/CCFI trend line chart (dual Y-axis)
    var chartFreight = echarts.init(document.getElementById('chart-freight-index'));
    chartFreight.setOption({
      color: colors,
      tooltip: tooltipCommon,
      grid: gridDual,
      legend: { data: ['SCFI', 'CCFI'], top: 0, textStyle: { color: '#1e293b' } },
      xAxis: { type: 'category', data: weeks, boundaryGap: false, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', rotate: 45, fontSize: 11 } },
      yAxis: [
        { type: 'value', name: 'SCFI', position: 'left', axisLine: { show: true, lineStyle: { color: '#cbd5e1' } }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b' } },
        { type: 'value', name: 'CCFI', position: 'right', axisLine: { show: true, lineStyle: { color: '#cbd5e1' } }, splitLine: { show: false }, axisLabel: { color: '#64748b' } }
      ],
      series: [
        { name: 'SCFI', type: 'line', data: scfiData, yAxisIndex: 0, smooth: true, symbol: 'circle', symbolSize: 5, lineStyle: { width: 2.5 }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(59,130,246,0.15)'},{offset:1,color:'rgba(59,130,246,0.02)'}]) } },
        { name: 'CCFI', type: 'line', data: ccfiData, yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 5, lineStyle: { width: 2.5 } }
      ]
    });

    // 2. US total container imports monthly bar chart + China-sourced line overlay
    var chartImports = echarts.init(document.getElementById('chart-us-imports'));
    chartImports.setOption({
      color: colors,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'cross' }
      },
      grid: gridDefault,
      legend: { data: ['美国总进口', '中国来源'], top: 0, textStyle: { color: '#1e293b' } },
      xAxis: { type: 'category', data: months, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b' } },
      yAxis: { type: 'value', name: '万TEU', axisLine: { show: true, lineStyle: { color: '#cbd5e1' } }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b' } },
      series: [
        { name: '美国总进口', type: 'bar', data: totalImports, barMaxWidth: 36, itemStyle: { borderRadius: [4,4,0,0] } },
        { name: '中国来源', type: 'line', data: chinaImports, lineStyle: { width: 3 }, symbol: 'circle', symbolSize: 8 }
      ]
    });

    // 3. China share of US imports percentage line + area chart
    var chartShare = echarts.init(document.getElementById('chart-china-share'));
    chartShare.setOption({
      color: colors,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'cross' },
        formatter: function(params) {
          var res = params[0].name + '<br/>';
          params.forEach(function(p) {
            var suffix = p.seriesName === '中国份额' && p.dataIndex === 6 ? ' (预估)' : '';
            res += p.marker + ' ' + p.seriesName + ': <b>' + p.value + '%</b>' + suffix + '<br/>';
          });
          return res;
        }
      },
      grid: gridDefault,
      legend: { data: ['中国份额', '30%参考线'], top: 0, textStyle: { color: '#1e293b' } },
      xAxis: { type: 'category', data: months, boundaryGap: false, axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b' } },
      yAxis: { type: 'value', name: '%', min: 25, max: 40, axisLine: { show: true, lineStyle: { color: '#cbd5e1' } }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b', formatter: '{value}%' } },
      series: [
        { name: '中国份额', type: 'line', data: chinaShare, smooth: true, areaStyle: { opacity: 0.12 }, lineStyle: { width: 3 }, symbol: 'circle', symbolSize: 8, markPoint: { data: [{ type: 'min', name: '最低' }, { type: 'max', name: '最高' }] } },
        { name: '30%参考线', type: 'line', data: [30,30,30,30,30,30,30], lineStyle: { type: 'dashed', width: 2, color: '#94a3b8' }, symbol: 'none' }
      ]
    });

    // 4. Stacked horizontal bar chart: estimated weekly capacity by carrier
    var chartCarriers = echarts.init(document.getElementById('chart-carriers'));
    chartCarriers.setOption({
      color: colors,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332' },
        axisPointer: { type: 'shadow' }
      },
      grid: { left: 80, right: 25, top: 35, bottom: 45, containLabel: false },
      legend: { type: 'scroll', top: 0, textStyle: { color: '#1e293b' } },
      xAxis: { type: 'value', name: '千TEU', axisLine: { show: true, lineStyle: { color: '#cbd5e1' } }, splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b' } },
      yAxis: { type: 'category', data: ['跨太平洋周运力'], axisLine: { lineStyle: { color: '#cbd5e1' } }, axisLabel: { color: '#64748b', fontSize: 13, fontWeight: 600 } },
      series: [
        { name: 'COSCO', type: 'bar', stack: 'total', data: [45], barWidth: 40 },
        { name: 'OOCL', type: 'bar', stack: 'total', data: [22] },
        { name: 'CMA CGM', type: 'bar', stack: 'total', data: [38] },
        { name: 'Evergreen', type: 'bar', stack: 'total', data: [28] },
        { name: 'MSC', type: 'bar', stack: 'total', data: [52] },
        { name: 'Maersk', type: 'bar', stack: 'total', data: [48] },
        { name: 'Hapag-Lloyd', type: 'bar', stack: 'total', data: [26] },
        { name: 'ONE', type: 'bar', stack: 'total', data: [30] },
        { name: 'Yang Ming', type: 'bar', stack: 'total', data: [18] },
        { name: 'ZIM', type: 'bar', stack: 'total', data: [12] }
      ]
    });

    // Responsive resize
    window.addEventListener('resize', function() {
      chartFreight.resize();
      chartImports.resize();
      chartShare.resize();
      chartCarriers.resize();
    });
  });
})();

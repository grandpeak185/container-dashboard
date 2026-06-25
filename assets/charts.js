// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var accent4 = style.getPropertyValue('--accent4').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg3 = style.getPropertyValue('--bg3').trim();
  var success = style.getPropertyValue('--success').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var warning = style.getPropertyValue('--warning').trim();

  var months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  var monthsFull = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];

  // Common tooltip style
  var tooltipStyle = {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: accent2,
    borderWidth: 1,
    textStyle: { color: ink, fontSize: 12, fontFamily: 'Noto Sans SC' },
    appendToBody: true,
    extraCssText: 'box-shadow: 0 18px 42px rgba(31,45,71,0.18); border-radius: 12px; backdrop-filter: blur(14px);'
  };

  // Common axis style
  var axisStyle = {
    axisLine: { lineStyle: { color: rule } },
    axisTick: { lineStyle: { color: rule } },
    axisLabel: { color: muted, fontSize: 11 },
    splitLine: { lineStyle: { color: rule, type: 'dashed', opacity: 0.55 } }
  };

  // ============ Chart 1: Freight Rate ============
  var freightData = {
    west: [2200, 2100, 2300, 2476, 2900, 6300],
    east: [3800, 3600, 3900, 4002, 4500, 7500]
  };

  var chartRate = echarts.init(document.getElementById('chart-freight-rate'), null, { renderer: 'svg' });

  function getRateOption(type) {
    var series = [];
    if (type === 'all' || type === 'west') {
      series.push({
        name: '美西航线 ($/FEU)',
        type: 'line',
        data: freightData.west,
        smooth: 0.36,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: { width: 4, color: accent, shadowColor: accent, shadowBlur: 12, cap: 'round' },
        itemStyle: { color: accent, borderColor: ink, borderWidth: 1 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: accent + '55' },
            { offset: 0.55, color: accent + '18' },
            { offset: 1, color: accent + '02' }
          ])
        },
        markPoint: {
          data: [{ type: 'max', name: '最高' }],
          symbolSize: 44,
          label: { color: ink, fontSize: 10 },
          itemStyle: { color: accent + '80' }
        }
      });
    }
    if (type === 'all' || type === 'east') {
      series.push({
        name: '美东航线 ($/FEU)',
        type: 'line',
        data: freightData.east,
        smooth: 0.36,
        symbol: 'diamond',
        symbolSize: 9,
        lineStyle: { width: 4, color: accent2, shadowColor: accent2, shadowBlur: 12, cap: 'round' },
        itemStyle: { color: accent2, borderColor: ink, borderWidth: 1 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: accent2 + '45' },
            { offset: 0.55, color: accent2 + '14' },
            { offset: 1, color: accent2 + '02' }
          ])
        },
        markPoint: {
          data: [{ type: 'max', name: '最高' }],
          symbolSize: 44,
          label: { color: ink, fontSize: 10 },
          itemStyle: { color: accent2 + '80' }
        }
      });
    }
    return {
      tooltip: Object.assign({}, tooltipStyle, {
        trigger: 'axis',
        formatter: function(params) {
          var s = '<b>' + params[0].axisValue + '</b><br/>';
          params.forEach(function(p) {
            s += p.marker + ' ' + p.seriesName + ': <b>$' + p.value.toLocaleString() + '</b><br/>';
          });
          return s;
        }
      }),
      legend: {
        data: series.map(function(s) { return s.name; }),
        textStyle: { color: muted, fontSize: 11 },
        top: 5,
        right: 10
      },
      grid: { top: 50, right: 20, bottom: 30, left: 60 },
      xAxis: Object.assign({}, axisStyle, { type: 'category', data: months, boundaryGap: false }),
      yAxis: Object.assign({}, axisStyle, {
        type: 'value',
        axisLabel: { color: muted, fontSize: 11, formatter: '${value}' },
        min: 0
      }),
      series: series,
      animation: false
    };
  }

  chartRate.setOption(getRateOption('all'));

  // ============ Chart 2: Volume ============
  var volumeData = {
    china: [77.1, 72.9, 71.2, 68.1, 81.6, null],
    total: [231.9, 209.3, 235.4, 227.8, 242.9, null],
    share: [33.3, 34.8, 30.2, 29.9, 33.6, null]
  };

  var chartVolume = echarts.init(document.getElementById('chart-volume'), null, { renderer: 'svg' });

  function getVolumeOption(type) {
    if (type === 'share') {
      return {
        tooltip: Object.assign({}, tooltipStyle, {
          trigger: 'axis',
          formatter: function(params) {
            return '<b>' + params[0].axisValue + '</b><br/>' +
              params[0].marker + ' 中国份额: <b>' + params[0].value + '%</b>';
          }
        }),
        grid: { top: 30, right: 20, bottom: 30, left: 50 },
        xAxis: Object.assign({}, axisStyle, { type: 'category', data: months.slice(0, 5), boundaryGap: false }),
        yAxis: Object.assign({}, axisStyle, {
          type: 'value',
          axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
          min: 25, max: 40
        }),
        series: [{
          name: '中国份额',
          type: 'line',
          data: volumeData.share.slice(0, 5),
          smooth: 0.36,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: { width: 4, color: accent4, shadowColor: accent4, shadowBlur: 10, cap: 'round' },
          itemStyle: { color: accent4, borderColor: ink, borderWidth: 1 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: accent4 + '45' },
              { offset: 1, color: accent4 + '03' }
            ])
          },
          markLine: {
            data: [{ yAxis: 33.3, name: '平均份额' }],
            lineStyle: { color: muted, type: 'dashed' },
            label: { color: muted, fontSize: 10, formatter: '均值 33.3%' }
          }
        }],
        animation: false
      };
    }
    var seriesData = type === 'china' ? volumeData.china : volumeData.total;
    var seriesName = type === 'china' ? '中国对美出口 (万TEU)' : '美国总进口 (万TEU)';
    var seriesColor = type === 'china' ? accent : accent3;
    return {
      tooltip: Object.assign({}, tooltipStyle, {
        trigger: 'axis',
        formatter: function(params) {
          if (params[0].value === null) return '<b>' + params[0].axisValue + '</b><br/>数据待更新';
          return '<b>' + params[0].axisValue + '</b><br/>' +
            params[0].marker + ' ' + seriesName + ': <b>' + params[0].value + ' 万TEU</b>';
        }
      }),
      grid: { top: 30, right: 20, bottom: 30, left: 55 },
      xAxis: Object.assign({}, axisStyle, { type: 'category', data: months, boundaryGap: false }),
      yAxis: Object.assign({}, axisStyle, {
        type: 'value',
        axisLabel: { color: muted, fontSize: 11, formatter: '{value}' }
      }),
      series: [{
        name: seriesName,
        type: 'bar',
        data: seriesData,
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: seriesColor },
            { offset: 1, color: seriesColor + '40' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: muted,
          fontSize: 10,
          formatter: function(p) { return p.value === null ? '' : p.value; }
        }
      }],
      animation: false
    };
  }

  chartVolume.setOption(getVolumeOption('china'));

  // ============ Chart 3: SCFI/CCFI Index ============
  var scfiData = [1870, 1800, 1900, 1950, 2200, 2726, 2985, 3122];
  var ccfiData = [1197, 1160, 1200, 1250, 1350, 1480, 1599, 1599];
  var indexMonths = ['1月初', '2月初', '3月初', '4月初', '5月初', '6月初', '6月中', '6月下旬'];

  var chartIndex = echarts.init(document.getElementById('chart-index'), null, { renderer: 'svg' });
  chartIndex.setOption({
    tooltip: Object.assign({}, tooltipStyle, {
      trigger: 'axis',
      formatter: function(params) {
        var s = '<b>' + params[0].axisValue + '</b><br/>';
        params.forEach(function(p) {
          s += p.marker + ' ' + p.seriesName + ': <b>' + p.value.toLocaleString() + ' 点</b><br/>';
        });
        return s;
      }
    }),
    legend: {
      data: ['SCFI', 'CCFI'],
      textStyle: { color: muted, fontSize: 11 },
      top: 5, right: 10
    },
    grid: { top: 50, right: 20, bottom: 30, left: 55 },
    xAxis: Object.assign({}, axisStyle, { type: 'category', data: indexMonths, boundaryGap: false }),
    yAxis: Object.assign({}, axisStyle, {
      type: 'value',
      axisLabel: { color: muted, fontSize: 11 }
    }),
    series: [
      {
        name: 'SCFI',
        type: 'line',
        data: scfiData,
        smooth: 0.36,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 4, color: accent, shadowColor: accent, shadowBlur: 10, cap: 'round' },
        itemStyle: { color: accent, borderColor: ink, borderWidth: 1 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: accent + '45' },
            { offset: 1, color: accent + '02' }
          ])
        }
      },
      {
        name: 'CCFI',
        type: 'line',
        data: ccfiData,
        smooth: 0.36,
        symbol: 'triangle',
        symbolSize: 8,
        lineStyle: { width: 4, color: accent2, shadowColor: accent2, shadowBlur: 10, cap: 'round' },
        itemStyle: { color: accent2, borderColor: ink, borderWidth: 1 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: accent2 + '20' },
            { offset: 1, color: accent2 + '02' }
          ])
        }
      }
    ],
    animation: false
  });

  // ============ Chart 4: Correlation ============
  var chartCorr = echarts.init(document.getElementById('chart-correlation'), null, { renderer: 'svg' });
  chartCorr.setOption({
    tooltip: Object.assign({}, tooltipStyle, {
      trigger: 'axis',
      formatter: function(params) {
        var s = '<b>' + params[0].axisValue + '</b><br/>';
        params.forEach(function(p) {
          s += p.marker + ' ' + p.seriesName + ': <b>' + p.value + (p.seriesIndex === 0 ? ' 万TEU' : ' $/FEU') + '</b><br/>';
        });
        return s;
      }
    }),
    legend: {
      data: ['中国出口量', '美西运价'],
      textStyle: { color: muted, fontSize: 11 },
      top: 5, right: 10
    },
    grid: { top: 50, right: 60, bottom: 30, left: 55 },
    xAxis: Object.assign({}, axisStyle, { type: 'category', data: months.slice(0, 5), boundaryGap: false }),
    yAxis: [
      Object.assign({}, axisStyle, {
        type: 'value',
        name: '万TEU',
        nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 11 }
      }),
      Object.assign({}, axisStyle, {
        type: 'value',
        name: '$/FEU',
        nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 11, formatter: '${value}' },
        splitLine: { show: false }
      })
    ],
    series: [
      {
        name: '中国出口量',
        type: 'bar',
        data: volumeData.china.slice(0, 5),
        yAxisIndex: 0,
        barWidth: '35%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: accent3 },
            { offset: 1, color: accent3 + '30' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '美西运价',
        type: 'line',
        data: freightData.west.slice(0, 5),
        yAxisIndex: 1,
        smooth: 0.36,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: { width: 4, color: accent2, shadowColor: accent2, shadowBlur: 10, cap: 'round' },
        itemStyle: { color: accent2, borderColor: ink, borderWidth: 1 }
      }
    ],
    animation: false
  });

  // ============ Chart 5: Forecast ============
  var forecastMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  var actualWest = [2200, 2100, 2300, 2476, 2900, 6300, null, null, null, null, null, null];
  var forecastWest = [null, null, null, null, null, 6300, 7000, 6800, 6200, 5500, 4800, 4200];
  var forecastUpper = [null, null, null, null, null, 6300, 7500, 7500, 7200, 6800, 6000, 5500];
  var forecastLower = [null, null, null, null, null, 6300, 6500, 6100, 5200, 4200, 3600, 3000];

  var actualEast = [3800, 3600, 3900, 4002, 4500, 7500, null, null, null, null, null, null];
  var forecastEast = [null, null, null, null, null, 7500, 8200, 8000, 7500, 6800, 6000, 5400];

  var chartForecast = echarts.init(document.getElementById('chart-forecast'), null, { renderer: 'svg' });
  chartForecast.setOption({
    tooltip: Object.assign({}, tooltipStyle, {
      trigger: 'axis',
      formatter: function(params) {
        var s = '<b>2026年' + params[0].axisValue + '</b><br/>';
        params.forEach(function(p) {
          if (p.value !== null && p.value !== undefined) {
            s += p.marker + ' ' + p.seriesName + ': <b>$' + p.value.toLocaleString() + '/FEU</b><br/>';
          }
        });
        return s;
      }
    }),
    legend: {
      data: ['美西实际', '美西预测', '美西预测区间', '美东实际', '美东预测'],
      textStyle: { color: muted, fontSize: 11 },
      top: 5, right: 10
    },
    grid: { top: 50, right: 20, bottom: 30, left: 60 },
    xAxis: Object.assign({}, axisStyle, { type: 'category', data: forecastMonths, boundaryGap: false }),
    yAxis: Object.assign({}, axisStyle, {
      type: 'value',
      axisLabel: { color: muted, fontSize: 11, formatter: '${value}' },
      min: 0
    }),
    series: [
      {
        name: '美西预测区间',
        type: 'line',
        data: forecastUpper,
        smooth: 0.36,
        symbol: 'none',
        lineStyle: { width: 1, color: 'transparent' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: accent + '20' },
            { offset: 1, color: accent + '05' }
          ])
        },
        stack: 'confidence',
        z: 0
      },
      {
        name: '美西预测区间',
        type: 'line',
        data: forecastLower.map(function(v, i) { return v === null ? null : 2 * forecastUpper[i] - v; }),
        smooth: 0.36,
        symbol: 'none',
        lineStyle: { width: 1, color: 'transparent' },
        areaStyle: {
          color: 'rgba(246,249,255,0.96)'
        },
        stack: 'confidence',
        z: 0
      },
      {
        name: '美西实际',
        type: 'line',
        data: actualWest,
        smooth: 0.36,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: { width: 4, color: accent, shadowColor: accent, shadowBlur: 12, cap: 'round' },
        itemStyle: { color: accent, borderColor: ink, borderWidth: 1 },
        z: 2
      },
      {
        name: '美西预测',
        type: 'line',
        data: forecastWest,
        smooth: 0.36,
        symbol: 'diamond',
        symbolSize: 9,
        lineStyle: { width: 3.5, color: accent, type: 'dashed', shadowColor: accent, shadowBlur: 10, cap: 'round' },
        itemStyle: { color: accent, borderColor: ink, borderWidth: 1 },
        z: 2
      },
      {
        name: '美东实际',
        type: 'line',
        data: actualEast,
        smooth: 0.36,
        symbol: 'circle',
        symbolSize: 9,
        lineStyle: { width: 4, color: accent2, shadowColor: accent2, shadowBlur: 12, cap: 'round' },
        itemStyle: { color: accent2, borderColor: ink, borderWidth: 1 },
        z: 2
      },
      {
        name: '美东预测',
        type: 'line',
        data: forecastEast,
        smooth: 0.36,
        symbol: 'diamond',
        symbolSize: 9,
        lineStyle: { width: 3.5, color: accent2, type: 'dashed', shadowColor: accent2, shadowBlur: 10, cap: 'round' },
        itemStyle: { color: accent2, borderColor: ink, borderWidth: 1 },
        z: 2
      }
    ],
    markArea: {
      silent: true,
      data: [[
        { xAxis: '6月', itemStyle: { color: 'rgba(0,212,255,0.03)' } },
        { xAxis: '12月' }
      ]]
    },
    animation: false
  });

  // ============ Chart 6: Alliance Capacity Share ============
  var chartAlliance = echarts.init(document.getElementById('chart-alliance-share'), null, { renderer: 'svg' });
  chartAlliance.setOption({
    tooltip: Object.assign({}, tooltipStyle, {
      trigger: 'item',
      formatter: function(p) {
        return '<b>' + p.name + '</b><br/>跨太平洋运力份额：<b>' + p.value + '%</b><br/><span style="color:' + muted + '">口径：亚洲-北美公开运力/VSA</span>';
      }
    }),
    legend: { bottom: 0, textStyle: { color: muted, fontSize: 10 } },
    series: [{
      name: '联盟/独立运力份额',
      type: 'pie',
      radius: ['45%', '72%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      label: { color: ink, formatter: '{b}\\n{d}%', fontSize: 11 },
      labelLine: { lineStyle: { color: rule } },
      data: [
        { name: 'Ocean Alliance', value: 35.3, itemStyle: { color: accent } },
        { name: 'Premier', value: 21.4, itemStyle: { color: accent2 } },
        { name: 'Gemini', value: 17.0, itemStyle: { color: accent4 } },
        { name: 'MSC独立', value: 16.0, itemStyle: { color: accent3 } },
        { name: '其他', value: 10.3, itemStyle: { color: muted } }
      ]
    }],
    animation: false
  });

  // ============ Chart 7: Carrier Surcharge Comparison ============
  var chartSurcharge = echarts.init(document.getElementById('chart-carrier-surcharges'), null, { renderer: 'svg' });
  chartSurcharge.setOption({
    tooltip: Object.assign({}, tooltipStyle, {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var p = params[0];
        return '<b>' + p.name + '</b><br/>公开40尺/FEU附加费参考：<b>$' + Number(p.value).toLocaleString() + '</b><br/><span style="color:' + muted + '">PSS/GRI/EFS口径不同，仅用于监控强度对比</span>';
      }
    }),
    grid: { top: 20, right: 20, bottom: 70, left: 55 },
    xAxis: Object.assign({}, axisStyle, {
      type: 'category',
      data: ['COSCO GRI', 'COSCO PSS', 'Maersk PSS', 'CMA CGM PSS', 'MSC EFS', 'ZIM PSS'],
      axisLabel: { color: muted, fontSize: 10, rotate: 35 }
    }),
    yAxis: Object.assign({}, axisStyle, {
      type: 'value',
      axisLabel: { color: muted, fontSize: 11, formatter: '${value}' }
    }),
    series: [{
      name: '公开附加费参考',
      type: 'bar',
      data: [3375, 2000, 2000, 2000, 540, 875],
      barWidth: '46%',
      itemStyle: {
        color: function(params) {
          return params.name.indexOf('COSCO') >= 0 ? accent : (params.value >= 1800 ? accent2 : accent3);
        },
        borderRadius: [4, 4, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        color: muted,
        fontSize: 10,
        formatter: function(p) { return '$' + p.value; }
      }
    }],
    animation: false
  });

  // ============ Tab Interactions ============
  // Rate tabs
  document.querySelectorAll('#rate-tabs .tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#rate-tabs .tab-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      chartRate.setOption(getRateOption(btn.dataset.type), true);
    });
  });

  // Volume tabs
  document.querySelectorAll('#volume-tabs .tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#volume-tabs .tab-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var type = btn.dataset.type || 'china';
      chartVolume.setOption(getVolumeOption(type), true);
    });
  });

  // ============ Resize ============
  window.addEventListener('resize', function() {
    chartRate.resize();
    chartVolume.resize();
    chartIndex.resize();
    chartCorr.resize();
    chartForecast.resize();
    chartAlliance.resize();
    chartSurcharge.resize();
  });

  // ============ Loading animation ============
  setTimeout(function() {
    var loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }, 800);

})();

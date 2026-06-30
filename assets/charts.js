(function() {

    var COLORS = {
        blue: '#3b82f6',
        blueDark: '#1d4ed8',
        blueLight: '#93c5fd',
        green: '#10b981',
        red: '#ef4444',
        orange: '#f59e0b',
        purple: '#8b5cf6',
        teal: '#14b8a6',
        gray: '#94a3b8',
        grayLight: '#e2e8f0',
        bg: '#ffffff',
        text: '#64748b'
    };

    var BASE_STYLE = {
        backgroundColor: COLORS.bg,
        textStyle: { color: COLORS.text, fontFamily: '-apple-system, BlinkMacSystemFont, PingFang SC, Microsoft YaHei, sans-serif' }
    };

    var TOOLTIP_STYLE = {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderColor: COLORS.grayLight,
        borderWidth: 1,
        textStyle: { color: '#1e293b', fontSize: 12 },
        axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(59,130,246,0.05)' } }
    };

    function initChart(id) {
        var el = document.getElementById(id);
        if (!el) return null;
        var chart = echarts.init(el);
        var ro = new ResizeObserver(function() { chart.resize(); });
        ro.observe(el);
        return chart;
    }

    // ========== 1. Index Trend Chart ==========
    var chartIndex = initChart('chart-index-trend');
    if (chartIndex) {
        chartIndex.setOption(Object.assign({}, BASE_STYLE, {
            tooltip: TOOLTIP_STYLE,
            legend: {
                data: ['SCFI', 'CCFI'],
                top: 5,
                textStyle: { fontSize: 12 }
            },
            grid: { left: 60, right: 30, top: 50, bottom: 40 },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                axisLabel: { fontSize: 11 }
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'SCFI',
                    nameTextStyle: { fontSize: 11, color: COLORS.blue },
                    min: 1400,
                    max: 3600,
                    splitLine: { lineStyle: { type: 'dashed', color: COLORS.grayLight } }
                },
                {
                    type: 'value',
                    name: 'CCFI',
                    nameTextStyle: { fontSize: 11, color: COLORS.green },
                    min: 1200,
                    max: 2000,
                    splitLine: { show: false }
                }
            ],
            series: [
                {
                    name: 'SCFI',
                    type: 'line',
                    yAxisIndex: 0,
                    data: [1574, 1620, 1710, 1875, 2572, 3240],
                    smooth: true,
                    lineStyle: { width: 3, color: COLORS.blue },
                    itemStyle: { color: COLORS.blue },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(59,130,246,0.25)' },
                            { offset: 1, color: 'rgba(59,130,246,0.02)' }
                        ])
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高' }
                        ],
                        symbolSize: 50,
                        label: { fontSize: 10 }
                    }
                },
                {
                    name: 'CCFI',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [1310, 1280, 1350, 1410, 1550, 1710],
                    smooth: true,
                    lineStyle: { width: 3, color: COLORS.green },
                    itemStyle: { color: COLORS.green },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(16,185,129,0.2)' },
                            { offset: 1, color: 'rgba(16,185,129,0.02)' }
                        ])
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高' }
                        ],
                        symbolSize: 50,
                        label: { fontSize: 10 }
                    }
                }
            ]
        }));
    }

    // ========== 2. Freight Rate Chart ==========
    var chartFreight = initChart('chart-freight-rate');
    if (chartFreight) {
        chartFreight.setOption(Object.assign({}, BASE_STYLE, {
            tooltip: Object.assign({}, TOOLTIP_STYLE, {
                formatter: function(params) {
                    var s = params[0].axisValue + '<br/>';
                    params.forEach(function(p) {
                        s += '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + p.color + ';margin-right:5px"></span>' +
                            p.seriesName + ': <strong>$' + p.value.toLocaleString() + '/FEU</strong><br/>';
                    });
                    return s;
                }
            }),
            legend: {
                data: ['美西 (上海→LA/LB)', '美东 (上海→NY/NJ)'],
                top: 5,
                textStyle: { fontSize: 12 }
            },
            grid: { left: 60, right: 30, top: 50, bottom: 40 },
            xAxis: {
                type: 'category',
                data: ['1月初', '2月初', '3月初', '4月初', '5月初', '5月底', '6月初', '6月中旬', '6月底'],
                axisLabel: { fontSize: 11, rotate: 0 }
            },
            yAxis: {
                type: 'value',
                name: 'USD/FEU',
                nameTextStyle: { fontSize: 11 },
                min: 1000,
                max: 9000,
                splitLine: { lineStyle: { type: 'dashed', color: COLORS.grayLight } },
                axisLabel: {
                    formatter: function(v) { return '$' + (v / 1000).toFixed(1) + 'k'; }
                }
            },
            series: [
                {
                    name: '美西 (上海→LA/LB)',
                    type: 'line',
                    data: [1800, 2200, 2500, 2900, 3200, 4149, 4683, 5101, 5683],
                    smooth: true,
                    lineStyle: { width: 3, color: COLORS.blue },
                    itemStyle: { color: COLORS.blue },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(59,130,246,0.2)' },
                            { offset: 1, color: 'rgba(59,130,246,0.01)' }
                        ])
                    },
                    symbol: 'circle',
                    symbolSize: 7,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高' },
                            { coord: [8, 5683], value: '$5,683', symbolSize: 55, label: { fontSize: 10 } }
                        ]
                    },
                    markLine: {
                        data: [
                            {
                                yAxis: 7500,
                                label: { formatter: '7月GRI目标', fontSize: 10, color: COLORS.red },
                                lineStyle: { color: COLORS.red, type: 'dashed' }
                            }
                        ]
                    }
                },
                {
                    name: '美东 (上海→NY/NJ)',
                    type: 'line',
                    data: [2400, 2900, 3200, 3900, 4200, 5333, 5800, 6321, 6873],
                    smooth: true,
                    lineStyle: { width: 3, color: COLORS.orange },
                    itemStyle: { color: COLORS.orange },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(245,158,11,0.15)' },
                            { offset: 1, color: 'rgba(245,158,11,0.01)' }
                        ])
                    },
                    symbol: 'circle',
                    symbolSize: 7
                }
            ]
        }));
    }

    // ========== 3. Volume Chart ==========
    var chartVolume = initChart('chart-volume');
    if (chartVolume) {
        chartVolume.setOption(Object.assign({}, BASE_STYLE, {
            tooltip: Object.assign({}, TOOLTIP_STYLE, {
                formatter: function(params) {
                    var month = params[0].axisValue;
                    var s = month + '<br/>';
                    params.forEach(function(p) {
                        var unit = p.seriesIndex === 2 ? '%' : '万TEU';
                        var val = p.seriesIndex === 2 ? p.value + '%' : p.value + '万TEU';
                        s += '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + p.color + ';margin-right:5px"></span>' +
                            p.seriesName + ': <strong>' + val + '</strong><br/>';
                    });
                    return s;
                }
            }),
            legend: {
                data: ['美国总进口', '中国发运', '中国份额'],
                top: 5,
                textStyle: { fontSize: 12 }
            },
            grid: { left: 60, right: 60, top: 55, bottom: 40 },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月*'],
                axisLabel: { fontSize: 11 }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '万TEU',
                    nameTextStyle: { fontSize: 11 },
                    min: 180,
                    max: 280,
                    splitLine: { lineStyle: { type: 'dashed', color: COLORS.grayLight } }
                },
                {
                    type: 'value',
                    name: '份额%',
                    nameTextStyle: { fontSize: 11 },
                    min: 25,
                    max: 40,
                    splitLine: { show: false }
                }
            ],
            series: [
                {
                    name: '美国总进口',
                    type: 'bar',
                    data: [236, 213, 235.4, 227.8, 242.9, null],
                    barWidth: '25%',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: COLORS.blue },
                            { offset: 1, color: COLORS.blueLight }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    }
                },
                {
                    name: '中国发运',
                    type: 'bar',
                    data: [72, 62, 71, 68.1, 81.6, null],
                    barWidth: '25%',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: COLORS.orange },
                            { offset: 1, color: '#fcd34d' }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    }
                },
                {
                    name: '中国份额',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [30.5, 29.1, 30.2, 29.9, 33.6, null],
                    smooth: true,
                    lineStyle: { width: 3, color: COLORS.green },
                    itemStyle: { color: COLORS.green },
                    symbol: 'diamond',
                    symbolSize: 10,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%',
                        fontSize: 11,
                        color: COLORS.green
                    }
                }
            ]
        }));
    }

    // ========== 4. Port Congestion Chart ==========
    var chartCongestion = initChart('chart-congestion');
    if (chartCongestion) {
        chartCongestion.setOption(Object.assign({}, BASE_STYLE, {
            tooltip: TOOLTIP_STYLE,
            legend: {
                data: ['3月', '4月', '5月'],
                top: 5,
                textStyle: { fontSize: 12 }
            },
            grid: { left: 90, right: 30, top: 50, bottom: 30 },
            xAxis: {
                type: 'value',
                name: '平均延误（天）',
                nameTextStyle: { fontSize: 11 },
                min: 0,
                max: 9,
                splitLine: { lineStyle: { type: 'dashed', color: COLORS.grayLight } }
            },
            yAxis: {
                type: 'category',
                data: ['休斯敦', '萨凡纳', '纽约/新泽西', '塔科马', '西雅图', '奥克兰', '长滩', '洛杉矶'],
                axisLabel: { fontSize: 11 }
            },
            series: [
                {
                    name: '3月',
                    type: 'bar',
                    data: [5.0, 6.6, 7.2, 4.1, 5.3, 4.6, 2.4, 3.2],
                    barWidth: '20%',
                    itemStyle: { color: COLORS.blueLight, borderRadius: [0, 3, 3, 0] }
                },
                {
                    name: '4月',
                    type: 'bar',
                    data: [5.0, 4.6, 6.1, 3.0, 4.3, 3.8, 7.3, 2.6],
                    barWidth: '20%',
                    itemStyle: { color: COLORS.orange, borderRadius: [0, 3, 3, 0] }
                },
                {
                    name: '5月',
                    type: 'bar',
                    data: [null, null, null, null, null, null, 2.2, null],
                    barWidth: '20%',
                    itemStyle: { color: COLORS.green, borderRadius: [0, 3, 3, 0] }
                }
            ]
        }));
    }

    // ========== 5. CCFI Routes Chart ==========
    var chartCCFI = initChart('chart-ccfi-routes');
    if (chartCCFI) {
        chartCCFI.setOption(Object.assign({}, BASE_STYLE, {
            tooltip: TOOLTIP_STYLE,
            legend: {
                data: ['美西航线', '美东航线', '欧洲航线', '地中海航线', '波红航线'],
                top: 5,
                textStyle: { fontSize: 11 }
            },
            grid: { left: 60, right: 30, top: 55, bottom: 40 },
            xAxis: {
                type: 'category',
                data: ['6月初', '6月中旬', '6月下旬'],
                axisLabel: { fontSize: 11 }
            },
            yAxis: {
                type: 'value',
                name: 'CCFI指数',
                nameTextStyle: { fontSize: 11 },
                min: 1000,
                max: 3200,
                splitLine: { lineStyle: { type: 'dashed', color: COLORS.grayLight } }
            },
            series: [
                {
                    name: '美西航线',
                    type: 'line',
                    data: [1229, 1229, 1339],
                    smooth: true,
                    lineStyle: { width: 2.5, color: COLORS.blue },
                    itemStyle: { color: COLORS.blue },
                    symbol: 'circle',
                    symbolSize: 8
                },
                {
                    name: '美东航线',
                    type: 'line',
                    data: [1401, 1401, 1503],
                    smooth: true,
                    lineStyle: { width: 2.5, color: COLORS.orange },
                    itemStyle: { color: COLORS.orange },
                    symbol: 'circle',
                    symbolSize: 8
                },
                {
                    name: '欧洲航线',
                    type: 'line',
                    data: [1981, 1981, 2159],
                    smooth: true,
                    lineStyle: { width: 2.5, color: COLORS.purple },
                    itemStyle: { color: COLORS.purple },
                    symbol: 'circle',
                    symbolSize: 8
                },
                {
                    name: '地中海航线',
                    type: 'line',
                    data: [2584, 2584, 2805],
                    smooth: true,
                    lineStyle: { width: 2.5, color: COLORS.teal },
                    itemStyle: { color: COLORS.teal },
                    symbol: 'circle',
                    symbolSize: 8
                },
                {
                    name: '波红航线',
                    type: 'line',
                    data: [2793, 2793, 2951],
                    smooth: true,
                    lineStyle: { width: 2.5, color: COLORS.red },
                    itemStyle: { color: COLORS.red },
                    symbol: 'circle',
                    symbolSize: 8
                }
            ]
        }));
    }

    // ========== Forecast annotations ==========
    // All charts above include current data up to June 26, 2026.
    // Forecast: July rates may soften after Section 122 expiration (July 24).
    // COSCO GRI $3,000/FEU planned for July 1 but full implementation uncertain.
    // 6月美国月度完整数据待Descartes 7月报告发布后更新。

})();
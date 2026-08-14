(function() {
    'use strict';

    // ===== Global Config =====
    var FONT = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', sans-serif";
    var TOOLTIP_STYLE = {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#1a2332', fontSize: 13 },
        extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 8px;'
    };
    var DEFAULT_GRID = { left: 55, right: 25, top: 35, bottom: 45, containLabel: false };
    var DUAL_GRID = { left: 55, right: 50, top: 35, bottom: 45, containLabel: false };
    var COLORS = {
        scfi: '#2563eb',
        ccfi: '#0ea5e9',
        usWest: '#2563eb',
        usEast: '#f59e0b',
        china: '#dc2626',
        total: '#64748b',
        share: '#14b8a6',
        forecast: '#a78bfa',
        forecastEast: '#fb923c'
    };

    // ===== Chart 1: SCFI & CCFI Index Trends =====
    var chart1 = echarts.init(document.getElementById('chart-scfi-ccfi'));
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
    chart1.setOption({
        tooltip: { trigger: 'axis', ...TOOLTIP_STYLE },
        legend: {
            data: ['SCFI 综合指数', 'CCFI 综合指数'],
            top: 0,
            right: 10,
            textStyle: { fontSize: 12, color: '#64748b' },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: DEFAULT_GRID,
        xAxis: {
            type: 'category',
            data: months,
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisLabel: { color: '#64748b', fontSize: 12 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '点',
            nameTextStyle: { color: '#94a3b8', fontSize: 11 },
            axisLine: { show: false },
            axisLabel: { color: '#64748b', fontSize: 12 },
            splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        series: [
            {
                name: 'SCFI 综合指数',
                type: 'line',
                data: [2200, 1251, 1600, 2000, 2500, 2900, 3185, 3276],
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                lineStyle: { width: 3, color: COLORS.scfi },
                itemStyle: { color: COLORS.scfi },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(37,99,235,0.15)' },
                        { offset: 1, color: 'rgba(37,99,235,0.01)' }
                    ])
                },
                markPoint: {
                    data: [
                        { name: '最低', value: 1251, xAxis: 1, yAxis: 1251,
                          itemStyle: { color: '#ef4444' } },
                        { name: '最新', value: 3276, xAxis: 7, yAxis: 3276,
                          itemStyle: { color: '#16a34a' } }
                    ],
                    label: { fontSize: 11 }
                }
            },
            {
                name: 'CCFI 综合指数',
                type: 'line',
                data: [1500, 1400, 1450, 1550, 1650, 1750, 1857, 1840],
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                lineStyle: { width: 3, color: COLORS.ccfi },
                itemStyle: { color: COLORS.ccfi },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(14,165,233,0.12)' },
                        { offset: 1, color: 'rgba(14,165,233,0.01)' }
                    ])
                }
            }
        ]
    });

    // ===== Chart 2: Spot Rates (US West / US East) =====
    var chart2 = echarts.init(document.getElementById('chart-spot-rates'));
    chart2.setOption({
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE,
            formatter: function(params) {
                var html = params[0].axisValue + '<br/>';
                params.forEach(function(p) {
                    html += p.marker + p.seriesName + ': <strong>$' +
                        p.value.toLocaleString() + '/FEU</strong><br/>';
                });
                return html;
            }
        },
        legend: {
            data: ['上海→美西', '上海→美东'],
            top: 0,
            right: 10,
            textStyle: { fontSize: 12, color: '#64748b' },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: DEFAULT_GRID,
        xAxis: {
            type: 'category',
            data: months,
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisLabel: { color: '#64748b', fontSize: 12 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: 'USD/FEU',
            nameTextStyle: { color: '#94a3b8', fontSize: 11 },
            axisLine: { show: false },
            axisLabel: {
                color: '#64748b', fontSize: 12,
                formatter: function(val) { return '$' + (val / 1000) + 'k'; }
            },
            splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        series: [
            {
                name: '上海→美西',
                type: 'bar',
                data: [3200, 1800, 2400, 3200, 4800, 6000, 5535, 6484],
                barWidth: '30%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#3b82f6' },
                        { offset: 1, color: '#93c5fd' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: '上海→美东',
                type: 'bar',
                data: [4800, 3000, 3600, 4800, 6800, 8000, 8040, 9290],
                barWidth: '30%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#f59e0b' },
                        { offset: 1, color: '#fcd34d' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            }
        ]
    });

    // ===== Chart 3: Import Volumes & China Share =====
    var chart3 = echarts.init(document.getElementById('chart-import-volumes'));
    chart3.setOption({
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE,
            axisPointer: { type: 'cross' }
        },
        legend: {
            data: ['美国总进口', '自中国进口', '中国份额'],
            top: 0,
            right: 10,
            textStyle: { fontSize: 12, color: '#64748b' },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: DUAL_GRID,
        xAxis: {
            type: 'category',
            data: months,
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisLabel: { color: '#64748b', fontSize: 12 },
            axisTick: { show: false }
        },
        yAxis: [
            {
                type: 'value',
                name: 'TEU',
                nameTextStyle: { color: '#94a3b8', fontSize: 11 },
                axisLine: { show: false },
                axisLabel: {
                    color: '#64748b', fontSize: 12,
                    formatter: function(val) { return (val / 1000) + 'k'; }
                },
                splitLine: { lineStyle: { color: '#f1f5f9' } }
            },
            {
                type: 'value',
                name: '份额 %',
                nameTextStyle: { color: '#94a3b8', fontSize: 11 },
                axisLine: { show: false },
                axisLabel: { color: '#64748b', fontSize: 12, formatter: '{value}%' },
                splitLine: { show: false },
                min: 25,
                max: 40
            }
        ],
        series: [
            {
                name: '美国总进口',
                type: 'bar',
                data: [2319, 2090, 2357, 2282, 2430, 2401, 2508, null],
                barWidth: '25%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#94a3b8' },
                        { offset: 1, color: '#cbd5e1' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: '自中国进口',
                type: 'bar',
                data: [771, 729, 712, 681, 816, 814, 873, null],
                barWidth: '25%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#dc2626' },
                        { offset: 1, color: '#fca5a5' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: '中国份额',
                type: 'line',
                yAxisIndex: 1,
                data: [33.3, 34.8, 30.2, 29.8, 33.6, 33.9, 34.8, null],
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                lineStyle: { width: 3, color: COLORS.share },
                itemStyle: { color: COLORS.share },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    fontSize: 11,
                    color: '#0d9488'
                }
            }
        ]
    });

    // ===== Chart 4: Port Congestion (Delay Days) =====
    var chart4 = echarts.init(document.getElementById('chart-port-congestion'));
    chart4.setOption({
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE,
            formatter: function(params) {
                var html = params[0].axisValue + '<br/>';
                params.forEach(function(p) {
                    var val = p.value === null || p.value === undefined || p.value === '-' ? '暂无数据' : p.value + '天';
                    html += p.marker + p.seriesName + ': <strong>' + val + '</strong><br/>';
                });
                return html;
            }
        },
        legend: {
            data: ['6月延误', '7月延误'],
            top: 0,
            right: 10,
            textStyle: { fontSize: 12, color: '#64748b' },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: DEFAULT_GRID,
        xAxis: {
            type: 'category',
            data: ['洛杉矶', '长滩', '纽约/新泽西', '萨凡纳', '查尔斯顿', '诺福克', '休斯顿'],
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisLabel: { color: '#64748b', fontSize: 11, rotate: 15 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '延误天数',
            nameTextStyle: { color: '#94a3b8', fontSize: 11 },
            axisLine: { show: false },
            axisLabel: { color: '#64748b', fontSize: 12 },
            splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        series: [
            {
                name: '6月延误',
                type: 'bar',
                data: [5.8, null, null, null, null, null, null],
                barWidth: '30%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ef4444' },
                        { offset: 1, color: '#fca5a5' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: true, position: 'top', formatter: '{c}天', fontSize: 11, color: '#ef4444' }
            },
            {
                name: '7月延误',
                type: 'bar',
                data: [1.8, 5.2, null, null, null, null, null],
                barWidth: '30%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#f59e0b' },
                        { offset: 1, color: '#fcd34d' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                label: { show: true, position: 'top', formatter: '{c}天', fontSize: 11, color: '#d97706' }
            }
        ]
    });

    // ===== Chart 5: Carrier GRI Comparison (August) =====
    var chart5 = echarts.init(document.getElementById('chart-carrier-gri'));
    chart5.setOption({
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE,
            formatter: function(params) {
                var html = params[0].axisValue + '<br/>';
                params.forEach(function(p) {
                    html += p.marker + p.seriesName + ': <strong>$' +
                        p.value.toLocaleString() + '/FEU</strong><br/>';
                });
                return html;
            }
        },
        legend: {
            data: ['6月15日 GRI', '8月1日 GRI'],
            top: 0,
            right: 10,
            textStyle: { fontSize: 12, color: '#64748b' },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: DEFAULT_GRID,
        xAxis: {
            type: 'category',
            data: ['COSCO', 'CMA CGM', 'Evergreen', 'Hapag-Lloyd', 'HMM', 'Yang Ming', 'ZIM'],
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisLabel: { color: '#64748b', fontSize: 11, rotate: 20 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: 'USD/FEU',
            nameTextStyle: { color: '#94a3b8', fontSize: 11 },
            axisLine: { show: false },
            axisLabel: {
                color: '#64748b', fontSize: 12,
                formatter: '${value}'
            },
            splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        series: [
            {
                name: '6月15日 GRI',
                type: 'bar',
                data: [3000, 2000, 3000, 3000, 3000, 2000, 2000],
                barWidth: '30%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2563eb' },
                        { offset: 1, color: '#93c5fd' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: '8月1日 GRI',
                type: 'bar',
                data: [1500, 2000, 3000, 2000, 3000, 2000, 2000],
                barWidth: '30%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#14b8a6' },
                        { offset: 1, color: '#5eead4' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            }
        ]
    });

    // ===== Chart 6: Rate Forecast =====
    var chart6 = echarts.init(document.getElementById('chart-rate-forecast'));
    var forecastMonths = ['3月', '4月', '5月', '6月', '7月', '8月', '9月*', '10月*', '11月*'];
    chart6.setOption({
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE,
            formatter: function(params) {
                var html = params[0].axisValue + '<br/>';
                params.forEach(function(p) {
                    if (p.value !== null) {
                        html += p.marker + p.seriesName + ': <strong>$' +
                            p.value.toLocaleString() + '/FEU</strong><br/>';
                    }
                });
                return html;
            }
        },
        legend: {
            data: ['美西实际', '美东实际', '美西预测', '美东预测'],
            top: 0,
            right: 10,
            textStyle: { fontSize: 12, color: '#64748b' },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: DEFAULT_GRID,
        xAxis: {
            type: 'category',
            data: forecastMonths,
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisLabel: { color: '#64748b', fontSize: 12 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: 'USD/FEU',
            nameTextStyle: { color: '#94a3b8', fontSize: 11 },
            axisLine: { show: false },
            axisLabel: {
                color: '#64748b', fontSize: 12,
                formatter: function(val) { return '$' + (val / 1000) + 'k'; }
            },
            splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        series: [
            {
                name: '美西实际',
                type: 'line',
                data: [2400, 3200, 4800, 6000, 5535, 6484, null, null, null],
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                lineStyle: { width: 3, color: COLORS.usWest },
                itemStyle: { color: COLORS.usWest },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(37,99,235,0.12)' },
                        { offset: 1, color: 'rgba(37,99,235,0.01)' }
                    ])
                }
            },
            {
                name: '美东实际',
                type: 'line',
                data: [3600, 4800, 6800, 8000, 8040, 9290, null, null, null],
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                lineStyle: { width: 3, color: COLORS.usEast },
                itemStyle: { color: COLORS.usEast },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(245,158,11,0.12)' },
                        { offset: 1, color: 'rgba(245,158,11,0.01)' }
                    ])
                }
            },
            {
                name: '美西预测',
                type: 'line',
                data: [null, null, null, null, 5535, 6484, 6800, 6200, 5500],
                smooth: true,
                symbol: 'diamond',
                symbolSize: 8,
                lineStyle: { width: 2.5, color: COLORS.forecast, type: 'dashed' },
                itemStyle: { color: COLORS.forecast }
            },
            {
                name: '美东预测',
                type: 'line',
                data: [null, null, null, null, 8040, 9290, 9500, 8800, 8000],
                smooth: true,
                symbol: 'diamond',
                symbolSize: 8,
                lineStyle: { width: 2.5, color: COLORS.forecastEast, type: 'dashed' },
                itemStyle: { color: COLORS.forecastEast }
            }
        ],
        markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { color: '#cbd5e1', type: 'dashed' },
            data: [{ xAxis: 5.5 }],
            label: { formatter: '预测→', color: '#94a3b8', fontSize: 11 }
        }
    });

    // ===== Resize Handler =====
    window.addEventListener('resize', function() {
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
        chart6.resize();
    });

})();

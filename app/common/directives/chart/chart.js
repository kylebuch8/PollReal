(function () {
    'use strict';

    /*global angular, Chart*/
    angular.module('directives.chart', [])
        .directive('chart', [function () {
            return {
                restrict: 'E',
                template: '<canvas></canvas>',
                link: function (scope, element) {
                    function hexToRgb(hex) {
                        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                            return r + r + g + g + b + b;
                        });

                        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                        return result ? {
                            r: parseInt(result[1], 16),
                            g: parseInt(result[2], 16),
                            b: parseInt(result[3], 16)
                        } : null;
                    }

                    var ctx = element[0].querySelector('canvas').getContext('2d'),
                        data = {
                            datasets: [
                                {
                                    data: []
                                }
                            ]
                        },
                        chart;

                        scope.$watch('labels', function (labels) {
                            data.labels = labels;
                            data.datasets[0].data = labels.map(function () {
                                return 0;
                            });

                            chart = new Chart(ctx).Bar(data, {
                                responsive: true,
                                maintainAspectRatio: false,
                                scaleFontSize: 20
                            });
                        });

                        scope.$watch('values', function (values) {
                            chart.datasets[0].data = values.map(function (value) {
                                return value.responses;
                            });

                            values.forEach(function (value, index) {
                                var fillColor = value.fillColor,
                                    rgbFillColor = hexToRgb(fillColor);

                                chart.datasets[0].bars[index].value = value.responses;
                                chart.datasets[0].bars[index].fillColor = fillColor;
                                chart.datasets[0].bars[index].highlightFill = 'rgba(' + rgbFillColor.r + ', ' + rgbFillColor.g + ', ' + rgbFillColor.b + ', 0.9)';
                            });

                            chart.update();
                        });
                }
            }
        }]);
}());

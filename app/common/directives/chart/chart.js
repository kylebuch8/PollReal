(function () {
    'use strict';

    /*global angular, Chart*/
    angular.module('directives.chart', [])
        .directive('chart', [function () {
            return {
                restrict: 'E',
                template: '<canvas width="400" height="400"></canvas>',
                link: function (scope, element) {
                    var ctx = element[0].querySelector('canvas').getContext('2d'),
                        // data = {
                        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
                        //     datasets: [
                        //         {
                        //             label: "My First dataset",
                        //             fillColor: "rgba(220,220,220,0.5)",
                        //             strokeColor: "rgba(220,220,220,0.8)",
                        //             highlightFill: "rgba(220,220,220,0.75)",
                        //             highlightStroke: "rgba(220,220,220,1)",
                        //             data: [65, 59, 80, 81, 56, 55, 40]
                        //         }
                        //     ]
                        // },
                        data = {
                            datasets: [
                                {
                                    data: []
                                }
                            ]
                        },
                        //chart = new Chart(ctx).Bar(data);
                        chart = new Chart(ctx);

                        scope.$watch('labels', function (labels) {
                            data.labels = labels;
                            data.datasets[0].data = labels.map(function () {
                                return 0;
                            });

                            chart = chart.Bar(data);
                        });

                        scope.$watch('values', function (values) {
                            chart.datasets[0].data = values.map(function (value) {
                                return value.responses;
                            });

                            values.forEach(function (value, index) {
                                chart.datasets[0].bars[index].value = value.responses;
                                chart.datasets[0].bars[index].fillColor = value.fillColor;
                            });

                            chart.update();
                        });
                }
            }
        }]);
}());

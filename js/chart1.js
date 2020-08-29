function drawchart1(){
    $(document).ready(function() {
        
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        var totalCases = [];
        var deathDate = [];
        var dates = [];
        $.ajax({
            'async': false,
            'global': false,
            'dataType': 'json',
            'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=dailyDeaths',
            'success': function(data) {
                //console.log(data)
                data.forEach(function(key, value) {
                    totalCases.push(parseInt(key["Daily Deaths"]));
                    deathDate.push(key["Date"]);
                });

                totalCases.reverse();
                deathDate.reverse();
                if (screen.width <= 767) {
                    stepValue = {
                        step: 40
                    };
                } else {
                    stepValue = {
                        step: 35
                    };
                }
                // console.log("Deaths"+JSON.stringify(deathDate));
            }

        });

        Highcharts.chart('dailydeath-container', {
            exporting: {
                buttons: {
                    customButton: {
                        text: 'Linear',
                        onclick: function() {
                            this.yAxis[0].update({
                                type: 'linear'
                            });
                        }
                    },
                    customButton2: {
                        text: 'Logarithmic',
                        onclick: function() {
                            this.yAxis[0].update({
                                type: 'logarithmic'
                            });
                        }
                    },
                }
            },
            chart: {
                height: 500
            },
            title: {
                text: ''
            },

            subtitle: {
                text: ''
            },

            yAxis: {

                title: {
                    text: 'Number of Deaths'
                }
            },

            /* xAxis: {
            type: 'datetime',
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                }
            },


            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: Date.UTC(2020, 0, 02),
                    pointInterval: 24 * 3600 * 1000,
                }
            },*/
            xAxis: {

                type: 'datetime',
                tickPixelInterval: 400,
                categories: deathDate,
                labels: stepValue,
            },

            series: [{
                name: 'Daily Deaths',
                data: totalCases
            }, ],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500,
                    },

                    chartOptions: {

                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    });
}

drawchart1();
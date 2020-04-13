function drawchart2(){
    $(document).ready(function() {
        var totalDeaths = [];
        var totdeathDate = [];
        var dates = [];
        $.ajax({
            'async': false,
            'global': false,
            'dataType': 'json',
            'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=totalDeaths',
            'success': function(data) {
                //console.log(data)
                data.forEach(function(key, value) {
                    totalDeaths.push(parseInt(key["Total Deaths"]));
                    totdeathDate.push(key["Date"]);
                });
    
                totalDeaths.reverse();
                totdeathDate.reverse();
                if (screen.width <= 767) {
                    stepValue = {
                        step: 10
                    };
                } else {
                    stepValue = {
                        step: 10
                    };
                }
                // console.log("Deaths"+JSON.stringify(totdeathDate));
            }
    
        });
    
        Highcharts.chart('totalDeath-container', {
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
                categories: totdeathDate,
                labels: stepValue
            },
    
            series: [{
                name: 'Total Deaths',
                data: totalDeaths
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

drawchart2();

            $(document).ready(function() {
                Highcharts.setOptions({
                    lang: {
                    thousandsSep: ','
                    }
                });
                var totalCases = [];
                var deathDate = [];
                var dates = [];
                var totalDeaths = [];
                var totdeathDate = [];
            
                $.ajax ({
                'async': false,
                        'global': false,
                        'dataType': 'json',
                'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=dailyDeaths',
                    'success': function(data) {
                        //console.log(data)
                        data.forEach(function(key,value) {
                                totalCases.push(parseInt(key["Daily Deaths"]));
                                deathDate.push(key["Date"]);
                            });
                            
                        totalCases.reverse();
                        deathDate.reverse();
                            if(screen.width <= 767) {
                                stepValue = { step: 30};
                                
                            } else {
                                stepValue = { step: 35};  
                            }
                // console.log("Deaths"+JSON.stringify(deathDate));
                }
    
                });
    
                $.ajax ({
                    'async': false,
                    'global': false,
                    'dataType': 'json',
                    'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=totalDeaths',
                    'success': function(data) {
                     //console.log(data)
                    data.forEach(function(key,value) {
                            totalDeaths.push(parseInt(key["Total Deaths"]));
                            totdeathDate.push(key["Date"]);
                        });
                        
                    totalDeaths.reverse();
                    totdeathDate.reverse();
                        if(screen.width <= 767) {
                            stepValue = { step: 30};
                        } else {
                            stepValue = { step: 35};  
                        }
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
                            }
                        },
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
    
                    xAxis: {
    
                        type: 'datetime',
                        tickPixelInterval: 400,
                        categories : deathDate,
                        labels:  stepValue
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
                
                $("#globaltotal").click(function(){
                    console.log(stepValue);
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
    
                xAxis: {
    
                    type: 'datetime',
                    tickPixelInterval: 400,
                    categories : totdeathDate,
                    labels:  stepValue
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
            $("#container .highcharts-graph, #container .highcharts-label-box.highcharts-tooltip-box").css("stroke", "#f00")
            $("#container .highcharts-point, #container .highcharts-halo.highcharts-color-0, #container .highcharts-markers.highcharts-series-0.highcharts-line-series.highcharts-color-0.highcharts-tracker.highcharts-series-hover path").css("fill", "#f00");
                    $("#container .highcharts-label.highcharts-tooltip.highcharts-color-0 text tspan:nth-child(2)").css("fill","#f00")
                              
                    
                })
                

                $("#globaldaily").click(function(){
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
                            }
                        },
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
    
                    xAxis: {
    
                        type: 'datetime',
                        tickPixelInterval: 400,
                        categories : deathDate,
                        labels:  stepValue
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

                })
            });
                
                           
                       
        var totalconfirmed = [];
        var totaldeaths = [];
        var totalrecovered = [];
        var totaldeceased = [];
        var resDate = [];
        $(function() {
            jQuery("#totrec").click(function(){
                chart2.series[0].update({
                    name: 'Recovered cases',
                    color: '#0bab02'
                });
                $(this).addClass("active");
                $("#totconf").removeClass("active");
                $("#totdea").removeClass("active");
            });
            jQuery("#totconf").click(function(){
                chart2.series[0].update({
                    name: 'Confirmed cases',
                    color: '#035add'
                });
                $(this).addClass("active");
                $("#totrec").removeClass("active");
                $("#totdea").removeClass("active");
            });
            jQuery("#totdea").click(function(){
                chart2.series[0].update({
                    name: 'Deaths',
                    color: '#f00'
                });
                $(this).addClass("active");
                $("#totconf").removeClass("active");
                $("#totrec").removeClass("active");
            });
            $.ajax ({
                 'async': false,
                 'global': false,
                 'dataType': 'json',
                 'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=dailyIndia',
                 'success': function(data) {
                     // console.log(data.cases_time_series)
                     var result = data.cases_time_series;
                     console.log(result)
                     result.forEach(function(key,value) {
                        totalrecovered.push(parseInt(key["totalrecovered"]));
                         totalconfirmed.push(parseInt(key["totalconfirmed"]));
                         totaldeceased.push(parseInt(key["totaldeceased"]));
                             resDate.push(key["date"].slice(0, 6));
                         });
                         console.log(totalconfirmed);
                         if(screen.width <= 767) {
                             stepValue = { step: 10};
                         } else {
                             stepValue = { step: 5};  
                         }
                 }
         
            });
           
            Highcharts.Series.prototype.pointClass.prototype.isValid = function() {
                var isLogCorrect = this.series.yAxis.isLog ? this.y > 0 : true,
                    isValid = this.x !== null && Highcharts.isNumber(this.y, true) && isLogCorrect;

                return isValid;
                };

                Highcharts.addEvent(Highcharts.Series, 'afterTranslate', function() {
                Highcharts.each(this.points, function(point) {
                    point.isNull = !point.isValid();
                })
            });

            var chart2 = new Highcharts.Chart({
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
            renderTo: 'indiastats'
        },
        title: {
            text: ' '
        },
        credits: {enabled: false},
        xAxis: {
        type: 'datetime',
        tickPixelInterval: 400,
        categories : resDate,
        labels:  stepValue
        },
        series: [{
            data: totalconfirmed,
            name: 'Confirmed Cases',
            color: '#035add'
        }]
    });
        })


// $(document).ready(function() {
//             Highcharts.setOptions({
//                 lang: {
//                 thousandsSep: ','
//                 }
//             });
//             var dailyconfirmed = [];
//             var dailydeceased = [];
//             var totalconfirmed = [];
//             var totaldeceased = [];
//             var resDate = [];
//             $.ajax ({
//                  'async': false,
//                  'global': false,
//                  'dataType': 'json',
//                  'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=dailyIndia',
//                  'success': function(data) {
//                      // console.log(data.cases_time_series)
//                      var result = data.cases_time_series;
//                      console.log(result)
//                      result.forEach(function(key,value) {
//                          dailyconfirmed.push(parseInt(key["dailyconfirmed"]));
//                          dailydeceased.push(parseInt(key["dailydeceased"]));
//                          totalconfirmed.push(parseInt(key["totalconfirmed"]));
//                          totaldeceased.push(parseInt(key["totaldeceased"]));
//                              resDate.push(key["date"].slice(0, 6));
//                          });
//                          console.log(dailydeceased);
//                          if(screen.width <= 767) {
//                              stepValue = { step: 10};
//                          } else {
//                              stepValue = { step: 5};  
//                          }
//                  }
         
//             });
            
//             Highcharts.chart('dailyconfirmed-container', {
//                 exporting: {
//                     buttons: {
//                          customButton: {
//                              text: 'Linear',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'linear'
//                                  });
//                              }
//                          },
//                          customButton2: {
//                              text: 'Logarithmic',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'logarithmic'
//                                  });
//                              }
//                          }
//                     },
//                 },    
//              title: {
//                  text: ''
//              },
         
//              subtitle: {
//                  text: ''
//              },
         
//              yAxis: {
         
//                  title: {
//                      text: 'Number of Confirmedcases'
//                  }
//              },
         
//              xAxis: {
         
//                  type: 'datetime',
//                  tickPixelInterval: 400,
//          categories : resDate,
//                  labels:  stepValue
//              },
         
//              series: [{
//                  name: 'Confirmed Cases',
//                  data: dailyconfirmed
//              }, ],
         
//              responsive: {
//                  rules: [{
//                      condition: {
//                          maxWidth: 500,
//                      },
         
//                      chartOptions: {
         
//                          legend: {
//                              layout: 'horizontal',
//                              align: 'center',
//                              verticalAlign: 'bottom'
//                          }
//                      }
//                  }]
//              }
         
//          });
         
//          Highcharts.chart('dailydeceased-container', {
//             exporting: {
//                     buttons: {
//                          customButton: {
//                              text: 'Linear',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'linear'
//                                  });
//                              }
//                          },
//                          customButton2: {
//                              text: 'Logarithmic',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'logarithmic'
//                                  });
//                              }
//                          }
//                     },
//                 },    
//              title: {
//                  text: ''
//              },
         
//              subtitle: {
//                  text: ''
//              },
         
//              yAxis: {
         
//                  title: {
//                      text: 'Number of Deaths'
//                  }
//              },
         
//              xAxis: {
         
//                  type: 'datetime',
//                  tickPixelInterval: 400,
//          categories : resDate,
//                  labels:  stepValue
//              },
         
//              series: [{
//                  name: 'Daily Deaths',
//                  data: dailydeceased
//              }, ],
         
//              responsive: {
//                  rules: [{
//                      condition: {
//                          maxWidth: 500,
//                      },
         
//                      chartOptions: {
         
//                          legend: {
//                              layout: 'horizontal',
//                              align: 'center',
//                              verticalAlign: 'bottom'
//                          }
//                      }
//                  }]
//              }
         
//          });
         
//          $("#dailyconfirmed").click(function(){
//             Highcharts.chart('dailyconfirmed-container', {
//                 exporting: {
//                     buttons: {
//                          customButton: {
//                              text: 'Linear',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'linear'
//                                  });
//                              }
//                          },
//                          customButton2: {
//                              text: 'Logarithmic',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'logarithmic'
//                                  });
//                              }
//                          }
//                     },
//                 },    
//              title: {
//                  text: ''
//              },
         
//              subtitle: {
//                  text: ''
//              },
         
//              yAxis: {
         
//                  title: {
//                      text: 'Number of Confirmedcases'
//                  }
//              },
         
//              xAxis: {
         
//                  type: 'datetime',
//                  tickPixelInterval: 400,
//          categories : resDate,
//                  labels:  stepValue
//              },
         
//              series: [{
//                  name: 'Confirmed Cases',
//                  data: dailyconfirmed
//              }, ],
         
//              responsive: {
//                  rules: [{
//                      condition: {
//                          maxWidth: 500,
//                      },
         
//                      chartOptions: {
         
//                          legend: {
//                              layout: 'horizontal',
//                              align: 'center',
//                              verticalAlign: 'bottom'
//                          }
//                      }
//                  }]
//              }
         
//          });
         
//          })
//          $("#totalconfirmed").click(function(){
//             Highcharts.chart('dailyconfirmed-container', {
//                 exporting: {
//                     buttons: {
//                          customButton: {
//                              text: 'Linear',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'linear'
//                                  });
//                              }
//                          },
//                          customButton2: {
//                              text: 'Logarithmic',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'logarithmic'
//                                  });
//                              }
//                          }
//                     },
//                 },    
//              title: {
//                  text: ''
//              },
         
//              subtitle: {
//                  text: ''
//              },
         
//              yAxis: {
         
//                  title: {
//                      text: 'Number of Confirmedcases'
//                  }
//              },
         
//              xAxis: {
         
//                  type: 'datetime',
//                  tickPixelInterval: 400,
//                 categories : resDate,
//                  labels:  stepValue
//              },
         
//              series: [{
//                  name: 'Confirmed Cases',
//                  data: totalconfirmed
//              }, ],
         
//              responsive: {
//                  rules: [{
//                      condition: {
//                          maxWidth: 500,
//                      },
         
//                      chartOptions: {
         
//                          legend: {
//                              layout: 'horizontal',
//                              align: 'center',
//                              verticalAlign: 'bottom'
//                          }
//                      }
//                  }]
//              }
         
//          });
         
//          })
//          $("#dailydeceased").click(function () {
//              Highcharts.chart('dailydeceased-container', {
//                 exporting: {
//                     buttons: {
//                          customButton: {
//                              text: 'Linear',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'linear'
//                                  });
//                              }
//                          },
//                          customButton2: {
//                              text: 'Logarithmic',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'logarithmic'
//                                  });
//                              }
//                          }
//                     },
//                 },
//              title: {
//                  text: ''
//              },
         
//              subtitle: {
//                  text: ''
//              },
         
//              yAxis: {
         
//                  title: {
//                      text: 'Number of Deaths'
//                  }
//              },
         
//              xAxis: {
         
//                  type: 'datetime',
//                  tickPixelInterval: 400,
//          categories : resDate,
//                  labels:  stepValue
//              },
         
//              series: [{
//                  name: 'Daily Deaths',
//                  data: dailydeceased
//              }, ],
         
//              responsive: {
//                  rules: [{
//                      condition: {
//                          maxWidth: 500,
//                      },
         
//                      chartOptions: {
         
//                          legend: {
//                              layout: 'horizontal',
//                              align: 'center',
//                              verticalAlign: 'bottom'
//                          }
//                      }
//                  }]
//              }
         
//          });
         
//          });
//          $("#totaldeceased").click(function () {
//          Highcharts.chart('dailydeceased-container', {
//             exporting: {
//                     buttons: {
//                          customButton: {
//                              text: 'Linear',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'linear'
//                                  });
//                              }
//                          },
//                          customButton2: {
//                              text: 'Logarithmic',
//                              onclick: function() {
//                                  this.yAxis[0].update({
//                                      type: 'logarithmic'
//                                  });
//                              }
//                          }
//                     },
//                 },title: {
//                  text: ''
//              },
         
//              subtitle: {
//                  text: ''
//              },
         
//              yAxis: {
         
//                  title: {
//                      text: 'Number of Deaths'
//                  }
//              },
         
//              xAxis: {
         
//                  type: 'datetime',
//                  tickPixelInterval: 400,
//          categories : resDate,
//                  labels:  stepValue
//              },
         
//              series: [{
//                  name: 'Total Deaths',
//                  data: totaldeceased
//              }, ],
         
//              responsive: {
//                  rules: [{
//                      condition: {
//                          maxWidth: 500,
//                      },
         
//                      chartOptions: {
         
//                          legend: {
//                              layout: 'horizontal',
//                              align: 'center',
//                              verticalAlign: 'bottom'
//                          }
//                      }
//                  }]
//              }
         
//          });
         
//          });
         


// $(function() {
//    $(".btn1").click(function() {
//       // remove classes from all
//       $(".btn1").removeClass("active");
//       // add class to the one we clicked
//       $(this).addClass("active");
//    });
// });


// $(function() {
//    $(".btn2").click(function() {
//       // remove classes from all
//       $(".btn2").removeClass("active");
//       // add class to the one we clicked
//       $(this).addClass("active");
//    });
// });

//          });

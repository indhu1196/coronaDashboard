$(document).ready(function() {
            Highcharts.setOptions({
                lang: {
                thousandsSep: ','
                }
            });
            var dailyconfirmed = [];
            var dailydeceased = [];
            var totalconfirmed = [];
            var totaldeceased = [];
            var resDate = [];
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
                         dailyconfirmed.push(parseInt(key["dailyconfirmed"]));
                         dailydeceased.push(parseInt(key["dailydeceased"]));
                         totalconfirmed.push(parseInt(key["totalconfirmed"]));
                         totaldeceased.push(parseInt(key["totaldeceased"]));
                             resDate.push(key["date"].slice(0, 6));
                         });
                         console.log(dailydeceased);
                         if(screen.width <= 767) {
                             stepValue = { step: 10};
                         } else {
                             stepValue = { step: 5};  
                         }
                 }
         
            });
            
            Highcharts.chart('dailyconfirmed-container', {
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
                     text: 'Number of Confirmedcases'
                 }
             },
         
             xAxis: {
         
                 type: 'datetime',
                 tickPixelInterval: 400,
         categories : resDate,
                 labels:  stepValue
             },
         
             series: [{
                 name: 'Confirmed Cases',
                 data: dailyconfirmed
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
         
         Highcharts.chart('dailydeceased-container', {
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
         categories : resDate,
                 labels:  stepValue
             },
         
             series: [{
                 name: 'Deceased Cases',
                 data: dailydeceased
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
         
         $("#dailyconfirmed").click(function(){
            Highcharts.chart('dailyconfirmed-container', {
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
                     text: 'Number of Confirmedcases'
                 }
             },
         
             xAxis: {
         
                 type: 'datetime',
                 tickPixelInterval: 400,
         categories : resDate,
                 labels:  stepValue
             },
         
             series: [{
                 name: 'Confirmed Cases',
                 data: dailyconfirmed
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
         $("#totalconfirmed").click(function(){
            Highcharts.chart('dailyconfirmed-container', {
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
                     text: 'Number of Confirmedcases'
                 }
             },
         
             xAxis: {
         
                 type: 'datetime',
                 tickPixelInterval: 400,
                categories : resDate,
                 labels:  stepValue
             },
         
             series: [{
                 name: 'Confirmed Cases',
                 data: totalconfirmed
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
         $("#dailydeceased").click(function () {
             Highcharts.chart('dailydeceased-container', {
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
         categories : resDate,
                 labels:  stepValue
             },
         
             series: [{
                 name: 'Deceased Cases',
                 data: dailydeceased
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
         $("#totaldeceased").click(function () {
         Highcharts.chart('dailydeceased-container', {
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
                },title: {
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
         categories : resDate,
                 labels:  stepValue
             },
         
             series: [{
                 name: 'Deceased Cases',
                 data: totaldeceased
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
         


$(function() {
   $(".btn1").click(function() {
      // remove classes from all
      $(".btn1").removeClass("active");
      // add class to the one we clicked
      $(this).addClass("active");
   });
});


$(function() {
   $(".btn2").click(function() {
      // remove classes from all
      $(".btn2").removeClass("active");
      // add class to the one we clicked
      $(this).addClass("active");
   });
});

         });
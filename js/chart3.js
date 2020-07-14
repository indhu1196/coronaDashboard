var totalconf = [], initialdata = [];
        var totaldea = [];
        var totalrec = [];
        var resDate = [];
        var fortest;
        fortest = initialdata;
        jQuery(document).ready(function() {
            Highcharts.setOptions({
                lang: {
                thousandsSep: ','
                }
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
                            initialdata.push(parseInt(key["totalconfirmed"]));
                            totalrec.push(parseInt(key["totalrecovered"]));
                                totalconf.push(parseInt(key["totalconfirmed"]));
                                totaldea.push(parseInt(key["totaldeceased"]));
                                    resDate.push(key["date"].slice(0, 6));
                            });
                            console.log(totaldea);
                            if(screen.width <= 767) {
                                stepValue = { step: 20};
                            } else {
                                stepValue = { step: 10};  
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
                    data: fortest,
                    name: 'Confirmed Cases',
                    color: '#035add'
                }]
            });

jQuery("#totconf").click(function(){
                fortest = totalconf
                chart2.series[0].setData(fortest)
                chart2.series[0].update({
                    name: 'Confirmed cases',
                    // data: fortest,
                    color: '#035add'
                });
                $(this).addClass("active");
                $("#totrec").removeClass("active");
                $("#totdea").removeClass("active");
            });
            jQuery("#totrec").click(function(){
                // chart2.series[0].setData(totrec)
                fortest = totalrec
                console.log(fortest)
                chart2.series[0].update({
                    name: 'Recovered cases',
                    data: fortest,
                    color: '#0bab02'
                });
                $(this).addClass("active");
                $("#totconf").removeClass("active");
                $("#totdea").removeClass("active");
            });
            jQuery("#totdea").click(function(){
                fortest = totaldea
                console.log(fortest)
                // chart2.series[0].setData(fortest)
                chart2.series[0].update({
                    name: 'Deaths',
                    data: fortest,
                    color: '#f00'
                });
                $(this).addClass("active");
                $("#totconf").removeClass("active");
                $("#totrec").removeClass("active");
            });
            
        })



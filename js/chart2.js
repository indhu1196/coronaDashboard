// function drawchart2(){
//     $(document).ready(function() {
//         var totalDeaths = [];
//         var totdeathDate = [];
//         var dates = [];
//         $.ajax({
//             'async': false,
//             'global': false,
//             'dataType': 'json',
//             'url': 'https://thefederal.com/api/scraper.php?m=Corona&t=totalDeaths',
//             'success': function(data) {
//                 //console.log(data)
//                 data.forEach(function(key, value) {
//                     totalDeaths.push(parseInt(key["Total Deaths"]));
//                     totdeathDate.push(key["Date"]);
//                 });
    
//                 totalDeaths.reverse();
//                 totdeathDate.reverse();
//                 if (screen.width <= 767) {
//                     stepValue = {
//                         step: 10
//                     };
//                 } else {
//                     stepValue = {
//                         step: 10
//                     };
//                 }
//                 // console.log("Deaths"+JSON.stringify(totdeathDate));
//             }
    
//         });
    
//         Highcharts.chart('totalDeath-container', {
//     exporting: {
//                 buttons: {
//                     customButton: {
//                         text: 'Linear',
//                         onclick: function() {
//                             this.yAxis[0].update({
//                                 type: 'linear'
//                             });
//                         }
//                     },
//                     customButton2: {
//                         text: 'Logarithmic',
//                         onclick: function() {
//                             this.yAxis[0].update({
//                                 type: 'logarithmic'
//                             });
//                         }
//                     },
//                 }
//             },
//             chart: {
//                 height: 500
//             },
//             title: {
//                 text: ''
//             },
    
//             subtitle: {
//                 text: ''
//             },
    
//             yAxis: {
    
//                 title: {
//                     text: 'Number of Deaths'
//                 }
//             },
    
//             /* xAxis: {
//              type: 'datetime',
//                  accessibility: {
//                      rangeDescription: 'Range: 2010 to 2017'
//                  }
//              },
    
    
//              plotOptions: {
//                  series: {
//                      label: {
//                          connectorAllowed: false
//                      },
//                      pointStart: Date.UTC(2020, 0, 02),
//                      pointInterval: 24 * 3600 * 1000,
//                  }
//              },*/
//             xAxis: {
    
//                 type: 'datetime',
//                 tickPixelInterval: 400,
//                 categories: totdeathDate,
//                 labels: stepValue
//             },
    
//             series: [{
//                 name: 'Total Deaths',
//                 data: totalDeaths
//             }, ],
    
//             responsive: {
//                 rules: [{
//                     condition: {
//                         maxWidth: 500,
//                     },
    
//                     chartOptions: {
    
//                         legend: {
//                             layout: 'horizontal',
//                             align: 'center',
//                             verticalAlign: 'bottom'
//                         }
//                     }
//                 }]
//             }
    
//         });
//     });
// }

// drawchart2();

$(function () {
    var start = [];
    var an= [], ap = [],ar = [],as = [],br = [],ch = [],ct = [],dd = [],dl = [],dn = [],ga = [],gj = [],hp = [],hr = [],jh = [],jk = [],ka = [],kl = [],la = [],ld = [],mh = [],ml = [],mn = [],mp = [],mz = [],nl = [],or = [],pb = [],py = [],rj = [],sk = [],tg = [],tn = [],tr = [], up = [],ut = [],wb = [] ;
    var tt= [], statesDate = [], allIndiaData = [], arr = ["Confirmed","Recovered"];
    var casedesc;
    loadData("Confirmed",0);
    jQuery('#recovered').click(function () {
        loadData("Recovered",1);
        var selVal = $("#selectData").val();
        $("#selectData").val(selVal).trigger('change');
        chart2.series[0].update({
            name: 'Recovered cases',
            color: '#0bab02'
        });
        $(this).addClass("active");
        $("#confirmed").removeClass("active");
        $("#deceased").removeClass("active");
    });
	jQuery('#confirmed').click(function () {
        loadData("Confirmed",1);
        var selVal = $("#selectData").val();
        $("#selectData").val(selVal).trigger('change');
        $(this).addClass("active");
        $("#recovered").removeClass("active");
        $("#deceased").removeClass("active");
        chart2.series[0].update({
            name: 'Confirmed cases',
            color: '#035add'
        });
    });
	jQuery('#deceased').click(function () {
        loadData("Deceased",1);
        var selVal = $("#selectData").val();
        $("#selectData").val(selVal).trigger('change');
         $(this).addClass("active");
        $("#confirmed").removeClass("active");
        $("#recovered").removeClass("active");
        chart2.series[0].update({
            name: 'Deaths',
            color: '#f00'
        });
    });
    
function loadData(filter,clicked) {
     an= [], ap = [],ar = [],as = [],br = [],ch = [],ct = [],dd = [],dl = [],dn = [],ga = [],gj = [],hp = [],hr = [],jh = [],jk = [],ka = [],kl = [],la = [],ld = [],mh = [],ml = [],mn = [],mp = [],mz = [],nl = [],or = [],pb = [],py = [],rj = [],sk = [],tg = [],tn = [],tr = [], up = [],ut = [],wb = [] ;
    tt= [], statesDate = [], allIndiaData = [];
    $.ajax ({
        'async': false,
        'global': false,
        'dataType': 'json',
        'url': 'https://api.covid19india.org/states_daily.json',
        'success': function(data) {
                var result = data.states_daily;
				var canAdd;
                result.forEach(function(key,value) {
				    canAdd = 0;
					for (let [k1, v1] of Object.entries(key)) {
					  if(k1== "status" && v1==filter){
							canAdd = 1
						}
					}
                    if(canAdd){
                        // console.log(casedesc)
                        an.push(parseInt(key["an"]));
                        ap.push(parseInt(key["ap"]));
                        ar.push(parseInt(key["ar"]));
                        as.push(parseInt(key["as"]));
                        br.push(parseInt(key["br"]));
                        ch.push(parseInt(key["ch"]));
                        ct.push(parseInt(key["ct"]));
                        dd.push(parseInt(key["dd"]));
                        dl.push(parseInt(key["dl"]));
                        dn.push(parseInt(key["dn"]));
                        ga.push(parseInt(key["ga"]));
                        gj.push(parseInt(key["gj"]));
                        hp.push(parseInt(key["hp"]));
                        hr.push(parseInt(key["hr"]));
                        jh.push(parseInt(key["jh"]));
                        jk.push(parseInt(key["jk"]));
                        ka.push(parseInt(key["ka"]));
                        kl.push(parseInt(key["kl"]));
                        la.push(parseInt(key["la"]));
                        ld.push(parseInt(key["ld"]));
                        mh.push(parseInt(key["mh"]));
                        ml.push(parseInt(key["ml"]));
                        mn.push(parseInt(key["mn"]));
                        mp.push(parseInt(key["mp"]));
                        mz.push(parseInt(key["mz"]));
                        nl.push(parseInt(key["nl"]));
                        or.push(parseInt(key["or"]));
                        pb.push(parseInt(key["pb"]));
                        py.push(parseInt(key["py"]));
                        rj.push(parseInt(key["rj"]));
                        sk.push(parseInt(key["sk"]));
                        tg.push(parseInt(key["tg"]));
                        tn.push(parseInt(key["tn"]));
                        tr.push(parseInt(key["tr"]));
                        allIndiaData.push(parseInt(key["tt"]));
                        tt.push(parseInt(key["tt"]));
                        up.push(parseInt(key["up"]));
                        ut.push(parseInt(key["ut"]));
                        wb.push(parseInt(key["wb"]));
                        statesDate.push(key["date"].slice(0,6));
                    }
                });
                    //console.log("TN DATA"+JSON.stringify(tn));
                    if(screen.width <= 767) {
                        stepValue = { step: 30};
                    } else {
                        stepValue = { step: 35};  
                    }
            }
			
    });
	// if(clicked) {
    //     chart2.series[0].setData(allIndiaData);
	// }
}

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
            renderTo: 'container2'
        },
        title: {
            text: ' '
        },
        credits: {enabled: false},
        xAxis: {
        type: 'datetime',
        tickPixelInterval: 400,
        categories : statesDate,
        labels:  stepValue
        },
        series: [{
            data: allIndiaData,
            name: 'Confirmed Cases',
            color: '#035add'
        }]
    });
    // The select action
    $("#selectData").on('change', function(){
        var selVal = $("#selectData").val();
        if(selVal == "an" || selVal == '') {
            chart2.series[0].setData(an);
        }
        else if (selVal == "ap") {
            chart2.series[0].setData(ap);
        }
        else if (selVal == "ar") {
            chart2.series[0].setData(ar);
        }
        else if (selVal == "as") {
            chart2.series[0].setData(as);
        }
        else if (selVal == "br") {
            chart2.series[0].setData(br);
        }
        else if (selVal == "ch") {
            chart2.series[0].setData(ch);
        }
        else if (selVal == "ct") {
            chart2.series[0].setData(ct);
        }
        else if (selVal == "dd") {
            chart2.series[0].setData(dd);
        }
        else if (selVal == "dl") {
            chart2.series[0].setData(dl);
        }
        else if (selVal == "dn") {
            chart2.series[0].setData(dn);
        }
        else if (selVal == "ga") {
            chart2.series[0].setData(ga);
        }
        else if (selVal == "gj") {
            chart2.series[0].setData(gj);
        }
        else if (selVal == "hp") {
            chart2.series[0].setData(hp);
        }
        else if (selVal == "hr") {
            chart2.series[0].setData(hr);
        }
        else if (selVal == "jh") {
            chart2.series[0].setData(jh);
        }
        else if (selVal == "jk") {
            chart2.series[0].setData(jk);
        }
        else if (selVal == "ka") {
            chart2.series[0].setData(ka);
        }
        else if (selVal == "kl") {
            chart2.series[0].setData(kl);
        }
        else if (selVal == "la") {
            chart2.series[0].setData(la);
        }
        else if (selVal == "ld") {
            chart2.series[0].setData(ld);
        }
        else if (selVal == "mh") {
            chart2.series[0].setData(mh);
        }
        else if (selVal == "ml") {
            chart2.series[0].setData(ml);
        }
        else if (selVal == "mn") {
            chart2.series[0].setData(mn);
        }
        else if (selVal == "mp") {
            chart2.series[0].setData(mp);
        }
        else if (selVal == "mz") {
            chart2.series[0].setData(mz);
        }
        else if (selVal == "nl") {
            chart2.series[0].setData(nl);
        }
        else if (selVal == "or") {
            chart2.series[0].setData(or);
        }
        else if (selVal == "pb") {
            chart2.series[0].setData(pb);
        }
        else if (selVal == "py") {
            chart2.series[0].setData(py);
        }
        else if (selVal == "rj") {
            chart2.series[0].setData(rj);
        }
        else if (selVal == "sk") {
            chart2.series[0].setData(sk);
        }
        else if (selVal == "tg") {
            chart2.series[0].setData(tg);
        }
        else if (selVal == "tn") {
            chart2.series[0].setData(tn);
        }
        else if (selVal == "tr") {
            chart2.series[0].setData(tr);
        }
        else if (selVal == "tt") {
            chart2.series[0].setData(tt);
        }
        else if (selVal == "up") {
            chart2.series[0].setData(up);
        }
        else if (selVal == "ut") {
            chart2.series[0].setData(ut);
        }
        else if (selVal == "wb") {
            chart2.series[0].setData(wb);
        }
    });

    
});

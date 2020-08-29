function drawIndiaMap(selector){
    var width = 300, height = 332, scale = 580, center = [82.8, 23.4];
    var source = "js/maps/india_2019.json";
    var svg = d3.select(selector)
    .append("svg")
    .attr("class", "india map")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin")
    // var colorScale = {
    //     "0": "#EEEEEE",
    //     "10": "#FEE5D9",
    //     "30": "#FEE5D9",
    // }
   
    // var colorScale = d3.scaleThreshold()
    // .domain([1, 180, 350, 530, 700, 890])
    // .domain([0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000])
    // .range(["#fde8de", "#FDD5C3", "#FCA487", "#FA7254", "#E83A2E", "#BC171C"]);
    var colorScale = d3.scaleThreshold()
    .domain([0, 2000 ,10000 ,20000, 40000, 70000, 90000, 100000, 120000])
    .range(["#fff5f0"  ,"#fee0d2","#fcbba1" ,"#fc9272" ,"#fb6a4a" ,"#ef3b2c" ,"#cb181d" ,"#a50f15" ,"#67000d"]);
    // .range(d3.schemeReds[6]);
    var tool_tip = d3.tip()
        .attr("class", "d3-tipforline")
        .offset([-15, 0])
        .html(function(d) {
            
            
            var fd = _.filter(indiaData, function(items){
                return items.stateId === d.properties.ST_CODE
            })

            
            
            var fdjk = _.filter(indiaData, function(items){
                return items.stateId === "U08"
            })
            
            
            var html;

            

            if(fd[0] !== undefined){


                
                html = "<p>"+d.properties.ST_NM+"</p> "
                
            
                    html += "<p>Total Confirmed Cases: <span>"+ parseInt(fd[0]["totalIndianCases"]).toLocaleString('en-IN') +"</span></p> "
   

                return html; 
            }else{
                html = "<p>"+d.properties.ST_NM+"</p> "
                html += "<p>Total Confirmed Cases: <span>-</span></p> "
                return html; 
            }


            
        });
    svg.call(tool_tip);
    var g = svg.append("g")
    var projection = d3.geoMercator()
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2])


    var geoPath = d3.geoPath()
        .projection(projection)
    // function centroids(boundarydata){
    //     return boundarydata.map(function (d){
    //         return {
    //             center: projection(d3.geoCentroid(d)),
    //             id: parseInt(d.id)
    //         }
    //     });
    // }

       
        

        
    d3.json(source, function(error, mapboundary){
        var statewise = topojson.feature(mapboundary, mapboundary.objects.collection).features;
        
        // var stateCentroid = centroids(statewise);
        g.selectAll(".state")
            .data(statewise).enter().append("path")
                .attr("d", geoPath)
                .attr("class", function(d, i){
                    // console.log(d.properties.ST_CODE, d.properties.ST_NM)
                    return "state "+ d.properties.ST_CODE
                })
                .attr("stroke", "#000000")
                .attr("stroke-width", 0.2)
                .attr('fill', function(d,i){
                    
                    var fd = _.filter(indiaData, function(items){
                        return items.stateId === d.properties.ST_CODE
                    })
                    
                    var fd = _.filter(indiaData, function(items){
                        return items.stateId === d.properties.ST_CODE
                    })

                    
                    
                    if(fd[0] !== undefined){

                        if(d.properties.ST_CODE !== "S09"){
                            return colorScale(fd[0]["totalIndianCases"]);
                        }else{
                            return colorScale(fd[0]["totalIndianCases"]);
                        }
                        
                    }else{
                        return "#EEEEEE";
                    }
                    
                })
                .on('mouseover', tool_tip.show)
                .on('mouseout', tool_tip.hide)
                .on("click", function(d,i){

                    $(".state").removeClass("active")
                    $("."+d.properties.ST_CODE).addClass("active")

                    var fd = _.filter(indiaData, function(items){
                        return items.stateId === d.properties.ST_CODE
                    })

                    var fdjk = _.filter(indiaData, function(items){
                        return items.stateId === "U08"
                    })

                    var U08Indian = parseInt(fdjk[0]["totalIndianCases"]);
                    // var U08For = parseInt(fdjk[0]["totalForeignCases"]);
                    var U08Cure = parseInt(fdjk[0]["Cured"]);
                    var U08Death = parseInt(fdjk[0]["Death"]);
                    
                    if(fd[0] !== undefined){
                        // return colorScale(fd[0]["totalIndianCases"]);
                            d3.select("#statename").text(countrynames[d.properties.ST_CODE])
                            animatedFormatData(fd[0]["totalIndianCases"],"#stateConfIndians")
                            // animatedFormatData(fd[0]["totalForeignCases"],"#stateConfForeigners")
                            animatedFormatData(fd[0]["Cured"],"#stateCured")
                            animatedFormatData(fd[0]["Death"],"#stateDead")
                    }else{
                        d3.select("#statename").text(d.properties.ST_NM)
                        d3.select("#stateConfIndians").text("-")
                        // d3.select("#stateConfForeigners").text("-")
                        d3.select("#stateCured").text("-")
                        d3.select("#stateDead").text("-")
                    }
                    
                })
    
    });
}

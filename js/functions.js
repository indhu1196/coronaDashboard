var countrynames = {"S01": "Andhra Pradesh", "S02": "Arunanchal Pradesh", "S03": "Assam", "S04": "Bihar", "S05": "Goa", "S06": "Gujarat", "S07": "Haryana", "S08": "Himachal Pradesh", "S09": "Jammu & Kashmir", "S10": "Karnataka", "S11": "Kerala", "S12": "Madhya Pradesh", "S13": "Maharashtra", "S14": "Manipur", "S15": "Meghalaya", "S16": "Mizoram", "S17": "Nagaland", "S18": "Odisha", "S19": "Punjab", "S20": "Rajasthan", "S21": "Sikkim", "S22": "Tamil Nadu", "S23": "Tripura", "S24": "Uttar Pradesh", "S25": "West Bengal", "S26": "Chhattisgarh", "S27": "Jharkhand", "S28": "Uttarakhand", "S29": "Telangana", "U01": "Andaman & Nicobar Islands", "U02": "Chandigarh", "U03": "Dadra & Nagar Haveli", "U04": "Daman & Diu", "U05": "Delhi", "U06": "Lakshadweep", "U07": "Puducherry", "U08": "Ladakh" }
function createDropDowns(selector, dropdowndata, valuelabel, contentlabel, type){
    // console.log("dropdowndata", dropdowndata);
    if(type === "india"){
        dropdowndata.unshift({
            "S.No": "0",
            stateId: "S00",
            StateName: "All India",
            totalIndianCases: indiaTotal[0]["totalIndians"],
            Cured: indiaTotal[0]["totalCured"],
            Death: indiaTotal[0]["totalDeaths"]
        })
    }
    var select = d3.select(selector)
    select.html(null);
      var options = select.selectAll('option')
            .data(dropdowndata).enter()
            .append('option')
            .attr("value", function (d) { 
                return d[contentlabel]; 
            })
			.attr("data-id", function (d) { 
                return d[valuelabel]; 
            })
            .each(function(d) {
                var header = d3.select(this);
                d3.keys(d).forEach(function(key) {
                    if(d[contentlabel]=="China"){
                        
                        header.attr("selected", 'selected');
                    }
                });
            })
            .each(function(d) {
            var header = d3.select(this);
                d3.keys(d).forEach(function(key) {
                    if(d["Country"]=="China")
                        header.attr("selected", 'selected');
                });
            })
            .each(function(d) {
            var header = d3.select(this);
                d3.keys(d).forEach(function(key) {
                    if(d["Country"]=="China")
                        header.attr("selected", 'selected');
                });
            })
            .text(function (d) { 
               // console.log(":d",countrynames[d[valuelabel]])
                // console.log(":d",d['stateId'])
                // return d[contentlabel]; 
                return countrynames[d[valuelabel]]; 
            });  

        // document.querySelector(selector).selectedIndex = "24";
    $('.dropdown option')
    .filter(function() {
        return !this.value || this.value == 'NULL' || $.trim(this.value).length == 0;
    })
   .remove();
        if(selector == ".dropdown") {
		$('.dropdown').mobileSelect({				
				onClose: function(){
					showCountryData();
				}
			});
    }
    if(selector == ".dropdownstate") {
		$('.dropdownstate').mobileSelect({	
				onClose: function(){
					showStateData();
				}
			});
    }
    
   
}


function animatedFormatData(inputdata,selector) {
    // var datapoint = parseInt(inputdata)
    // console.log(selector, typeof(datapoint));
    // console.log(selector, datapoint);
    

    if(inputdata !== "NULL"){
        var countrySerious = d3.select(selector).text(0)
        countrySerious.transition()
            .tween("text", function() {
                
                var selection = d3.select(this);    // selection of node being transitioned
                var start = d3.select(this).text(); // start value prior to transition
                var end = parseInt(inputdata);                     // specified end value
                var interpolator = d3.interpolateNumber(start,end); // d3 interpolator

                return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
                
            })
            .duration(1000)
            .on("end", function() {
                d3.select(selector).text(numberWithCommas(d3.select(selector).text()));
            });
    }else{
        d3.select(selector).text("-")
    }
}


function showCountryData(){
   // var selectedValue = document.querySelector(".dropdown").value;
    var selectedValue = $('.dropdown option:selected').attr("data-id");
    
    var fdContent = _.filter(filterData, function(d){
        return d.countryId === selectedValue;
    });
    
    console.log("selectedValue", fdContent[0]["New Cases"]);
    console.log("selectedValue", typeof(fdContent[0]["New Cases"]));

    if(fdContent[0]["countryId"] !== "70"){
        d3.select("#countryname").text(fdContent[0]["Country"])

    }else{
        d3.select("#countryname").text(fdContent[0]["Country"])
            .style("font-size", "46px")
            .style("line-height", "55px")
    }

    animatedFormatData(fdContent[0]["Total Cases"],"#countrytotalcases") ;
    animatedFormatData(fdContent[0]["New Cases"],"#countrynewcases");
    
    animatedFormatData(fdContent[0]["Total Deaths"],"#countrytotaldeaths");
    animatedFormatData(fdContent[0]["New Deaths"],"#countrynewdeaths");
    animatedFormatData(fdContent[0]["Total Recovered"],"#countrytotalRecovered");
    animatedFormatData(fdContent[0]["Serious"],"#countrySerious");
}

function showStateData(){
   // var selectedValue = document.querySelector(".dropdownstate").value;
    var selectedValue = $('.dropdownstate option:selected').attr("data-id");
    var fdContent = _.filter(indiaData, function(d){
        return d["stateId"] === selectedValue;
    });
    
    console.log("selectedValue", countrynames[selectedValue]);
    $(".state").removeClass("active")
    $("."+selectedValue).addClass("active")

    if(fdContent[0] !== undefined){
        // return colorScale(fd[0]["totalIndianCases"]);
         d3.select("#statename").text(countrynames[selectedValue])
        animatedFormatData(fdContent[0]["totalIndianCases"],"#stateConfIndians")
        animatedFormatData(fdContent[0]["totalForeignCases"],"#stateConfForeigners")
        animatedFormatData(fdContent[0]["Cured"],"#stateCured")
        animatedFormatData(fdContent[0]["Death"],"#stateDead")
    }

}


var width = 960,
    height = 560;

var svg = d3.select(".container").append("svg")
                           .attr("width", width)
                           .attr("height", height);

d3.json("countries.json", function(error, countries) {
  var projection = d3.geo.orthographic().clipAngle(90)
                                  .translate([width / 2, height / 2]),
      path = d3.geo.path().projection(projection);

  svg.selectAll(".country")
    .data(topojson.feature(countries, countries.objects.subunits).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "country");

    // albers has to be calibrated 

  // svg.append("path")
  //    .datum(topojson.feature(countries, countries.objects.subunits))
  //    .attr("d", path);

});
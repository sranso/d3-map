var width = 960,
    height = 1160;

// extract the definition of the projection
var projection = d3.geo.albers()
    .center([0, 55.4]) // set center
    .rotate([4.4, 0]) // rotate lat and lon
    .parallels([50, 60])
    .scale(1200 * 5)
    .translate([width / 2, height / 2]);

// path generator
var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("uk.json", function(error, uk) {
  // style polygons, add borders
  svg.selectAll(".subunit")
      .data(topojson.feature(uk, uk.objects.subunits).features)
    .enter().append("path") // data join
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path);
});

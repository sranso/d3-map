var width = 960,
    height = 1160;

// extract the definition of the projection
var projection = d3.geo.mercator()
    .scale(500)
    .translate([width / 2, height / 2]);

// path generator
var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("uk.json", function(error, uk) {
  // path element
  svg.append("path")
      // have to convert back to geoJSON for display. below () does that.
      .datum(topojson.feature(uk, uk.objects.subunits))
      .attr("d", path);
});

var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
                           .attr("width", width)
                           .attr("height", height);

d3.json("uk.json", function(error, uk) {
  var subunits = topojson.feature(uk, uk.objects.subunits),
      projection = d3.geo.albers().center([0, 55.4]) // set center
                     .rotate([4.4, 0]) // rotate lat and lon
                     .parallels([50, 60])
                     .scale(6000)
                     .translate([width / 2, height / 2]),
      // path generator
      path = d3.geo.path().projection(projection).pointRadius(4),
      places = topojson.feature(uk, uk.objects.places);

  svg.selectAll(".subunit")
  // style polygons, add borders
      .data(subunits.features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path)
      .on("mouseover", function() {
        d3.select(this).attr("opacity", "0.5");  
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", "1");
      });

  // make borders
  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary");

  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary IRL");

  // add countries' names
  // svg.selectAll(".subunit-label")
  //     .data(subunits.features)
  //   .enter().append("text")
  //     .attr("class", function(d) { return "subunit-label " + d.id; })
  //     .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.properties.name; });

  // add small circle for each city
  svg.selectAll(".place")
      .data(places.features)
      .enter().append("path")
      .attr("d", path)
      .on("mouseover", function(d) {
        svg.append("text")
            .attr("class", "place-label")
            .attr("transform", function() { return "translate(" + projection(d.geometry.coordinates) + ")"; })
            .attr("x", function() { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
            .attr("dy", ".35em")
            .style("text-anchor", function() { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
            .text(function() { return d.properties.name; });
      })
      .on("mouseout", function(d) {
        d3.select("text").remove();
      });

});
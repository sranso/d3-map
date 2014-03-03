var width = 960,
    height = 560;

var svg = d3.select(".container").append("svg")
                           .attr("width", width)
                           .attr("height", height);

var drag = d3.behavior.drag()
    .origin(Object)
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
  console.log(d);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}

d3.json("countries.json", function(error, countries) {
  var projection = d3.geo.orthographic().clipAngle(90)
                                  .translate([width / 2, height / 2]),
      path = d3.geo.path().projection(projection);

  svg.selectAll(".country")
    .data(topojson.feature(countries, countries.objects.subunits).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "country")
    .call(drag);

    // albers has to be calibrated 

  // svg.append("path")
  //    .datum(topojson.feature(countries, countries.objects.subunits))
  //    .attr("d", path);

});
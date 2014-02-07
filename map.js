var h = 800,
    w = 800;

var projection = d3.geo.orthographic()
    .scale(350)
    .translate([w/2, h/2]) // place globe in center of svg
    .clipAngle(90); // 

var path = d3.geo.path().projection(projection); // going to make a projection

var graticule = d3.geo.graticule(); // lat lon lines!

var svg = d3.select("body").append("svg") // make selection, append svg
    .attr("width", w)
    .attr("height", h);

svg.append("path")
    .datum({type: "sphere"}) // built into d3, draw a sphere on the svg
    .attr("id", "globe")
    .attr("d", path); // d stores path coordinates, draws path on svg

d3.json("map.json", function(error, world){
    // make the land
    svg.selectAll("path.land")
      .data(topojson.feature(world, world.objects.land)) // topojson.feature passes in parts of the data
      .enter()
      .append("path")
});
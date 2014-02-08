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
    .datum({type: "Sphere"}) // built into d3, draw a sphere on the svg
    .attr("id", "globe")
    .attr("d", path); // d stores path coordinates, draws path on svg

// queue()
//   .defer(d3.json, "smallerworld.json")
//   .defer(d3.tsv, "countrynames.tsv")
//   .await(ready);

// function ready(error, world, countries) {
//   countries.forEach(function(d) {
//     names[d.id] = d.name;
//   });

//   svg.selectAll("path.land")

// }

d3.json("map.json", function(error, world){
    // make the land
    svg.selectAll("path.land")
      .data(topojson.feature(world, world.objects.land)) // topojson.feature passes in parts of the data
      .enter()
      .append("path")
      .attr("class", "land")
      .attr("d", path)
      .on("mouseover", function(d) {
        d3.select(this).attr("class", "active");

        svg.append("text")
          .text(names[d.id])
          .attr("x", d3.event.pageX)
          .attr("y", d3.event.pageY);
      })
      .on("mousemove", function(d) {
        d3.select("text")
          .attr("x", d3.event.pageX)
          .attr("y", d3.event.pageY);
      })
      .on("mouseout", function(d) {
        d3.select("text")
          .attr("x", d3.event.pageX)
          .attr("y", d3.event.pageY);
      });
    svg.insert("path", ".graticule")
       .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
          return a !== b;
       }))
       .attr("class", "boundary")
       .attr("d", path);

    svg.call("drag");
});

// var drag = d3.behavior.drag().on("drag", function() {
//   var start = {
//     lon: projection.rotate()[0],
//     lat: projection.rotate()[1]
//   },

//   delta = {
//     x: d3.event.dx,
//     y: d3.event.dy
//   },

//   scale = 0.25,

//   end = {
//     lon: start.lon + delta.x * scale,
//     lat: start.lat - delta.y. * scale
//   };

//   end.lat = end.lat >  30 ?  30 :
//             end.lat < -30 ? -30 :
//             end.lat;

//   projection.rotate([end.lon, end.lat]);

//   svg.selectAll("path").attr("d", path);
// });



var h = 960,
    w = 960;

// an azimuthal projection suitable for displaying a single hemisphere
// point of perspective is at infinity
var projection = d3.geo.orthographic()
                       .scale(350)
                       .translate([w/2, h/2]) // place globe in center of svg
                       .clipAngle(90); // 

// going to make a projection
var path = d3.geo.path().projection(projection);

// lat lon lines!
var graticule = d3.geo.graticule();

// make selection, append svg
var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

// this makes an outer sphere. i can color this with blue b/c of the id
// defs: defining a path before i put everything down
svg.append("defs").append("path")
   .datum({type: "Sphere"}) // built into d3, draw a sphere on the svg
   .attr("id", "sphere")
   // d is attribute of a path that holds its coordinates, draws path on svg
   .attr("d", path);

svg.append("path")
   .datum(graticule)
   .attr("class", "graticule")
   .attr("d", path);

d3.json("map.json", function(error, world){
// inserting boundary lines b/t countries
    svg.insert("path", ".graticule")
       .datum(topojson.feature(world, world.objects.land))
       .attr("class", "land")
       .attr("d", path);

    // puts down mesh b/t the countries
    svg.insert("path", ".graticule")
       .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
          return a !== b;
          // make a line where a country is different
       }))
       .attr("class", "boundary")
       .attr("d", path);

    svg.call(drag);

});

var drag = d3.behavior.drag().on('drag', function() {
  var start = { 
    lon: projection.rotate()[0], 
    lat: projection.rotate()[1]
  },

  delta = { 
    x: d3.event.dx,
    y: d3.event.dy  
  },
    
  scale = 0.25,

  end = { 
    lon: start.lon + delta.x * scale, 
    lat: start.lat - delta.y * scale 
  };

  end.lat = end.lat >  30 ?  30 :
            end.lat < -30 ? -30 :
            end.lat;
  
  projection.rotate([end.lon,end.lat]);

  svg.selectAll("path").attr("d", path);
})


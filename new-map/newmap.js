var width = 960,
    height = 560;

var svg = d3.select(".container").append("svg")
                           .attr("width", width)
                           .attr("height", height);

var projection;

d3.json("countries.json", function(error, countries) {
  projection = d3.geo.orthographic().clipAngle(90).translate([width / 2, height / 2]),
  path = d3.geo.path().projection(projection);

  svg.selectAll(".country")
      .data(topojson.feature(countries, countries.objects.subunits).features)
    .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "country")
      .attr("fill", "rgb(79,151,27");

  svg.call(drag);

    // albers has to be calibrated 

  // svg.append("path")
  //    .datum(topojson.feature(countries, countries.objects.subunits))
  //    .attr("d", path);

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
});
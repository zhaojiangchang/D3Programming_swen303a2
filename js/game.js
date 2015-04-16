// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
var svg = d3.select("body").select("#mainSvg");
function games(){
var path = svg.append("path")
    .data([points])
    .attr("id","pathGame")
    .attr("d", d3.svg.line()
    .tension(0) // Catmull–Rom
    .interpolate("cardinal-closed"));

svg.selectAll(".point")
    .data(points)
  .enter().append("circle")
    .attr("id","circleGame")
    .attr("r", 4)
    .attr("transform", function(d) { return "translate(" + d + ")"; });

var circle = svg.append("circle")
    .attr("r", 8)
    .attr("id", "circleGame")
    .attr("transform", "translate(" + points[0] + ")");

transition();
function transition() {
  circle.transition()
      .duration(10000)
      .attrTween("transform", translateAlong(path.node()))
      .each("end", transition);
}
function translateAlong(path) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}
}
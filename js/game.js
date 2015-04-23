// =================================================================================
// Author: Jacky Chang
// - Game
// inside game function has to functions
// function paths crate path and circles and translate along the path
// function square show a title of the game
// - remove Game
// remove all elements created for Game
//
// =================================================================================
var svg = d3.select("body").select("#mainSvg");
function Game(){
   this.paths = function(){
      var path = svg.append("path")
                    .data([points])
                    .attr("id","pathGame")
                    .attr("d", d3.svg.line()
                    .tension(0)
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
this.square = function(){

    var mySquare = svg.append("rect")
                       .attr("id","mySquare")
                       .attr("x",windowWidth*0.12)
                       .attr("y",windowHeight*0.09)
                       .attr("width",60)
                       .attr("height",60)
                       .transition()
                          .duration(4000)
                          .attr("width", 400)
                          .style("fill","#F5FFC2")
                          .style("cpacity", 0.5)
                          .style("opacity", 0.5)
                          .ease("elastic");

    var text = svg.append("text")
                      .text("eye relaxing game")
                      .attr("id","textOnSquare")
                      .attr("x",windowWidth*0.17)
                      .attr("y",windowHeight*0.15)
                      .attr("font-size", "40px")
                      .attr("fill", "red")
                      .transition()
                        .duration(4000)
                        .style("fill","blue")
                        .style("cpacity", 0.5)
                        .style("opacity", 0.5)
                        .ease("elastic");
    }
}



// =================================================================================
// Author: Jacky Chang
// =================================================================================

//------ Dom elements --------
//var recordExplButton = document.getElementById("record-exploration-button"),
//playExplButton = $("#play-exploration-button"),
//pauseExplButton = $("#pause-exploration-button");
var width = $(window).width(),
height = $(window).height();
var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.attr("class", "showArea")
.attr("id", "showArea");
var b = svg.append("rect")
.attr("id", "box")
.attr("top", $(window).width()-width*0.8)
.attr("left", $(window).height()-height*0.8)
.attr("width", width*0.8)
.attr("height", height*0.8)
.attr("fill", "green");
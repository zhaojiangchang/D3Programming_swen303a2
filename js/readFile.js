// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
var intro = "";
var contactUs = "";
var teamMembers = [];
var points = [];
var homeScreen = [];
var w = window.innerWidth;
var h = window.innerHeight;
var xmin = w*0.2;
var ymin = h*0.209;
var xmax = w*0.599;
var ymax = h*0.79;
var x = d3.scale.linear()
   .domain([0,xmax])
   .range([xmin,xmax])

var y = d3.scale.linear()
   .domain([0,ymax])
   .range([ymin,ymax])
var myjson = d3.json("js/victoriaViewer.json", function(json){
  for(var i = 0; i<json.game.length; i++){
    points[i] = [x(json.game[i].x),y(json.game[i].y)];
  }
  intro = json.introduction;
  teamMembers = json.teamMembers;
  homeScreen = json.homeMenu;
  contactUs = json.contactUs;
  });


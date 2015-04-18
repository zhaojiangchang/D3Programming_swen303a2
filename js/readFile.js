// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
var intro = "";
var contactUsInfo = [];
var teamMembers = [];
var points = [];
var personal = [];
var business = [];
var home = [];
var game = [];
var sentMessage = [];
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
var myjson = d3.json("data/victoriaViewer.json", function(json){
  game = json;
  for(var i = 0; i<json.game.length; i++){
    points[i] = [x(json.game[i].x),y(json.game[i].y)];
  }
  intro = json.introduction;
  teamMembers = json.teamMembers;
  personal = json.personal;
  business = json.business;
  contactUsInfo = json.contactUs;
  sentMessage = json.sentMessage;
  home = json.home;
  console.log(contactUsInfo)
  });
  

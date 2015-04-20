// =================================================================================
// Author: Jacky Chang
// - load json file
// =================================================================================
var intro = [];
var contactUsInfo = [];
var teamMembers = [];
var points = [];
var personal = [];
var business = [];
var home = [];
var sentMessage = [];
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var xmin = windowWidth*0.2;
var ymin = windowHeight*0.209;
var xmax = windowWidth*0.599;
var ymax = windowHeight*0.79;
var x = d3.scale.linear()
   .domain([0,xmax])
   .range([xmin,xmax])

var y = d3.scale.linear()
   .domain([0,ymax])
   .range([ymin,ymax])
var myjson = d3.json("data/victoriaViewer.json", function(json){
      gameFile = json.business;
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
});
  

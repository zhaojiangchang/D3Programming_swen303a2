// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
addTextOnHomeScreen();
homeButton.addEventListener("click", function(){
  removeDisplay();
  addTextOnHomeScreen();
});

gameButton.addEventListener("click", function(){
  removeDisplay();
  games();
});
introButton.addEventListener("click",function(){
  d3.select("body").select("#inforSvg").select("#textArea")
 .text(intro);
});
teamButton.addEventListener("click",function(){
  d3.select("body").select("#inforSvg").select("#textArea")
 .text(getNames())
});
contactButton.addEventListener("click",function(){
  d3.select("body").select("#inforSvg").select("#textArea")
 .text(contactUs);
});
screenResetButton.addEventListener("click", function(){
  removeDisplay();
});
googleMapButton.addEventListener("click", function(){
  removeDisplay();
  iframe("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95998.80691389229!2d174.76185460000008!3d-41.24437005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b1fc49e974cb%3A0xa00ef63a213b470!2sWellington!5e0!3m2!1sen!2snz!4v1429135956500");
});
googleItButton.addEventListener("click", function(){
  removeDisplay();
  iframe( "http://www.google.com/custom?q=&btnG=Search");
});
recordingButton.addEventListener("click", function(){
  removeDisplay();
  recordingVideo();
});
submitMessage.addEventListener("click", function(){
  var m = document.getElementById("messageBox");
  var valueMessage = m.value;
  var messageTo = document.getElementById("messageBoxTo");
  var valueTo = messageTo.value;
  sentMessage.push(new message("user1",valueTo,valueMessage));
  //showMessageOnScreen();
  saveToFile();
});
function getNames(){
    var names = "Team member: ";
    for(var i = 0; i<teamMembers.length; i++){
      names = names+" , "+teamMembers[i].name;
    } 
    return names;
}
function removeDisplay(){
  $("svg#mainSvg").empty();
  $("svg#inforSvg").empty();
  var iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
    iframes[i].parentNode.removeChild(iframes[i]);
}
}

function addTextOnHomeScreen(){
  svg.selectAll(".text")
          .data(homeScreen)
          .enter().append("text")
            .attr("id","homeScreen")
            .attr("fill", "blue")
             .attr("x", function(d){return d.x})
             .attr("y",function(d){return d.y})
            .text(function(d) { return d.option})
            .attr("onmouseover","evt.target.setAttribute('opacity', '0.5')")
            .attr("onmouseout","evt.target.setAttribute('opacity','1)')")
            .on("click",function(d) {doEvent(d.option)})
}
function doEvent(option){
  if(option==="Google It"){
      removeDisplay();
      iframe( "http://www.google.com/custom?q=&btnG=Search");
  }
  else if(option==="Google Map"){
      removeDisplay();
      iframe("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95998.80691389229!2d174.76185460000008!3d-41.24437005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b1fc49e974cb%3A0xa00ef63a213b470!2sWellington!5e0!3m2!1sen!2snz!4v1429135956500");
  }
  else if(option==="Game"){
      removeDisplay();
      games();  
  }
  else if(option==="Take Picture"){
      removeDisplay();
      addPictureToSvg();  
  }
  else if(option==="Recording Video"){
      removeDisplay();
      recordingVideo();  
  }
  else if(option==="Send Message"){
      removeDisplay();
      sendMessage();  
  }
  else if(option==="Stock Trading"){
      removeDisplay();
      $(#stockIframe).show();  
  }
  else if(option==="Shut Down"){
      removeDisplay();
  }
}
function iframe(url){
  var iframe = document.createElement('iframe');
  iframe.id = "iframe";
  iframe.src = url ;
  document.body.appendChild(iframe);

}
function recordingVideo(){
  // adds graphics to the map to show that recording is in progress.
  iframe("https://www.youtube.com/embed/HVhSasnVjMQ?enablejsapi=1&theme=light&showinfo=0");
var w = window.innerWidth;
var h = window.innerHeight;
var width = w*0.599;
var height = h*0.79;
  var borderWidth = 10;
  var circleRadius = 20;
  var padding = 10;
  var bottomPadding = 10;
  var circleCX = borderWidth + circleRadius+10;
  var circleCY = borderWidth + circleRadius+10;

  svg.append("rect")
  .attr({
    id:    "record-border",
    x:     0 + borderWidth/2,
    y:     0 + borderWidth/2,
    width: width - borderWidth,
    height:height - bottomPadding - borderWidth})
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-width", borderWidth);

  svg.append('circle')
  .attr({
    id: "record-circle",
    cx:  circleCX,
    cy:  circleCY,
    r:   circleRadius})
    .style('fill', 'red')
    .transition().duration();
}

//remove recording related graphics
function removeRecordingGraphics(){
  d3.select("#record-border").remove();
  d3.select("#record-circle").remove();
}
function saveToFile(){
var object = JSON.stringify(file(), null, 4);

}
function message(nameFrom, nameTo, message){
  this.from = nameFrom;
  this.to = nameTo;
  this.message = message;
}
function file(){
  this.introduction = intro;
  this.teamMembers = teamMembers;
  this.contactUs = contactUs;
  this.game = game;
  this.homeMenu = homeScreen;
  this.sentMessage = sentMessage;

}
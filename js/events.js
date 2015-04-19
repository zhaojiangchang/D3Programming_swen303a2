// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
var callButtonClicked = false;
var sendMessageButtonClicked = false;
var timeout = false;

function recordingVideo(){
  // adds graphics to the map to show that recording is in progress.
  iframe("https://www.youtube.com/embed/HVhSasnVjMQ?enablejsapi=1&theme=light&showinfo=0");
  var w = window.innerWidth;
  var h = window.innerHeight;
  var width = w*0.51;
  var height = h*0.57;
  var borderWidth = 8;
  var circleRadius = 10;
  var padding = 10;
  var bottomPadding = 10;
  var circleCX = borderWidth + circleRadius+10+ w*0.25;
  var circleCY = borderWidth + circleRadius+10;
  svg.append("rect")
  .attr({
    id:    "record-border",
    x:     10 + borderWidth/2 + w*0.25,
    y:     10 + borderWidth/2,
    width: width - borderWidth,
    height:height - bottomPadding - borderWidth
     })
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

function loadPage(svgId, page){
  document.getElementById("mainSvg").style.background = "black";
  var svg = d3.select("body").select(svgId);
  $("#mainSvg").empty();
  $("#inforSvg").empty();
  remvoeElement("imgDiv");
  remvoeElement("goBackButton");
  removeIframe();
  remvoeElement("image");
  loadVoiceIcon();
  personalClicked = false;
  businessClicked = false;
  svg.selectAll(".text")
          .data(page)
          .enter().append("text")
            .attr("class","personalDisplayOption")
            .attr("id","personalDisplayOption")
            .attr("fill", "white")
            .attr("font-size",20)
            .attr("x", function(d){return d.x})
            .attr("y",function(d){return d.y})
            .text(function(d) { return d.option})
            .attr("onmouseover","evt.target.setAttribute('opacity', '0.5')")
            .attr("onmouseout","evt.target.setAttribute('opacity','1)')")
            .on("click",function(d) {doEvent(d.option, d.instruction, d.use)});
}

function loadImage(imageAdd,id) {
  if(document.getElementById("image"+id)!=null){
      return;
  }
  var div = document.createElement("div");
  div.id = "imgDiv"+id;
  var img = document.createElement("img");
  img.id = "image"+id;
  img.src = imageAdd;
  div.appendChild(img);
  document.body.appendChild(div);
}

function loadVoiceIcon(){
  loadImage("data/voiceIcon.png","Voice");
  var imageVoice = document.getElementById("imageVoice"); 
  var menu = [];
  menu = ["personal","business"];
  loadMenu(imageVoice, menu);
  
}
function loadMenu(imageVoiceElem, menu){
  if(document.getElementById("selection")==null){
        var s=document.createElement('section');
        s.setAttribute('id','selection');
        s.style.display ="none";
        s.addEventListener("click", function(event){
            doEvent(null,null,null,event.target.innerHTML);});
        s.addEventListener("mouseout", function(){ toggleMenu();},false);
        var ul=document.createElement('ul');  
        for (var i=0; i<menu.length; i++){
            var li=document.createElement('li');
            ul.appendChild(li);
            li.innerHTML=menu[i];
        }
        s.appendChild(ul);
        document.body.appendChild(s);
        imageVoiceElem.addEventListener("click", function(){
        toggleMenu();});
  }
}

function doEvent(option, instruction, use, voiceMenu){
   if(voiceMenu!=null){
    console.log(voiceMenu);
    if(voiceMenu==="personal"){
      personalPage();
    }
    else if(voiceMenu ==="business"){
      businessPage();
    }
  }else{
  if(instruction==null){
      return;
  }

  removeGame();
  removeIframe();
  remvoeElement("stockDiv");
  remvoeElement("imageVideoConference");
  $("svg#inforSvg").empty();
  addInstruction(instruction);
  if(option==="Making Call"){
      callButtonClicked = true;
      sendMessageButtonClicked = false;
      if(timeout==true){
        personalClicked = false;
        businessClicked = false;
        timeout = false;
      }
    showTextOnSvg(0);

  }
  else if(option==="Send Message"){
      sendMessageButtonClicked = true;
      callButtonClicked = false;
      if(timeout==true){
        personalClicked = false;
        businessClicked = false;
        timeout = false;
      }
    showTextOnSvg(1);
  }
  else if(option==="Google It"){
      iframe( "http://www.google.com/custom?q=&btnG=Search");
  }
  else if(option==="Google Map"){
      iframe("https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5995.4017183864435!2d174.778369!3d-41.293614500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1swellington+bar+cafe+restaurant+!5e0!3m2!1szh-CN!2snz!4v1429446987355");
  }
  else if(option==="Game"){
      games();  
  }
  else if(option==="Take Picture"){
      loadImage("data/face.jpg", "Picture");
      addGoBackButton();
  }
  else if(option==="Recording Video"){
      recordingVideo();  
  }
  else if(option==="Stock Trading"){
  iframe("data/nz-stoke-exchange.html");
  }
   else if(option==="PowerPoint"){
      showPowerPoint();
  }
  else if(option==="Shut Down"){
    removeRecordingGraphics();
      $("svg#mainSvg").empty();
  }
  else if(option==="Video Conference"){
    loadImage("data/VideoConference.jpg","VideoConference");
  }
  else{

  }
}
}

function iframe(url){
  var iframe = document.createElement('iframe');
  iframe.id = "iframe";
  iframe.src = url ;
  document.body.appendChild(iframe);
}

function removeIframe(){
  removeRecordingGraphics();
  var iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
      iframes[i].parentNode.removeChild(iframes[i]);
  }
}

function remvoeElement(id){
  var element = document.getElementById(id);
  while(element!=null && element.parentNode!=null){
      element.parentNode.removeChild(element);
  }
}

function addGoBackButton(){
  var goBack = document.createElement("button");
  var text = document.createTextNode("Go Back");
  goBack.id = "goBackButton";
  goBack.appendChild(text);
  document.body.appendChild(goBack);
  document.getElementById("goBackButton").addEventListener("click", function(){
  personalPage();
  remvoeElement("goBackButton");
  });
}

function addInstruction(instruction){
  var x = 10;
  var y = 20;
    d3.select("body").select("#inforSvg").selectAll(".text")
          .data(instruction)
          .enter().append("text")
            .attr("fill", "white")
            .attr("font-size",20)
            .attr("x",x)
            .attr("y",y)
            .text(function(d) { return d});
}

function showPowerPoint(){
  iframe("data/slides-victoria-viewer.html");
}

function showTextOnSvg(index){
   $(".personalDisplayOption").toggle();
  
  var x = 150;
  var y = 300;
   for(var i = 0; i<personal[index].use.length; i++){
         doSetTimeOut(i); 
    }
    function doSetTimeOut(i){
      var timer = 0;
      timer = setTimeout(function() {
        remvoeElement("command");
        if((callButtonClicked==true && personalClicked == true)||
          (callButtonClicked==true && businessClicked == true)||
          (sendMessageButtonClicked==true && personalClicked == true)||
          (sendMessageButtonClicked==true && businessClicked == true)){
                timeout = true;
                return stop; 
        }
         
          var txt = personal[index].use[i];
          var t = d3.select("body").select("#mainSvg")
            .append("text")
            .attr("id","command")
            .attr("class", "command")
            .attr("fill", "white")
            .attr("font-size",40)
            .attr("x",x)
            .attr("y",y)
            .text(txt);
        
        return stop;
        function stop(){
            if(timer){
                clearTimeout(timer);
                timer = 0;
        }
      }
      },3000*i);       
    } 
}
/**
zoom home page image, then call loadPage function to load personal or bussiness menues
**/
function zoom(page){
      var img = document.getElementById("imageHome");
    if(img!=null){
      
        var maxWidth = img.width*1.3;
        var maxHeight = img.height*1.3;
        
            var zoomTimer = setInterval(function(){

                if(img!=null && img.width<maxWidth){
                    img.width = img.width*1.005;
                    img.height = img.height*1.005;
     
                }
                else {
                    clearInterval(zoomTimer);
                    remvoeElement("imgDivHome");
                    loadPage("#mainSvg", page);
                }},20);
        
     }
    else if(img==null && document.getElementById("imagePicture")!=null){
        remvoeElement("imgDivPicture");
        remvoeElement("goBackButton");
        loadPage("#mainSvg", page);

    }

    else if(img==null && document.getElementById("imagePicture")==null){
        loadPage("#mainSvg", page);
        loadVoiceIcon();

      }
}

function toggleMenu(){
    if(document.getElementById("selection").style.display ==="block"){
      document.getElementById("selection").style.display="none";
    }
    else if(document.getElementById("selection").style.display==="none"){
      document.getElementById("selection").style.display="block";
    }
}

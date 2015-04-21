// =================================================================================
// Author: Jacky Chang
// - events.js hold all the events for this application

/**
*   draw red dot and red rect when click record video (personal page)
**/
function recordingVideo(){
    // adds graphics to the map to show that recording is in progress.
    iframe("https://www.youtube.com/embed/HVhSasnVjMQ?enablejsapi=1&theme=light&showinfo=0");
    var w = window.innerWidth;
    var h = window.innerHeight;
    var width = w*0.71;
    var height = h*0.57;
    var borderWidth = 8;
    var circleRadius = 10;
    var padding = 10;
    var bottomPadding = 10;
    var circleCX = borderWidth + circleRadius+10+ w*0.1;
    var circleCY = borderWidth + circleRadius+10;
    svg.append("rect")
        .attr({
              id:    "record-border",
              x:     10 + borderWidth/2 + 50,
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
              cx:  circleCX-50,
              cy:  circleCY,
              r:   circleRadius})
              .style('fill', 'red')
              .transition().duration();
}
/**
*  remove recording graphics
**/
function removeRecordingGraphics(){
    d3.select("#record-border").remove();
    d3.select("#record-circle").remove();
}
/**
*  add all text file from json to main svg and infro svg
**/
function loadPage(svgId, page){
    document.getElementById("mainSvg").style.background = "black";
    var svg = d3.select("body").select(svgId);
    $("#mainSvg").empty();
    $("#inforSvg").empty();
    remvoeElement("imgDiv");
    removeIframe();
    remvoeElement("image");
    remvoeElement("imgDivVideoConference");
    if(document.getElementById("imgDivVoice")==null){
          loadVoiceIcon();  
    }
    
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
              .on("click",function(d) {
                    var newPage = copy(page);
                    doEvent(d.option, d.instruction, d.use,null, newPage)
              });
}

/**
*  create image tag
    imageAdd: image address (location)
    id: identify the image (full id: "image"+id)
**/
function loadImage(imageAdd,id) {
    if(document.getElementById("image"+id)!=null){
          return;
    }
   if(document.getElementById("imgDiv"+id)!=null){
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

/**
*  create voice icon
**/
function loadVoiceIcon(){
    loadImage("data/voiceIcon.png","Voice");
    var imageVoice = document.getElementById("imageVoice"); 
    voiceButtonListener();
}
/**
* create listenner for voice icon
* when click pop up box show up (user input to active different functions)
**/
function voiceButtonListener(){
    imageVoice.addEventListener("click", function(event){
          $(".personalDisplayOption").show();    
            remvoeElement("command");
            stopTimer();
            removeGame();
            removeIframe();
            remvoeElement("stockDiv");
            remvoeElement("imgDivVideoConference");
            $("svg#inforSvg").empty();
          if(personalClicked==false && businessClicked==false){
             var environment = prompt("Is it persoanl or Business use?", "Personal");

          if (environment != null) {
              if(environment==="Personal"||environment==="personal"){
                personalPage();
              }
              else if(environment==="business"||environment==="Business"){
                businessPage();
              }
          }
        }
        else if(personalClicked==true){
           var option = prompt("Jacky: Voice input", "Personal Call");
            if(option.indexOf("business")!=-1 || option.indexOf("Business")!=-1){
                businessPage();
            }
           if(option.indexOf("call")!=-1 ||option.indexOf("Call")!=-1){
               // showTextByUserInput(["Veiwer: Please press voice button, and say: name or phone number "],0);  
                $(".personalDisplayOption").show();    
                showTextOnSvg(personal, 0);             
           }
           else if(option.indexOf("message")!=-1 ||option.indexOf("Message")!=-1){
              $(".personalDisplayOption").show();    
                showTextOnSvg(personal, 1);   
           }
           else if(option.indexOf("Google")!=-1 || option.indexOf("google")!=-1){
                showTextByUserInput(["Veiwer: Google search application opening... "],3);               

           }
           else if(option.indexOf("map")!=-1 || option.indexOf("Map")!=-1){
                showTextByUserInput(["Veiwer: Google map application opening... "],4);               
           }
           else if(option.indexOf("game")!=-1 || option.indexOf("Game")!=-1){
                showTextByUserInput(["Veiwer: eye relaxing game app opening... "],6);               
           }
          else if(option.indexOf("Record")!=-1 || option.indexOf("record")!=-1||
            option.indexOf("Video")!=-1 || option.indexOf("video")!=-1){
                showTextByUserInput(["Veiwer: Recording video, please face to the target... "],5);               
           }
           else if(option.indexOf("take")!=-1 || option.indexOf("Take")!=-1||
            option.indexOf("Picture")!=-1 || option.indexOf("Picture")!=-1){
                showTextByUserInput(["Veiwer: take picture focus on your target... "],2);               
           }
           else if(option.indexOf("Shut")!=-1 || option.indexOf("shut")!=-1){
                showTextByUserInput(["Veiwer: Turn off viewer... "],7);
          }
        }
        else if(businessClicked==true){
           var option = prompt("Jacky: Voice input", "Business Call");
            if(option.indexOf("personal")!=-1 || option.indexOf("Personal")!=-1){
                businessPage();
            }
           if(option.indexOf("call")!=-1 ||option.indexOf("Call")!=-1){
                $(".personalDisplayOption").show();    
                showTextOnSvg(business, 0);                
            }
           else if(option.indexOf("message")!=-1 ||option.indexOf("Message")!=-1){
              $(".personalDisplayOption").show();    
                showTextOnSvg(business, 1);   
           }
           else if(option.indexOf("Google")!=-1 || option.indexOf("google")!=-1){
                showTextByUserInput(["Veiwer: Google search application opening... "],3);               

           }
           else if(option.indexOf("map")!=-1 || option.indexOf("Map")!=-1){
                showTextByUserInput(["Veiwer: Google map application opening... "],4);               
           }
           else if(option.indexOf("powerpoint")!=-1 || option.indexOf("Powerpoint")!=-1||option.indexOf("PowerPoint")!=-1){
                showTextByUserInput(["Veiwer: powerPoint opening... "],5);               
           }
          else if(option.indexOf("Conference")!=-1 || option.indexOf("conference")!=-1||
            option.indexOf("Video")!=-1 || option.indexOf("video")!=-1){
                showTextByUserInput(["Veiwer: Video conference starting... "],6);               
           }
           else if(option.indexOf("stock")!=-1 || option.indexOf("Stock")!=-1||
            option.indexOf("Shares")!=-1 || option.indexOf("shares")!=-1){
                showTextByUserInput(["Veiwer:  Stock trading page opening... "],2);               
           }
          else if(option.indexOf("Shut")!=-1 || option.indexOf("shut")!=-1){
                showTextByUserInput(["Veiwer: Turn off viewer... "],7);
          }
        }
    });
}
/**
* called by voiceButtonListener function, show text on screen then active the function
**/
function showTextByUserInput(newValue, index){
    $(".personalDisplayOption").hide();    
    var cnt = -1;
    timer = setInterval(function() {
            ++cnt;
            if(cnt==newValue.length){
                  stopTimer();
                  remvoeElement("command");
                  loadButtonFunction(index);
            }
            textTimer(newValue, cnt); },2000);
}

function textTimer(newValue, cnt){
            remvoeElement("command");
              var x = 50;
              var y = 300;
              var txt = newValue[cnt];
              var t = d3.select("body").select("#mainSvg")
                    .append("text")
                    .attr("id","command")
                    .attr("class", "command")
                    .attr("fill", "white")
                    .attr("font-size",25)
                    .attr("x",x)
                    .attr("y",y)
                    .text(txt);

}

/**
*  menu selection for personal page and business page
*  option: string name of the side bar label
*  instruction: string label discription
*  use: string - for call and message (demo make call and send message)
*  voiceMenu: load page when click selection menu(personal or business) 
**/
function doEvent(option, instruction, use, voiceMenu, page){
       var newValue = copy(page);
       removeGame();
       removeIframe();
       remvoeElement("stockDiv");
       remvoeElement("imgDivVideoConference");
       $("svg#inforSvg").empty();
      if(instruction==null){
               return;
      }

      addInstruction(instruction);
      if(option==="Personal Call"){
            showTextOnSvg(newValue,0);
      }
      else if(option==="Business Call"){
            showTextOnSvg(newValue,0);
      }
      else if(option==="Personal Message"){
            showTextOnSvg(newValue,1);
      }
      else if(option==="Business Message"){
            showTextOnSvg(newValue,1);
      }
      else if(option==="Google It"){
            showTextOnSvg(newValue, 3);

      }
      else if(option==="Google Map"){
        showTextOnSvg(newValue, 4);
      }
      else if(option==="Game"){
        showTextOnSvg(newValue, 6);

      }
      else if(option==="Take Picture"){
         showTextOnSvg(newValue, 2);
      }
      else if(option==="Recording Video"){
         showTextOnSvg(newValue, 5);

      }
      else if(option==="Stock Trading"){
         showTextOnSvg(newValue, 2);
      }
       else if(option==="PowerPoint"){
         showTextOnSvg(newValue, 5);
      }
      else if(option==="Shut Down"){
            showTextOnSvg(newValue, 7);

      }
      else if(option==="Video Conference"){
            showTextOnSvg(newValue, 6);
      }
      else{

      }
}

/**
*  for make call and send message demo
*  append text every 3 second
**/
var timer = null;
function showTextOnSvg(newValue, index){
   $(".personalDisplayOption").toggle();    
    var cnt = -1;
    timer = setInterval(function() {
      ++cnt;
      if(cnt==newValue[index].use.length){
          stopTimer();
          remvoeElement("command");
          loadButtonFunction(index);
      }
      myTimer(newValue, index, cnt); },2000);
  }

function myTimer(newValue, index, cnt){
  remvoeElement("command");
    var x = 50;
    var y = 300;
    var txt = newValue[index].use[cnt];
    var t = d3.select("body").select("#mainSvg")
            .append("text")
            .attr("id","command")
            .attr("class", "command")
            .attr("fill", "white")
            .attr("font-size",30)
            .attr("x",x)
            .attr("y",y)
            .text(txt);
}
/**
*  stop the timer for function  showTextOnSvg
**/
function stopTimer(){
  clearInterval(timer);
}
/**
*  this function called by showTextOnSvg function, 
**/
function loadButtonFunction(index){
   var takePictureButton =  document.getElementById("takePictureButton");
      if(personalClicked==true){
         if(index==2){
              if(document.getElementById("imagePicture")==null){
                      loadImage("data/face1.jpg", "Picture");
              }
               if(document.getElementById("imgDivPicture")!=null){
                      document.getElementById("imagePicture").src = "data/face1.jpg";
                      document.getElementById("imgDivPicture").style.display="block";
              }
              if(document.getElementById("goBackButton")==null){
                      addButton("Go Back","goBackButton");
                      document.getElementById("goBackButton").style.display = "block";
                }
              if(document.getElementById("goBackButton")!=null){
                      document.getElementById("goBackButton").style.display = "block";
               }
              if( takePictureButton==null){
                      addButton("Take Picture","takePictureButton");
                      takePictureButton =  document.getElementById("takePictureButton");
              }
              takePictureButton.style.display = "block";
              takePictureButton.onclick = function(){
                      takePictureAction();
                      takePictureButton.style.display = "none";
                      document.getElementById("goBackButton").style.display = "block";
              };         
              document.getElementById("goBackButton").onclick = function(){
                      takePictureButton.style.display = "none";                 
              };  
        }
         else if(index==5){
                  recordingVideo();  
         }
         else if(index==6){
                 var game = new Game(); 
                       game.paths();
                       game.square();
         }
      }
      else if(businessClicked==true){
             if(index==2){
                  iframe("data/nz-stoke-exchange.html");

              } 
             else if(index==5){
                  showPowerPoint();
              }
             else if(index==6){
                  loadImage("data/VideoConference.jpg","VideoConference");
            }
      }
         
      if(index==3){
                    iframe( "http://www.google.com/custom?q=&btnG=Search");
      }
      else if(index==4){
                    iframe("https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5995.4017183864435!2d174.778369!3d-41.293614500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1swellington+bar+cafe+restaurant+!5e0!3m2!1szh-CN!2snz!4v1429446987355");
      }
}
/**
* when take picture button clickde
* swap two pictures
**/
function takePictureAction(){
     setTimeout(function(){
        document.getElementById("imagePicture").src = "data/face.jpg";
        document.getElementById("imgDivPicture").style.display="block";
        document.getElementById("takePictureButton").style.display = "none";        
     },100);
}
/**
*  create iframe 
*  url: source address
**/
function iframe(url){
    var iframe = document.createElement('iframe');
    iframe.id = "iframe";
    iframe.src = url ;
    document.body.appendChild(iframe);
}
/**
*  remove iframe 
**/
function removeIframe(){
    removeRecordingGraphics();
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
           iframes[i].parentNode.removeChild(iframes[i]);
    }
}
/**
*  remove element by id 
*  id: element id
**/
function remvoeElement(id){
    var element = document.getElementById(id);
    while(element!=null && element.parentNode!=null){
        element.parentNode.removeChild(element);
    }
}
/**
*  create a go back button 
**/
function addButton(buttonText, id){
    var buttonElem = document.createElement("button");
    var text = document.createTextNode(buttonText);
    buttonElem.id = id;
    buttonElem.appendChild(text);
    document.body.appendChild(buttonElem);
    buttonElem.addEventListener("click", function(){
    personalPage();
    remvoeElement(buttonElem);
    });
}
/**
*  create new text tags  
*  instruction: array of string
*  text append in inforSvg 
**/
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
/**
*  show powerpoint
**/
function showPowerPoint(){
  iframe("data/slides-victoria-viewer.html");
}

/**
zoom home page image, then call loadPage function to load personal or bussiness menues
**/
function zoom(page){
      var img = document.getElementById("imageHome");
    if(img!=null){
      
        var maxWidth = img.width*1.5;
        var maxHeight = img.height*1.5;
        
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
        document.getElementById("imgDivPicture").style.display="none";
        document.getElementById("goBackButton").style.display="none";
        loadPage("#mainSvg", page);

    }

    else if(img==null && document.getElementById("imagePicture")==null){
        remvoeElement("imgDivHome");
        loadPage("#mainSvg", page);
      }
}
/**
*   show and hide list of menu (personal and business)
**/
function toggleMenu(){
    if(document.getElementById("selection").style.display ==="block"){
          document.getElementById("selection").style.display="none";
    }
    else if(document.getElementById("selection").style.display==="none"){
          document.getElementById("selection").style.display="block";
    }
}
/**
*   sign points when click on the svg
*   this function call from index svg tag
**/
function getPositions(ev) {
if (ev == null) { ev = window.event }
   var _mouseX = ev.clientX;
   var _mouseY = ev.clientY;
     if(document.getElementById("pathGame")!=null){
           points[2][0] = _mouseX;
           points[2][1]= _mouseY;
           points[5][0] = _mouseX;
           points[5][1]= _mouseY;
           remvoeElement("pathGame");
           while(document.getElementById("circleGame")!=null){
                  remvoeElement("circleGame");
           }
           var g = new Game();
           g.paths();

      }
}
/**
*   remove all game elements
**/
function removeGame(){
      remvoeElement("pathGame");
      remvoeElement("mySquare");
      remvoeElement("textOnSquare");
      while(document.getElementById("circleGame")!=null){
              remvoeElement("circleGame");
      }
}
/**
*   copy new array
**/
function copy(o) {
   var out, v, key;
   out = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       out[key] = (typeof v === "object") ? copy(v) : v;
   }
   return out;
}
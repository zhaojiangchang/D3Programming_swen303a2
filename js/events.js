// =================================================================================
// Author: Jacky Chang
// - events.js hold all the events for this application
// =================================================================================

var searchGoogle = ""; // for google search
var option = ""; // user text input

document.getElementById("exit").addEventListener("click" ,function(){
  document.getElementById("todo").style.display = "none";
        if(personalClicked == true){
              personalPage();
            }
        else if(businessPage == true){
              businessPage();
        }
        else{
          homePage();
        }
});

/**
*   draw red dot and red rect when click record video (personal page)
**/
function recordingVideo(){
    // adds graphics to the map to show that recording is in progress.
    iframe("https://www.youtube.com/embed/HVhSasnVjMQ?enablejsapi=1&theme=light&showinfo=0");
    var w = window.innerWidth;
    var h = window.innerHeight;
    var width = w*0.71;
    var height = h*0.47;
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
              .attr("class","displayOption")
              .attr("id","displayOption")
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
}
/**
* create listenner for text input lable
* check key work user input, thne action the function
**/
function voiceButtonListener(){
          option = option.toUpperCase();
          document.getElementById("todo").style.display = "none";
          $(".displayOption").show();    
          remvoeElement("command");
          stopTimer();
          removeGame();
          removeIframe();
          remvoeElement("stockDiv");
          remvoeElement("imgDivVideoConference");
          $("svg#inforSvg").empty();

          if(personalClicked==false && businessClicked==false){
             // var environment = prompt("Is it persoanl or Business use?", "");
          if (option != null) {
              if(option==="PERSONAL"){
                personalPage();
              }
              else if(option==="BUSINESS"){
                businessPage();
              }
          }
        }
        else if(personalClicked==true){
           if(option==null){
                    if(personalClicked == true){
                             personalPage();
                    }
                    else if(businessPage == true){
                              businessPage();
                    }
           }
           else{
                     if(option.indexOf("BUSINESS")!=-1){
                             businessPage();
                      }
                     if(option.indexOf("CALL")!=-1){
                              $(".displayOption").show();    
                              showTextOnSvg(personal, 0);             
                     }
                     else if(option.indexOf("MESSAGE")!=-1){
                            $(".displayOption").show();    
                              showTextOnSvg(personal, 1);   
                     }
                     else if(option.indexOf("GOOGLE")!=-1|| option.indexOf("SEARCH")!=-1){
                              if(option.indexOf("GOOGLE SEARCH")!=-1){
                                    searchGoogle = option.replace("GOOGLE SEARCH","");
                              }
                              else if(option.indexOf("GOOGLE IT")!=-1){
                                    searchGoogle = option.replace("GOOGLE IT","");
                              }
                              else if(option.indexOf("GOOGLE")!=-1){
                                    searchGoogle = option.replace("GOOGLE","");
                              }
                              else if(option.indexOf("SEARCH")!=-1){
                                    searchGoogle = option.replace("SEARCH","");
                              }
                              showTextByUserInput(["Veiwer: Google search application opening... "],3);               
                     }
                     else if(option.indexOf("MAP")!=-1){
                              showTextByUserInput(["Veiwer: Google map application opening... "],4);               
                     }
                     else if(option.indexOf("GAME")!=-1){
                              showTextByUserInput(["Veiwer: eye relaxing game app opening... "],6);               
                     }
                     else if(option.indexOf("RECORD")!=-1 || option.indexOf("VIDEO")!=-1){
                              showTextByUserInput(["Veiwer: Recording video, please face to the target... "],5);               
                     }
                     else if(option.indexOf("TAKE")!=-1 || option.indexOf("PICTURE")!=-1){
                              showTextByUserInput(["Veiwer: take picture focus on your target... "],2);               
                     }
                     else if(option.indexOf("SHUT")!=-1){
                              showTextByUserInput(["Veiwer: Turn off viewer... "],7);
                     }
                     else if(option.indexOf("TODO")!=-1){
                            $(".displayOption").hide();  
                            if(option.indexOf("REMOVE TODO")!=-1){
                                  if(todoListArray.length==0){
                                    return;
                                  }
                                  if(document.getElementById("todo").style.display === "none"){
                                    document.getElementById("todo").style.display = "block";
                                      showTextByUserInput(["Veiwer: Open TODO list and remove element... "],-1);
                                  }
                                  if(todoListArray.length!=0){
                                        var newT =option.replace("REMOVE TODO","");
                                        removeFromList(newT);
                                  }
                            }
                            else{
                                  console.log(1111);   
                                  if(document.getElementById("todo").style.display === "none"){
                                      document.getElementById("todo").style.display = "block";
                                      //showTextByUserInput(["Veiwer: Open TODO list... "],8);
                                    }
                                  var newT =option.replace("TODO","");
                                  addToList(newT);
                            }

                      }
                        
              }
        }
        else if(businessClicked==true){
          if(option==null){
                    if(personalClicked == true){
                            personalPage();
                    }
                    else if(businessPage == true){
                            businessPage();
                    }
           }
          else{
                    if(option.indexOf("PERSONAL")!=-1){
                              personalPage();
                      }
                     if(option.indexOf("CALL")!=-1){
                              $(".displayOption").show();    
                              showTextOnSvg(business, 0);                
                      }
                     else if(option.indexOf("MESSAGE")!=-1){
                            $(".displayOption").show();    
                              showTextOnSvg(business, 1);   
                     }
                     else if(option.indexOf("GOOGLE")!=-1){
                              if(option.indexOf("GOOGLE SEARCH")!=-1){
                                    searchGoogle = option.replace("GOOGLE SEARCH","");
                              }
                              else if(option.indexOf("GOOGLE IT")!=-1){
                                    searchGoogle = option.replace("GOOGLE IT","");
                              }
                              else if(option.indexOf("GOOGLE")!=-1){
                                    searchGoogle = option.replace("GOOGLE","");
                              }
                              else if(option.indexOf("SEARCH")!=-1){
                                    searchGoogle = option.replace("SEARCH","");
                              }
                              showTextByUserInput(["Veiwer: Google search application opening... "],3);               

                     }
                     else if(option.indexOf("MAP")!=-1){
                              showTextByUserInput(["Veiwer: Google map application opening... "],4);               
                     }
                     else if(option.indexOf("POWERPOINT")!=-1){
                              showTextByUserInput(["Veiwer: powerPoint opening... "],5);               
                     }
                    else if(option.indexOf("CONFERENCE")!=-1 || option.indexOf("VIDEO")!=-1){
                              showTextByUserInput(["Veiwer: Video conference starting... "],6);               
                     }
                     else if(option.indexOf("STOCK")!=-1 || option.indexOf("SHARE")!=-1){
                              showTextByUserInput(["Veiwer:  Stock trading page opening... "],2);               
                     }
                    else if(option.indexOf("SHUT")!=-1){
                              showTextByUserInput(["Veiwer: Turn off viewer... "],7);
                    }
              }
      }
}
/**
* called by voiceButtonListener function, show text on screen then active the function
**/
function showTextByUserInput(newValue, index){
    $(".displayOption").hide();
    var cnt = -1;
    timer = setInterval(function() {
            ++cnt;
            if(cnt==newValue.length){
                  stopTimer();
                  remvoeElement("command");
                  loadButtonFunction(index);

            }
            textTimer(newValue, cnt); },3000);
}
/**
* this function called by showTextByUserInput function
**/
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
                    .attr("font-size",20)
                    .attr("x",x)
                    .attr("y",y)
                    .text(txt)
                     .transition()
                          .duration(3000)
                          .style("fill","#F5FFC2")
                          .style("opacity", 0);

}
/**
*   add text listener to detect user input 
**/
function attachTextListener(input, func) {
  if (window.addEventListener) {
    input.addEventListener('input', func, true);
  } else
    input.attachEvent('onpropertychange', function() {
      func.call(input);
    });
}
/**
*   get user input and call voiceButtonListener to do the right action
**/
var myInput = document.getElementById('textInput');
attachTextListener(myInput, function() {
  var input = document.getElementById("textInput").value;
         document.getElementById("submitTextToScreen").onclick = function(){
          option = input;
          voiceButtonListener();
          document.getElementById("textInput").value = "";
  };
});
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
      else if(option==="Todo List"){
            showTextOnSvg(newValue, 8);
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
   $(".displayOption").toggle();    
    var cnt = -1;
    timer = setInterval(function() {
      ++cnt;
      if(cnt==newValue[index].use.length){
          stopTimer();
          remvoeElement("command");
          loadButtonFunction(index);
          if(index == 0 || index == 1){
            if(personalClicked == true){
              personalPage();
            }
            else if(businessPage == true){
              businessPage();
            }
          }
      }
      myTimer(newValue, index, cnt); },3000);
  }

/**
*  this function called by showTextOnSvg function
**/
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
            .attr("font-size",20)
            .attr("x",x)
            .attr("y",y)
            .text(txt)
            .transition()
                .duration(3000)
                .style("fill","#F5FFC2")
                .style("opacity", 0);
}
/**
*  stop the timer for function  showTextOnSvg
**/
function stopTimer(){
  clearInterval(timer);
}
/**
*  this function called by showTextOnSvg function, 
*  index: index of the lable on the black screen.
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
              if( takePictureButton==null){
                      addButton("Take Picture","takePictureButton");
                      takePictureButton =  document.getElementById("takePictureButton");
              }
              takePictureButton.style.display = "block";
              takePictureButton.onclick = function(){
                      takePictureAction();
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
         else if(index==8){
                  addToDoList("demo");
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
                    iframe( "http://www.google.com/custom?q="+searchGoogle+"&btnG=Search");
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
            .attr("font-size",15)
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
        document.getElementById("imgDivPicture").style.display="none";
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
var todoListArray = [];
/**
*   Todo for demo only
**/
function addToDoList(demo){
      document.getElementById("todo").style.display="block";
      if(demo!=""){
        todoTask = demo;
      }
      console.log(todoTask);
      addToList(todoTask);
}
/**
*   after user input and click send button will call this function to add to the list
**/
function addToList(todoTask){
    todoTask=todoTask.toUpperCase();
    if(todoTask==""){
      return;
    }
        var ul = document.getElementById("todoList");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(todoTask));  
        ul.appendChild(li); 
        todoListArray.push(todoTask);
  }
/**
*   after user input and click send button will call this function to remove to the list
**/
function removeFromList(todoTask){
    console.log(todoListArray)
    var listItems = $("#todoList li");
    listItems.each(function(idx, li){
      var product = $(li);
      if(todoTask.indexOf(product.text())!=-1){
            li.parentNode.removeChild(li);
            todoListArray.splice(idx,idx);
                console.log(todoListArray)

      }
    });
  }

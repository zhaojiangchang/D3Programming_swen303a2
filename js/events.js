// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
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
  var iframe = document.createElement('iframe');
  iframe.id = "mapIframe";
  iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95998.80691389229!2d174.76185460000008!3d-41.24437005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b1fc49e974cb%3A0xa00ef63a213b470!2sWellington!5e0!3m2!1sen!2snz!4v1429135956500" ;
  document.body.appendChild(iframe);

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

// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
function personalPage(){
	//loadPage("#MainSvg", personal);
  	zoom(personal);
}
function businessPage(){
    //loadPage("#MainSvg", business);
	zoom(business);
}
function homePage(){
  	loadPage("#inforSvg", home);
  	 document.getElementById("mainSvg").style.background = "white";
  	remvoeElement("imgDivHome");
  	remvoeElement("imgDivVoice")
  	loadImage("data/glasses.png","Home");
}
function contactUsPage(){
  	loadPage("#inforSvg", contactUsInfo);
  	document.getElementById("mainSvg").style.background = "white";
  	loadImage("data/glasses.png","Home");
}
function teamPage(){
  	loadPage("#inforSvg", teamMembers);
  	document.getElementById("mainSvg").style.background = "white";
  	loadImage("data/glasses.png","Home");
}
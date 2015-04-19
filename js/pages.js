// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
var personalClicked = false;
var businessClicked = false;
function personalPage(){
	//loadPage("#MainSvg", personal);
	zoom(personal);
	personalClicked = true;
	businessClicked = false;
}
function businessPage(){
	zoom(business);
	businessClicked = true;
	personalClicked = false;

}
function homePage(){
  	remvoeElement("imgDivHome");
  	remvoeElement("imgDivVoice")
  	load(home);

}
function contactUsPage(){
	load(contactUsInfo);
}
function teamPage(){
	load(teamMembers);
}
function introductionPage(){
	personalClicked = false;
  	businessClicked = false;
	callButtonClicked = false;
	sendMessageButtonClicked = false;
	loadPage("#mainSvg", intro);
  	document.getElementById("mainSvg").style.background = "black";
  	remvoeElement("imageHome");
    remvoeElement("imageVideoConference");

}
function load(array){
	personalClicked = false;
  	businessClicked = false;
	callButtonClicked = false;
	sendMessageButtonClicked = false;
	loadPage("#inforSvg", array);
  	document.getElementById("mainSvg").style.background = "white";
  	loadImage("data/glasses.png","Home");
  	remvoeElement("imageVideoConference");
  }
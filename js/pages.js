// =================================================================================
// Author: Jacky Chang
// - for top menus
// =================================================================================
var personalClicked = false;
var businessClicked = false;
function personalPage(){
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
	callAndMsgBoolButtonStateChange(false,false,false,false);

	loadPage("#mainSvg", intro);
  	document.getElementById("mainSvg").style.background = "black";
  	remvoeElement("imgDivHome");
    remvoeElement("imgDivVideoConference");

}
function load(array){
	personalClicked = false;
  	businessClicked = false;
	callAndMsgBoolButtonStateChange(false,false,false,false);
	loadPage("#inforSvg", array);
  	document.getElementById("mainSvg").style.background = "white";
  	loadImage("data/glasses.png","Home");
  	remvoeElement("imgDivVideoConference");
  }
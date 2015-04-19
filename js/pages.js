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
}
function businessPage(){
	zoom(business);
	businessClicked = true;
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
function load(array){
	personalClicked = false;
  	businessClicked = false;
	callButtonClicked = false;
	sendMessageButtonClicked = false;
	loadPage("#inforSvg", array);
  	document.getElementById("mainSvg").style.background = "white";
  	loadImage("data/glasses.png","Home");}
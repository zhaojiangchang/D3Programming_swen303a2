// =================================================================================
// Author: Jacky Chang
// - for top menus 
// =================================================================================
var personalClicked = false;
var businessClicked = false;
/**
* load personal page
**/
function personalPage(){
	zoom(personal);
	init("Voice Command");
	personalClicked = true;
	businessClicked = false;
}
/**
* load business page
**/
function businessPage(){
	zoom(business);
    init("Voice Command");
	businessClicked = true;
	personalClicked = false;
}
/**
* set back to home page
**/
function homePage(){
  	remvoeElement("imgDivHome");
  	load(home);
}
/**
* load contact us page
**/
function contactUsPage(){
	load(contactUsInfo);
}
/**
* load team page
**/
function teamPage(){
	load(teamMembers);
}
/**
* load introduction page
**/
function introductionPage(){
	loadPage("#mainSvg", intro);
  	document.getElementById("mainSvg").style.background = "black";
    remvoeElement("imgDivHome");
    remvoeElement("imgDivVideoConference");
	init( "personal or business");
}
/**
* load elements 
**/
function load(functionList){
	loadPage("#inforSvg", functionList);//load string on the svg
  	document.getElementById("mainSvg").style.background = "white";
  	loadImage("data/glasses.png","Home");
  	remvoeElement("imgDivVideoConference");
  	init( "personal or business");
  }
/**
* init elements
**/
 function init(placeholder){
  	document.getElementById("textInput").value = "";
    document.getElementById("todoPersonal").style.display = "none";
    document.getElementById("todoBusiness").style.display = "none";
	document.getElementById("textInput").placeholder =placeholder;
	$(".displayOption").show();    
	stopTimer();
	personalClicked = false;
  	businessClicked = false;

  }
// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
function personalPage(){
  zoom(personal);
}
function businessPage(){
 zoom(business);
}
function homePage(){
  loadPage("#inforSvg", home);
  remvoeElement("imgDiv");
  loadImage("data/glasses-Copy.png","Home");
}
function contactUsPage(){
  loadPage("#inforSvg", contactUsInfo);
  loadImage("data/glasses.png","Home");
}
function teamPage(){
  loadPage("#inforSvg", teamMembers);
  loadImage("data/glasses.png","Home");
}
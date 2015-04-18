// =================================================================================
// Author: Jacky Chang
// - 
// =================================================================================
function personalPage(){
  loadPage(d3.select("body").select("#mainSvg"), personal);

}
function businessPage(){
  loadPage(d3.select("body").select("#mainSvg"), business);
}
function homePage(){
  loadPage(d3.select("body").select("#inforSvg"), home);
  loadImage("data/glasses.png");
}

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

  loadPage(d3.select("body").select("#inforSvg"), home);
  remvoeElement("imgDiv");
  loadImage("data/glasses.png","Home");
}

function zoom(page){
	var imgDiv = document.getElementById("imgDiv");
	zoomImage();   
    var img = document.getElementById("imageHome");

    var maxWidth = img.width*1.3;
    var maxHeight = img.height*1.3;
    function zoomImage(){
   
	  	var zoomTimer = setInterval(function(){

	  		if(img!=null && img.width<maxWidth){
		  		img.width = img.width*1.005;
		  		img.height = img.height*1.005;
		 
			}
			else {
				clearInterval(zoomTimer);
				remvoeElement("imgDiv");
				loadPage(d3.select("body").select("#mainSvg"), page);
			}
		}, 20);
	}

	if(imgDiv==null||img==null) {
		loadPage(d3.select("body").select("#mainSvg"), page);
	}

}
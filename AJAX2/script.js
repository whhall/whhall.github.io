// JavaScript source code
var whichCat;
// Create a new XMLHttpRequest object
var xhrMenuLoader = new XMLHttpRequest();

var nextBtn = document.getElementById("nextbtn");
nextBtn.addEventListener("click", nextCat);

var backBtn = document.getElementById("backbtn");
backBtn.addEventListener("click", backCat);

var catImg = document.getElementById("img1");
var catImgHeader = document.getElementById("catImgHeader");

function reqError(err) {
    // Log any error returned by XMLHttpRequest to the console.
    console.log('Fetch Error :-S', err);
}
// The following will read the response from XMLHttpRequest and place the contents into the innerHTML of the element from the html DOM with ID of siteMenu.
function reqListener() {

    var jsonCat = JSON.parse(xhrMenuLoader.responseText);
    var catImg = document.getElementById("img1");
	var catImgHeader = document.getElementById("catImgHeader");
	checkMediaType(jsonCat);
    catImg.setAttribute("src", jsonCat.data.children[whichCat].data.url);
    catImgHeader.innerHTML = jsonCat.data.children[whichCat].data.title;
}
//The following will choose the correct index for the next cat in the data set
function nextCat() {
    if (whichCat === undefined){
        whichCat = 0;
    } else if(whichCat === 24) {
        whichCat = 0;
    }else{
        ++whichCat;
    }
    imgLoader();
}
//The following will choose the correct index for the previous cat in the data set
function backCat() {
    if (whichCat === undefined) {
        whichCat = 0;
    } else if (whichCat === 0) {
        whichCat = 24;
    } else {
        --whichCat;
    }
    imgLoader();
}

function checkMediaType(jsonCat) {
	if(jsonCat.data.children[whichCat].data.is_video){
		nextCat();
	}
}


function imgLoader() {

// Assign a function to handle the “load” event
xhrMenuLoader.onload = reqListener;
// Assign a function to handle the “error” event
xhrMenuLoader.onerror = reqError;
// Tell xhrMenuLoader what we want it to do (GET the page at the URL)
xhrMenuLoader.open('get','https://www.reddit.com/r/catpics/hot.json?', true);
// Tell xhrMenuLoader to start
xhrMenuLoader.send();
}
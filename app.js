'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boot.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var currentImageIndices = [0, 1, 2];

for (var i = 0; i < imagePaths.length; i++) {
  var name = imagePaths[i];
  new Image(null, name);
}

//create elements
var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage(0);
drawImage(1);
drawImage(2);

function clickHandler(event) {
  //clear list
  console.log(event.target);
  var matchPath = event.target.getAttribute('src');
  var arrayOfRandomIndices = randomIndices ();
  console.log(matchPath);
  for(var i = 0; i < currentImageIndices.length; i++) {
    var currentIndex = currentImageIndices[i];
    var displayedObject = images[currentIndex];
    displayedObject.views += 1;
  }
  //use event target to determine which image was clicked
  //add to views of all images displayed
  //add to clicks of just the clicked image
  for (var i = 0; i < images.length; i++) {
    var currentImageObject = images[i];
    // console.log('Images', i, images[i]);
    if (currentImageObject.path === matchPath) {
      console.log('found it!', currentImageObject);
      currentImageObject.clicks += 1;
    };
  }
  currentImageIndices = arrayOfRandomIndices;
  imageList.textContent = '';
  drawImage(arrayOfRandomIndices[0]);
  drawImage(arrayOfRandomIndices[1]);
  drawImage(arrayOfRandomIndices[2]);
}

function randomIndices(){
  var firstRandomIndex = Math.floor(Math.random() * images.length);
  var secondRandomIndex = Math.floor(Math.random() * images.length);
  while (firstRandomIndex === secondRandomIndex) {
    secondRandomIndex = Math.floor(Math.random() * images.length);
  }
  var thirdRandomIndex = Math.floor(Math.random() * images.length);
  while (thirdRandomIndex === firstRandomIndex
    || thirdRandomIndex === secondRandomIndex) {
    thirdRandomIndex = Math.floor(Math.random() * images.length);
  }
  return[firstRandomIndex, secondRandomIndex, thirdRandomIndex];
}


function drawImage(index) {
  //use image path for source
  //(image.path)
  var img = document.createElement('img');
  var li = document.createElement('li');
  var imageList = document.getElementById('images');
  var randomPath = images[index].path;


  //set src
  img.setAttribute('src', randomPath);

  //add to dom
  li.appendChild(img);
  imageList.appendChild(li);
}

function Image(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = 'imgs/' + path;

  images.push(this);
}
//chart
// new arrays for click data & the names
//correspond with values in clicks arrays

for (var i = 0; i < imagePaths.length; i++) {
  var chartImageNames = images[i];
  console.log(chartImageNames);
  var test = chartImageNames.click;
  console.log(test);
}
//add anoth0r array to add # of clicks to image objects,
//add string from "for... chartImageNames


//chartClicksArray.push (chartImageNames)

var ctx = document.getElementById(pollResults);

var pollResults = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options,
});

var data = {
  labels: chartImageNames[i],
  datasets: [
    {
      label:  'Poll Results',
      data: chartClicksArray(i).clicks,
      backgroundColor: [
        'blue',
        'green',
        'royalblue',
        'seagreen',
        'blue',
        'green',
        'royalblue',
        'seagreen',
        'blue',
        'green',
        'royalblue',
        'seagreen',
      ]
    }]
};






//Get rid of extensions with split
// 'sweep'.png.split( )
// ['s','w','e','e','p' ]
// 'sweep.png'('.')
//['sweep','png'] [0]
// 'sweep'

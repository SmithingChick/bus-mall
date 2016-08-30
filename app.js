'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boot.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];

for (var i = 0; i < imagePaths.length; i++); {
  var name = imagePaths[i];
  new Image(null, name); //try to take image path & drop '.jpg' part
}
console.log(imagePaths, images);

//no duplicate images
function randomIndex(){
  var randomIndex = Math.floor(Math.random() * imagePaths.length);
  var indexOne = randomIndex;
  console.log(indexOne);
  randomIndex = Math.floor(Math.random() * imagePaths.length);
  var indexTwo = randomIndex;
  console.log(indexTwo);
  randomIndex = Math.floor(Math.random() * imagePaths.length);
  var indexThree = randomIndex;
  console.log(indexThree);
  while (indexOne === indexTwo) {
    indexTwo = randomIndex;
  }
  while ((indexThree === indexOne) || (indexThree === indexTwo)) {
    indexThree = randomIndex;
  }
  return[indexOne, indexTwo, indexThree];
}
var returnValue = randomIndex();
console.log(returnValue);

//create elements
var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

function drawImage() {
  // create elements
  //use image path for source
  //(image.path)
  var img = document.createElement('img');
  var li = document.createElement('li');
  var imageList = document.getElementById('images');
  var randomIndex = Math.floor(Math.random() * imagePaths.length);
  var randomPath = imagePaths[randomIndex];
  img.setAttribute('src', 'imgs/' + randomPath);
    //add to dom
  li.appendChild(img);
  imageList.appendChild(li);
}
drawImage(randomIndex[0]);
drawImage(randomIndex[1]);
drawImage(randomIndex[2]);

function clickHandler(e) {
  //clear list
  console.log(e.target);
  var matchPath = 'banana.jpg';
  //use event target to determine which image was clicked
  //add to views of all images displayed
  //add to clicks of just the clicked image
  for(var i = 0; i < images.length; i++) {
    console.log('Images', i, images[i]);
    var currentImageObject = images[i];
    if (images[i].path === matchPath) {
      console.log('found it!', currentImageObject);
    }
  }
  imageList.textContent = '';
  drawImage(randomIndex);
  drawImage(randomIndex);
  drawImage(randomIndex);
}

  //set src
function Image(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = path;

  images.push(this);
}

//Get rid of extensions with split
// 'sweep'.png.split( )
// ['s','w','e','e','p' ]
// 'sweep.png'('.')
//['sweep','png'] [0]
// 'sweep'

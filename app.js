'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boot.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var currentImageIndices = [0, 1, 2];
var totalClicks = 0; //tracks # of clicks


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

// votes

function clickHandler(event) {
  //console.log(event.target);
  if (totalClicks >= 10) {  //sets # of clicks before chart button becomes visable
    var chartButton = document.getElementById('show_chart');
    chartButton.setAttribute('visibility', 'visiible');
    return;
  }

  if (matchPath === null) {
    alert('Click on a picture');
    return;
  }

  totalClicks += 1;
  var matchPath = event.target.getAttribute('src');
  var arrayOfRandomIndices = randomIndices ();
  // console.log(matchPath);
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
    //  console.log('found it!', currentImageObject);
      currentImageObject.clicks += 1;
    };
  }
  currentImageIndices = arrayOfRandomIndices;
  imageList.textContent = '';
  drawImage(arrayOfRandomIndices[0]);
  drawImage(arrayOfRandomIndices[1]);
  drawImage(arrayOfRandomIndices[2]);
}

function voteCounter() {
  var votes = [];
  for (i = 0; i < images.length; i++) {
    votes.push(images[i].clicks);
  }
  return votes;
}

function randomIndices(){
  var firstRandomIndex = Math.floor(Math.random() * images.length);
  var secondRandomIndex = Math.floor(Math.random() * images.length);
  var thirdRandomIndex = Math.floor(Math.random() * images.length);
  while (currentImageIndices.indexOf(firstRandomIndex) !== -1) {
    firstRandomIndex = Math.floor(Math.random() * images.length);
  }
  while (firstRandomIndex === secondRandomIndex
      || currentImageIndices.indexOf(secondRandomIndex) !== -1) {
    secondRandomIndex = Math.floor(Math.random() * images.length);
  }
  while (thirdRandomIndex === firstRandomIndex
      || thirdRandomIndex === secondRandomIndex
      || currentImageIndices.indexOf(thirdRandomIndex) !== -1) {
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

//"Show Chart" Button Script
var chartButton = document.getElementById('show_chart');
chartButton.addEventListener('click', chartClickHandler);
//note-finish code in html

var chartClicked = false;

function chartClickHandler() {
  chartClicked = true;
  var imageNames = [];
  var imageClicks = [];
  for (var i = 0; i < images.length; i++) {
    imageNames.push(images[i].name);
    console.log('chartClickHandler test', imageNames);
    imageClicks.push(images[i].clicks);
    console.log('chartClickHandler', imageClicks);
  }
};

//chart
// new arrays for click data & the names
//correspond with values in clicks arrays

//split .jpg off image names
for (var i = 0; i < imagePaths.length; i++) {
  var chartImageNames =  imagePaths[i].split('.')[0]; // was images[i];
//  console.log(chartImageNames, imagePaths[i]);
}

//this isn't working
for (var i = 0; i < voteCounter.length; i++) {
  var chartClicksArray = voteCounter[i];
  console.log(chartClicksArray);
}

chartClicksArray.push (chartImageNames);

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
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', //5
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', //10
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', //15
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', //20
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', //5
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', //10
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', //15
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', //20
      ],
      borderWidth: 1,
    }
  ],
};

var options = {
  title: {
    display: true,
    text: 'Total Votes',
  }
  // scales: {
  //   yAxes: [{
  //     ticks: {
  //       beginAtZero: true,
  //     }
  //   }]
  // }
};

//double-check if this code is symantically correct, general settings are correct, down to line #
// Chart.defaults.global (
//   //fonts
//   defaultFontColor= rgb(16,23,57),
//   defaultFontFamily= 'Lato', 'Open Sans', 'Arial', sans-serif,
//   defaultFontSize= 14,
//   //Common Chart Configuration
//   resposive= true,
//   maintainAspectRatio= true,
//   //title configuration in options
// )







chartButton.disabled = true;

//
//
// //Get rid of extensions with split
// // 'sweep'.png.split( )
// // ['s','w','e','e','p' ]
// // 'sweep.png'('.')
// //['sweep','png'] [0]
// // 'sweep'

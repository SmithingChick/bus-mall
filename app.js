'use strict';

var imagePaths = ['Bag.jpg', 'Banana.jpg', 'Bathroom.jpg', 'Boot.jpg', 'Breakfast.jpg',
  'Bubblegum.jpg', 'Chair.jpg', 'Cthulhu.jpg', 'Dog-Duck.jpg', 'Dragon.jpg',
  'Pen.jpg', 'Pet-Sweep.jpg', 'Scissors.jpg', 'Shark.jpg', 'Sweep.jpg',
  'Tauntaun.jpg', 'Unicorn.jpg', 'USB.gif', 'Water-Can.jpg', 'Wine-Glass.jpg'];
var imageJSON = localStorage.getItem('images');
var images = JSON.parse(imageJSON);
var currentImageIndices = [0, 0, 0];
var totalClicks = 0; //tracks # of clicks

if (!images) {
  for (var i = 0; i < imagePaths.length; i++) {
    var path = imagePaths[i];
    var imageName = path.split('.')[0];
    new ImageTrack(imageName, path);
  }
}

//create elements
var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage(0);
drawImage(1);
drawImage(2);

// votes
function clickHandler(event) {
  console.log(event.target);

  if (totalClicks >= 6) {  //sets # of clicks before chart button becomes visable
    var chartButton = document.getElementById('show_chart');
    chartButton.classList.remove('hidden');
    return;
  // vain attempt to nix attempts to click outside of images
  //if (matchPath === null) {
  // alert('Click on a picture');
  //return;
  }

  var matchPath = event.target.getAttribute('src');
  var arrayOfRandomIndices = randomIndices();

  totalClicks += 1;

//use event target to determine which image was clicked
  //add to views of all images displayed
  //add to clicks of just the clicked image
  for (var j = 0; j < images.length; j++) {
    var currentImageObject = images[j];
    if (currentImageObject.path === matchPath) {
      currentImageObject.clicks += 1;
    };
  }

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

function randomNumberGenerator() {
  return Math.floor(Math.random() * images.length);
}


// //Setting up the 3 images
// function randomIndices(){
//   var firstRandomIndex = randomNumberGenerator();
//   var secondRandomIndex = randomNumberGenerator();
//   var thirdRandomIndex = randomNumberGenerator();
//   while (currentImageIndices.indexOf(firstRandomIndex) !== -1) {
//     firstRandomIndex = randomNumberGenerator();
//   }
//   while (firstRandomIndex === secondRandomIndex
//       || currentImageIndices.indexOf(secondRandomIndex) !== -1) {
//     secondRandomIndex = randomNumberGenerator();
//   }
//   while (thirdRandomIndex === firstRandomIndex
//       || thirdRandomIndex === secondRandomIndex
//       || currentImageIndices.indexOf(thirdRandomIndex) !== -1) {
//     thirdRandomIndex = randomNumberGenerator();
//   }
//   return[firstRandomIndex, secondRandomIndex, thirdRandomIndex];
// }

//attempting to prevent duplicates
//seperate function or if/else or do/while loop inside randomIndices or drawImage or something?
function randomIndices(){
  var indexes = [];
  var uniqueIndex = [];
  var displayIndexes = [0,0,0];
  var newFirstRandomIndex = randomNumberGenerator();
  var newSecondRandomIndex = randomNumberGenerator();
  var newThirdRandomIndex = randomNumberGenerator();
  var firstRandomIndex = randomNumberGenerator();
  var secondRandomIndex = randomNumberGenerator();
  var thirdRandomIndex = randomNumberGenerator();
  while (currentImageIndices.indexOf(firstRandomIndex) !== -1) {
    firstRandomIndex = randomNumberGenerator();
  }
  while (firstRandomIndex === secondRandomIndex
      || currentImageIndices.indexOf(secondRandomIndex) !== -1) {
    secondRandomIndex = randomNumberGenerator();
  }
  while (thirdRandomIndex === firstRandomIndex
      || thirdRandomIndex === secondRandomIndex
      || currentImageIndices.indexOf(thirdRandomIndex) !== -1) {
    thirdRandomIndex = randomNumberGenerator();
  }
  return[firstRandomIndex, secondRandomIndex, thirdRandomIndex];

  do {
    uniqueIndex = randomNumberGenerator();
  } while (indexes.indexOf(uniqueIndex) !== -1
    || displayIndexes.indexOf(uniqueIndex) !== -1);
  indexes.push(uniqueIndex);
  while (previousImageIndices.indexOf(newFirstRandomIndex === firstRandomIndex
        || newFirstRandomIndex === secondRandomIndex
        || newFirstRandomIndex === thirdRandomIndex
        || currentImageIndices.indexOf(newThirdRandomIndex) !== -1)) {
    newFirstRandomIndex = randomNumberGenerator();
  }
  while (newSecondRandomIndex === newFirstRandomIndex
      || currentImageIndices.indexOf(newFirstRandomIndex) !== -1) {
    newSecondRandomIndex = randomNumberGenerator();
  }
  while (newThirdRandomIndex === newFirstRandomIndex
      || newThirdRandomIndex === newSecondRandomIndex
      || currentImageIndices.indexOf(newThirdRandomIndex) !== -1) {
    newThirdRandomIndex = randomNumberGenerator();
  }
  return[newFirstRandomIndex, newSecondRandomIndex, newThirdRandomIndex];

  for (var i = 0; i < 3; i++) {
    do {
      uniqueIndex = randomNumberGenerator();
    } while (indexes.indexOf(uniqueIndex) !== -1
      || displayIndexes.indexOf(uniqueIndex) !== -1);
    indexes.push(uniqueIndex);
  }
  return indexes;
}
randomIndices();

//sets up images as list items & displays them
function drawImage(index) {
  var img = document.createElement('img');
  var li = document.createElement('li');
  var imageList = document.getElementById('images');
  var imagePath = images[index].path;
  images[index].views++;

  //set src
  img.setAttribute('src', imagePath);
  //add to dom
  li.appendChild(img);
  imageList.appendChild(li);
}

function ImageTrack(name, path) {
  this.name = name;
  this.path = 'imgs/' + path;
  this.views = 0;
  this.clicks = 0;

  images.push(this);
}

//"Show Chart" Button Script
var chartButton = document.getElementById('show_chart');
chartButton.addEventListener('click', chartClickHandler);

for (var l = 0; l < voteCounter.length; l++) {
  var chartClicksArray = voteCounter[l];
  console.log(chartClicksArray);
}

function chartClickHandler() {
  var storedImages = JSON.stringify(images);
  localStorage.setItem('images', storedImages);
  drawChart();
  drawChartViews();
  chartButton.disabled = true;
}

// create votes chart
function drawChart() {
  var imageNames = [];
  var imageClicks = [];

  for (var i = 0; i < images.length; i++) {
    imageNames.push(images[i].name);
    imageClicks.push(images[i].clicks);
  }

  var ctx = document.getElementById('chart_votes');
  var chartImages = [];
  var chartClicks = [];
  for (var m = 0; m < images.length; m++) {
    chartImages.push(images[m].name);
    chartClicks.push(images[m].clicks);
  };

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartImages,
      datasets: [{
        label: 'Total Votes',
        data: chartClicks,
        backgroundColor: [
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)', //5
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)', //10
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)', //15
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)',
          'rgb(40,58,144)', //20
        ],
        // borderColor: [
        //   'rgba(255,99,132,1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)', //5
        //   'rgba(255,99,132,1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)', //10
        //   'rgba(255,99,132,1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)', //15
        //   'rgba(255,99,132,1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)', //20
        // ],
        // borderWidth: 1,
      }]
    },
    options: {
      title: {
        display: false,
//        text: 'Poll Results',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
}

//Create image views chart
function drawChartViews() {
  var imageNames = [];
  var imageViews = [];

  for (var o = 0; o < images.length; o++) {
    imageNames.push(images[o].name);
    imageViews.push(images[o].views);
  }

  var ctx = document.getElementById('chart_views');
  var chartImages = [];
  var chartViews = [];
  for (var n = 0; n < images.length; n++) {
    chartImages.push(images[n].name);
    chartViews.push(images[n].views);
  };

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartImages,
      datasets: [{
        label: 'Total Views',
        data: chartViews,
        backgroundColor: [
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)', //5
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)', //10
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)', //15
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)',
          'rgb(37,94,26)', //20
        ],
        // borderColor: [
        // ],
        // borderWidth: 1,
      }]
    },
    options: {
      title: {
        display: false,
        // text: 'Poll Results',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
}

//Chart 3- comparing clicks vs views as bars
//Chart 4- percentages
//Chart 5- rank choices
//Chart 6- joke Cthulhu chart "Are the stars right?"

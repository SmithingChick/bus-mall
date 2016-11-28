'use strict';

var imagePaths = ['Bag.jpg', 'Banana.jpg', 'Bathroom.jpg', 'Boot.jpg', 'Breakfast.jpg', 'Bubblegum.jpg', 'Chair.jpg', 'Cthulhu.jpg', 'Dog-duck.jpg', 'Dragon.jpg', 'Pen.jpg', 'Pet-sweep.jpg', 'Scissors.jpg', 'Shark.jpg', 'Sweep.jpg', 'Tauntaun.jpg', 'Unicorn.jpg', 'Usb.jpg', 'Water-can.jpg', 'Wine-glass.jpg'];
var imageJSON = localStorage.getItem('images');
var images = JSON.parse(imageJSON);
var currentImageIndices = [0, 1, 2];
var totalClicks = 0; //tracks # of clicks

console.log('Local Storage Images', images);
if (!images) {
  var images = [];

  for (var i = 0; i < imagePaths.length; i++) {
    var path = imagePaths[i];
    var imageName = path.split('.')[0];

    new Image(imageName, path);
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
  //console.log(event.target);
  if (totalClicks >= 10) {  //sets # of clicks before chart button becomes visable
    var chartButton = document.getElementById('show_chart');
    chartButton.classList.remove('hidden');
    return;
  }


  if (totalClicks >= 6) {
    var chartButton = document.getElementById('show_chart');
    chartButton.classList.remove('hidden');
    return;
  //if (matchPath === null) {
  //  alert('Click on a picture');
  //  return;
  }

  var matchPath = event.target.getAttribute('src');
  var arrayOfRandomIndices = randomIndices ();

  for(var i = 0; i < currentImageIndices.length; i++) {
    var currentIndex = currentImageIndices[i];
    var displayedObject = images[currentIndex];
    displayedObject.views += 1;
  }

  totalClicks += 1;

//use event target to determine which image was clicked
  //add to views of all images displayed
  //add to clicks of just the clicked image
  for (var i = 0; i < images.length; i++) {
    var currentImageObject = images[i];
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
  var imagePath = images[index].path;
  //set src
  img.setAttribute('src', imagePath);
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

//var chartClicked = false;

// chart
// new arrays for click data & the names
//correspond with values in clicks arrays

//split .jpg off image names
for (var i = 0; i < imagePaths.length; i++) {
  var chartImageNames =  imagePaths[i].split('.')[0];
}

for (var i = 0; i < voteCounter.length; i++) {
  var chartClicksArray = voteCounter[i];
  console.log(chartClicksArray);
}

//chartClicksArray.push (chartImageNames);

function chartClickHandler() {
  var storedImages = JSON.stringify(images);
  localStorage.setItem('images', storedImages);
  drawChart();
  chartButton.disabled = true;
}

//It helps to draw the chart if you want the thing to show up, Smith
function drawChart() {
    //chartClicked = true;
  var imageNames = [];
  var imageClicks = [];

  for (var i = 0; i < images.length; i++) {
    imageNames.push(images[i].name);
    imageClicks.push(images[i].clicks);
  }

  var ctx = document.getElementById('chart_canvas');
  //   var ctx = document.getElementById(pollResults);
  var chartImages = [];
  var chartClicks = [];
  var chartViews = [];
  for (var i = 0; i < images.length; i++) {
    chartImages.push(images[i].name);
    chartClicks.push(images[i].clicks);
    chartViews.push(images[i].views);
  };
  console.log(images);
  console.log(ctx);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartImages,
      datasets: [{
        label:  'Poll Results',
        data: chartClicks,
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
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Total Votes',
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


//double-check if this code is symantically correct, general settings are correct, down to line #
// Chart.defaults.global (
//   //fonts
//   defaultFontColor= rgb(16,23,57),
//   defaultFontFamily= 'Lato', 'Open Sans', 'Arial', sans-serif,
//   defaultFontSize= 14,
//   //Common Chart Configuration
//   resposive= true,
//   maintainAspectRatio= true,
//   //title configuration already in options
// )


//chartButton.disabled = true;

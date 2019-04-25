let dataArray = [];
let dataArray1 = [];
let dataArray2 = [];
let keywordArray = [];

function ImageObj(description, horns, image_url, keyword, title, herdNum) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;

  if (herdNum === 1) {
    dataArray1.push(this);
  } else dataArray2.push(this);
}

$.getJSON('../data/page-1.json', function (element) {
  for (let i = 0; i < element.length; i++) {
    new ImageObj(element[i].description, element[i].horns, element[i].image_url, element[i].keyword, element[i].title, 1);
  }
  console.log(dataArray1);
  populateHTML(1);
  populateDropDown();
});

//load second json on page load
$.getJSON('../data/page-2.json', function (element) {
  for (let i = 0; i < element.length; i++) {
    new ImageObj(element[i].description, element[i].horns, element[i].image_url, element[i].keyword, element[i].title, 2);
  }
  console.log(dataArray2);
});

function populateHTML(herdNum) {
  if (herdNum === 1) {
    dataArray = dataArray1;
  } else {dataArray = dataArray2;}

  for (let i = 0; i < dataArray.length; i++) {

    //This will become handlebars
    let imageString = `<img src="${dataArray[i].image_url}" title="${dataArray[i].title}" alt="${dataArray[i].description}" class="${dataArray[i].keyword}"/>`;
    $('#images').append(imageString);

    if (!keywordArray.includes(dataArray[i].keyword)) {
      keywordArray.push(dataArray[i].keyword);
    }
  }
}

function populateDropDown() {

  // TODO: fix behavior when an animal is selected and then 'Select a Filter' is reselected.
  $('#selector').append(`<option value="Select a Filter">Select a Filter</option>`);

  for (let i = 0; i < keywordArray.length; i++) {
    let optionString = `<option value="${keywordArray[i]}">${keywordArray[i]}</option>`;
    $('#selector').append(optionString);
  }
}

$('#selector').on('change', dropDownOnClickHandler);

function dropDownOnClickHandler(e) {
  $('img').hide();
  $(`.${e.target.options[e.target.selectedIndex].value}`).show();
}

//radio event listeners herd1 + herd2
$('#images').on('input', herdRadioHandler);
// event handler to load
function herdRadioHandler(e) {
  $('#images').empty();
  $().show();
}

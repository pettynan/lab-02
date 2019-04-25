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
  keywordArray = [];
  if (herdNum === 1) {
    dataArray = dataArray1;
  } else {dataArray = dataArray2;}

  for (let i = 0; i < dataArray.length; i++) {

    const imgRenderer = Handlebars.compile($('#img-template').text());
    $('#images').append(imgRenderer(dataArray[i]));

    if (!keywordArray.includes(dataArray[i].keyword)) {
      keywordArray.push(dataArray[i].keyword);
    }
  }
}

function populateDropDown() {
  $('#selector').empty();
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

//Pagination Feature Event Listener
$('input').on('input', herdRadioHandler);

function herdRadioHandler(e) {
  console.log('', e.target.value);
  $('#images').empty();
  if (e.target.value === 'herd1') {
    populateHTML(1);
  } else {populateHTML(2);}
  populateDropDown();
}

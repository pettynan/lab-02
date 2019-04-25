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
  populateHTML();
  populateDropDown();
});

//load second json on page load
$.getJSON('../data/page-2.json', function (element) {
  for (let i = 0; i < element.length; i++) {
    new ImageObj(element[i].description, element[i].horns, element[i].image_url, element[i].keyword, element[i].title, 2);
  }
});

function sortByTitle(arr) {
  arr.sort( (a, b) => {
    return a.title.localeCompare( b.title);
  });
  return arr;
}

function sortByHorns(arr) {
  arr.sort( (a, b) => {
    return a.horns - b.horns;
  });
  return arr;
}


function populateHTML() {
  keywordArray = [];
  $('#images').empty();
  if ($('input')[0].checked) {
    dataArray = dataArray1;
  } else {
    dataArray = dataArray2;
  }

  if ($('#sortSelector')[0].value === 'sortByTitle') {
    dataArray = sortByTitle(dataArray);
  } else {
    dataArray = sortByHorns(dataArray);
  }

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
  // TODO: fix behavior when an animal is selected and then 'Select an Animal' is reselected.
  $('#selector').append(`<option value="Select an Animal">Select an Animal</option>`);

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


// Sort By... Event Listener
$('#sortSelector').on('change', populateHTML);

//Pagination Feature Event Listener
$('input').on('input', herdRadioHandler);

function herdRadioHandler() {
  $('#images').empty();
  populateHTML();
  populateDropDown();
}

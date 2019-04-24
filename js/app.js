
let dataArray = [];
let keywordArray = [];

$.getJSON('../data/page-1.json', function (element) {
  for (let i = 0; i < element.length; i++) {

    let dataObject = {};

    dataObject.description = element[i].description;
    dataObject.horns = element[i].horns;
    dataObject.image_url = element[i].image_url;
    dataObject.keyword = element[i].keyword;
    dataObject.title = element[i].title;

    dataArray[i] = dataObject;
  }

  populateHTML();
  populateDropDown();


});

// $.('#selector').// populate the selector dropdown with options


function populateHTML() {
  for (let i = 0; i < dataArray.length; i++) {

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

$('#selector').on('change', selectorHandler);

function selectorHandler(e) {
  $('img').hide();
  $(`.${e.target.options[e.target.selectedIndex].value}`).show();
  console.log(e.target.options);
}

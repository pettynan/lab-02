
let dataArray = [];
let keywordArray = [];

function ImageObj(description, horns, image_url, keyword, title) {
  this.description = description;
  this.horns = horns;
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;

  dataArray.push(this);
}

$.getJSON('../data/page-1.json', function (element) {
  for (let i = 0; i < element.length; i++) {
    new ImageObj(element[i].description, element[i].horns, element[i].image_url, element[i].keyword, element[i].title);
  }
  populateHTML();
  populateDropDown();

});

function populateHTML() {
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

$('#selector').on('change', selectorHandler);

function selectorHandler(e) {
  $('img').hide();
  $(`.${e.target.options[e.target.selectedIndex].value}`).show();
  console.log(e.target.options);
}

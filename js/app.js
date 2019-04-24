
let dataArray = [];

$.getJSON('../data/page-1.json', function(element) {
  console.log(element[0].description);
  for (let i = 0 ; i < element.length ; i++) {

    let dataObject = {};

    dataObject.description = element[i].description;
    dataObject.horns = element[i].horns;
    dataObject.image_url = element[i].image_url;
    dataObject.keyword = element[i].keyword;
    dataObject.title = element[i].title;

    dataArray[i] = dataObject;
  }

  for (let i = 0 ; i < dataArray.length ; i++) {

    let imageString = `<img src="${dataArray[i].image_url}" title="${dataArray[i].title}" alt="${dataArray[i].description}"/>`;
    $('#images').after(imageString);

  }
});

/* Some function bullshit that fills dataArray with infromation from the json file */







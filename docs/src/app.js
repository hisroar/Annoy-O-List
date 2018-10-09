
// listItem class
class listItem {
  constructor(id, description, completed, createdOn) {
    this._id = id;
    this._description = description;
    this._completed = completed;
    this._createdOn = createdOn;
  }

  get id() { return this._id; }
  get description() { return this._description; }
  get completed() { return this._completed; }
  get createdOn() { return this._createdOn; }
}

// From StackOverflow 
// https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript
// Reads the text from a local file on the server
var loadFile = function(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

var writeFile = function(data) {
  var data = new FormData();
  data.append("data" , data);
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
  xhr.open( 'post', 'lib/save_file.php', true );
  xhr.send(data);
}


// Tutorial - function that adds an item to the list which updates it
var addItemToPage = function(itemData) {
  var item = itemTemplate.clone();
  item.attr('data-id', itemData.id);
  item.find('.description').text(itemData.description);
  item.find('.created-time').text(itemData.createdOn);

  if(itemData.completed) {
    item.addClass('completed');
  }

  list.append(item);
}

// initialize the app (upon page ready)
var items = []; // global variable holding list of listItems to display
var dataFName;  // global variable containing the filename of the YAML data file
$(document).ready(function() {
  // Get the name of the YAML file with the data
  var configResult = jsyaml.load(loadFile("config.yml"));
  datafName = configResult.DATAFILE;
  // load data YAML file
  var dataResult = jsyaml.load(loadFile(datafName)).items;
  // create listItems and add them to the items list
  dataResult.forEach(function(item) {
    items.push(new listItem(item.id, item.description, item.completed,
                            item.createdOn))
  });
  // add each item to the page
  items.forEach(function(item) {
    addItemToPage(item);
  });

});

// Tutorial - jQuery to get the template for our items, and our list of items from HTML
var itemTemplate = $('#templates .item');
var list         = $('#list');

// Tutorial - when the add-form button is pressed, get the item's description.
$('#add-form').on('submit', function(event) {
  // Don't let the page refresh every time an event occurs.
  event.preventDefault();
  
  var itemDescription = event.target.itemDescription.value;

  // Dennis Shim - clear the form
  event.target.itemDescription.value = "";

  // Dennis Shim - give item a createdTime
  var dt = new Date();
  var itemCreatedTime = dt.toLocaleString();

  // Use AJAX to save an item to the database
  var creationRequest = $.ajax({
    type: 'POST',
    url: "items",
    data: { description: itemDescription, createdTime: itemCreatedTime, completed: false }
  });
  
  // Once in the database, add the item to the page
  creationRequest.done(function(itemDataFromServer) {
    addItemToPage(itemDataFromServer)
  });
});

// Tutorial - process when complete button is clicked
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent(); // item is parent of complete-button
  var isItemCompleted = item.hasClass('completed'); // check if item is completed
  var itemId = item.attr('data-id');
  
  // update the item in the database
  var updateRequest = $.ajax({
    type: 'PUT',
    url: server_url + "/items/" + itemId,
    data: { completed: !isItemCompleted }
  });
  
  // once updated, change the completed class accordingly
  updateRequest.done(function(itemData) {
    if (itemData.completed) {
      item.addClass('completed');
    } else {
      item.removeClass('completed');
    }
  });
});

// Dennis Shim - process when delete button is clicked
$('#list').on('click', '.delete-button', function(event) {
  var item = $(event.target).parent(); // item is parent of delete-button
  var itemId = item.attr('data-id');
  
  var updateRequest = $.ajax({
    type: 'DELETE',
    url: server_url + "/items/" + itemId,
  });
  
  updateRequest.done(function(itemData) {
    item.remove()
  });
});

if(localStorage.getItem('color') === 'changed') {
  $('#item').css("font", "#FFFFFF");
}

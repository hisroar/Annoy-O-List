/* Author: Dennis Shim
   JS adapted from a Javascript to-do list tutorial
   http://docs.railsbridge.org/javascript-to-do-list/javascript-to-do-list
   I used this code as a base to add settings as well as additional features
   which I could not have implemented if I had to learn how to write a to-do
   list by myself from scratch. I have never done web development before. */

/* Most code in here is adapted from the tutorial. I have labelled code that
   was adapted from the tutorial, as well as code that I added. I was planning
   to use a listItem class to make list objects, but I didn't have the time or
   understanding to adapt the code well enough to include the class. */

// Address of the server we are storing our list on courtesy of the tutorial
var server_url = "https://listalous.herokuapp.com/lists/Annoy-O-List";

// Tutorial - jQuery to get the template for our items, and our list of items from HTML
var itemTemplate = $('#templates .item');
var list         = $('#list');

// Tutorial - function that adds an item to the list which updates it
var addItemToPage = function(itemData) {
  var item = itemTemplate.clone();
  item.attr('data-id', itemData.id);
  item.find('.description').text(itemData.description);

  if(itemData.completed) {
    item.addClass('completed');
  }

  // Dennis - display the time of creation
  var createdDate = new Date(itemData.created_at);
  item.find('.created-time').text(createdDate.toLocaleString());

  // Dennis - default timer is 1 min
  item.find('.timer-time').text('00h 01m 00s');

  list.append(item);
}

// Tutorial - use jQuery's AJAX method to get our list data
var loadRequest = $.ajax({
  type: 'GET',
  url: server_url
});

// Tutorial - whenever loadRequest is called, add each of the item's data to the list
loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items;

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData);
  })
});

// Tutorial - when the add-form button is pressed, get the item's description.
$('#add-form').on('submit', function(event) {
  // Don't let the page refresh every time an event occurs.
  event.preventDefault();
  
  var itemDescription = event.target.itemDescription.value;

  // Dennis Shim - clear the form
  event.target.itemDescription.value = "";
  
  // Use AJAX to save an item to the database
  var creationRequest = $.ajax({
    type: 'POST',
    url: server_url + "/items",
    data: { description: itemDescription, completed: false }
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


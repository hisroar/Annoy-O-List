$('.settings-form').on('submit', function(event) {
  // Don't let the page refresh every time an event occurs.
  event.preventDefault();
  
  var textColorValue = $('.text-val').val();
  var backgroundColorValue = $('.background-val').val();

  $('.container').css('color', textColorValue);
  $('#templates').css('color', textColorValue);

  $('#app').css('background-color', backgroundColorValue);
  $('#create').css('background-color', backgroundColorValue);

  $('#')
  //FOR ANNOYOTRONS: $('body').css('background', 'url("assets/Annoyotron_full.jpg")');

  //var itemDescription = event.target.itemDescription.value;
  //alert(colorValue);     
});

// When show settings pressed, show settings, change button to hide settings
$('#settings-show').click(function() {
  $('#settings-list').show();
  $('#settings-hide').show();
  $('#settings-show').hide();
});

// When hide settings pressed, hide settings, change button to show settings
$('#settings-hide').click(function() {
  $('#settings-list').hide();
  $('#settings-show').show();
  $('#settings-hide').hide();
});

// When show advanced settings clicked, show/hide advanced settings
$('#show-advanced').click(function() {
  if($('.advanced-tr').css('display') !== 'none') {
    $('.advanced-tr').hide();
  } else {
    $('.advanced-tr').each(function() {
      if(!$(this).hasClass('hidden-adv')) {
        $(this).show();
      }
    });
  }
});

// When show time checked, show/hide alarm
$('#display-time').change(function() {
  if($('#display-time').prop('checked')) {
    $('#table-alarm').show();
  } else {
    $('#table-alarm').hide();
    if($('#enable-alarm').prop('checked') == true) {
      $('#enable-alarm').prop('checked', false);
    }
  }
});
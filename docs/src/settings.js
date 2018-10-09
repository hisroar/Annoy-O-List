$('.settings-form').on('submit', function(event) {
  // Don't let the page refresh every time an event occurs.
  event.preventDefault();
  
  // set text and background colors
  var textColorValue = $('.text-val').val();
  var backgroundColorValue = $('.background-val').val();

  $('.container').css('color', textColorValue);
  $('#templates').css('color', textColorValue);

  $('#app').css('background-color', backgroundColorValue);
  $('#create').css('background-color', backgroundColorValue);

  // check the display-time checkbox and show created-time if necessary
  if($('#display-time').prop('checked')) {
    $('.item .created-time').show();
  } else {
    $('.item .created-time').hide();
  }

  // check if the alarms are enabled and show timers as necessary
  if($('#enable-alarm').prop('checked')) {
    $('.item .timer-start').show();
    $('.item .timer-time').show();
  } else {
    $('.timer-start').addClass('stopped');
    $('.timer-start').text('Start Timer');
    $('.item .timer-start').hide();
    $('.item .timer-time').hide();
  }

  // update the timer
  var h = $('#alarm-h').val().padStart(2, '0');
  var m = $('#alarm-m').val().padStart(2, '0');
  var s = $('#alarm-s').val().padStart(2, '0');
  $('.item').find('.timer-time').text(h + 'h ' + m + 'm ' + s + 's');

  // update the annoying amount (very lazily)
  var new_annoying = $("#how-annoying").val()
  for(var i = 1; i <= 5; i++) {
    $('#annoy-count').removeClass('' + i);
  }
  $('#annoy-count').addClass('' + new_annoying);
  // start screwing with the background once we set annoying to higher
  if(parseInt(new_annoying) >= 3 && !$('#how-annoying').hasClass('background-moving')) {
    $('#how-annoying').addClass('background-moving');
    var pictureIndex = 0;
    var annoy;
    var x = setInterval(function() {
      annoy = parseInt($('#annoy-count').attr('class'));
      if(annoy < 3) {
        clearInterval(x);
        $('body').css('background', 'url("assets/Annoyotron_full.jpg")');
        $('#how-annoying').removeClass('background-moving');
      }
      // change pictureIndex based on which annoy stage we're on
      if(annoy === 3) {
        if(pictureIndex === 2) {
          pictureIndex = 0;
        }
      } else if(annoy >= 4) {
        if(pictureIndex === 4) {
          pictureIndex = 0;
        }
      }
      // chose picture based on image
      switch(pictureIndex) {
        case 0:
          $('body').css('background', 'url("assets/Annoyotron_full.jpg")');
          break;
        case 1:
          $('body').css('background', 'url("assets/Annoyotron_half.jpg")');
          break;
        case 2:
          $('body').css('background', 'url("assets/Annoyotron_half_flip.jpg")');
          break;
        case 3:
          $('body').css('background', 'url("assets/Annoyotron_full_flip.jpg")');
          break;
        default:
          console.log("Shouldn't get here");
          break;
      }

      pictureIndex++;

    }, (5 - parseInt($('#annoy-count').attr('class'))) * 200 + 500);
    // repeat more quickly when more annoying
  }

  // if annoying is really 5
  if(parseInt(new_annoying) >= 5) {
    // enable all timers first
    $('#display-time').prop('checked', true);
    $('#enable-alarm').prop('checked', true);
    // make sure everything is showing
    $('#table-alarm').show();
    $('#table-alarm').removeClass('hidden-adv');
    $('#time-to-alarm').show();
    $('#time-to-alarm').removeClass('hidden-adv');
    $('.item .created-time').show();
    $('.item .timer-start').show();
    $('.item .timer-time').show();
    // hard-code alarm values to be low
    $('#alarm-h').val(0);
    $('#alarm-m').val(0);
    $('#alarm-s').val(10);
    // set timers to random numbers between 1 and 15 s
    $('#list .item').each(function() {
      h = 0;
      m = 0;
      s = Math.floor(Math.random() * 15 + 1);
      $(this).find('.timer-time').text((''+h).padStart(2, '0') + 'h ' +
                                       (''+m).padStart(2, '0') + 'm ' +
                                       (''+s).padStart(2, '0') + 's');
      // start all timers
      $(this).find('.timer-start').trigger("click");
    });
  }
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
    $('#table-alarm').removeClass('hidden-adv');
  } else {
    $('#table-alarm').hide();
    $('#time-to-alarm').hide();
    if($('#enable-alarm').prop('checked') == true) {
      $('#enable-alarm').prop('checked', false);
    }
    $('#table-alarm').addClass('hidden-adv');
    $('#time-to-alarm').addClass('hidden-adv');
  }
});

// When enable alarms checked, show/hide times
$('#enable-alarm').change(function() {
  if($('#enable-alarm').prop('checked')) {
    $('#time-to-alarm').show();
    $('#time-to-alarm').removeClass('hidden-adv');
  } else {
    $('#time-to-alarm').hide();
    $('#time-to-alarm').addClass('hidden-adv');
  }
});

// When show annoying settings clicked, show annoy-o-settings
$('#show-annoying').click(function() {
  alert("Once you go Annoy-O, theres no going back.");
  $('.extra-hidden').show();
  $('body').css('background', 'url("assets/Annoyotron_full.jpg")');
  $('.settings-label').css('color', 'white');
  $('.timer-time').css('color', 'white');
});

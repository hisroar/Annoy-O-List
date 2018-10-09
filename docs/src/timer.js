// Dennis Shim - check if the timer is ever started
$('#list').on('click', '.timer-start', function(event) {
  var item = $(this).parent();

  // check if we are stopped or started
  if($(this).hasClass('stopped')) {
    // we are stopped, so we want to start
    $(this).removeClass('stopped');
    $(this).text("Stop Timer");

    // Update the count down every 1 second
    var x = setInterval(function() {
      // Only run while alarms are enabled and while not stopped
      if (!$('#enable-alarm').prop('checked') || item.find('.timer-start').hasClass('stopped')) {
        clearInterval(x);
      }
      var t = item.find(".timer-time").text();
      // Lazy way to get current displayed time
      var h = parseInt(t.slice(0, 2));
      var m = parseInt(t.slice(4, 6));
      var s = parseInt(t.slice(8, 10));
      var new_time = 3600 * h + 60 * m + s - 1;

      // Compute H/M/S
      h = Math.floor(new_time / 3600).toString().padStart(2, '0');
      m = Math.floor(new_time % 3600 / 60).toString().padStart(2, '0');
      s = Math.floor(new_time % 60).toString().padStart(2, '0');
      // Set 
      item.find('.timer-time').text(h + 'h ' + m + 'm ' + s + 's');

      if (new_time <= 0) {
        clearInterval(x);
        item.find('.timer-time').text(h + 'h ' + m + 'm ' + s + 's');
        if(parseInt($("#annoy-count").attr('class')) >= 2) {
          var audio = document.getElementById("annoy-audio");
          audio.play()
        }
        alert("HELLO! Have you done: " + item.find(".description").text());
        // update the timer and stop it
        var h = $('#alarm-h').val().padStart(2, '0');
        var m = $('#alarm-m').val().padStart(2, '0');
        var s = $('#alarm-s').val().padStart(2, '0');
        item.find('.timer-time').text(h + 'h ' + m + 'm ' + s + 's');  
        item.find('.timer-start').addClass('stopped');
        item.find('.timer-start').text("Start Timer");

        // if we're at level 5 annoying, retrigger
        if(parseInt($("#annoy-count").attr('class')) === 5) {
          h = 0;
          m = 0;
          s = Math.floor(Math.random() * 15 + 1);
          item.find('.timer-time').text((''+h).padStart(2, '0') + 'h ' +
                                        (''+m).padStart(2, '0') + 'm ' +
                                        (''+s).padStart(2, '0') + 's');
          item.find('.timer-start').trigger("click");
        }
      }

    }, 1000);

  } else {
    // we are started, so we want to stop
    $(this).addClass('stopped');
    $(this).text("Start Timer");
  }
});
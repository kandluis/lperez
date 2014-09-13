// Responsiveness Javascript
function page_resize() {
    var window_width = $(window).width();

    // taking care of carousel
    if (window_width < 924) {
      // set paragraph size
      if (window_width < 660) {
        $("#myCarousel p").css('font-size', '15px')
      }
      else {
        $('#myCarousel p').css('font-size', (window_width / 44) + 'px');
      }

      // set heading size
      if (window_width < 624) {
        $('#myCarousel h1').css('font-size', '26px');
      }
      else {
        $('#myCarousel h1').css('font-size', (window_width / 24) + 'px');
      }

      // Shrink "Social Icons"
      if (window_width < 767) {
        $('#contact_page .right > a').css('font-size', '3.5em');
        $('#contact_page .right > a:hover').css('font-size', '4.5em');
      }
      else {
        $('#contact_page .right > a').css('font-size', (window_width / 256) + 'em');
        $('#contact_page .right > a:hover').css('font-size', (window_width / 219) + 'em');
      }
    }
    else {
      $("#myCarousel p").css('font-size', '21px');
      $('#myCarousel h1').css('font-size', '38.5px');
      $('#contact_page .right > a').css('font-size', '4.0em');
      $('#contact_page .right > a:hover').css('font-size', '4.5em');
    }

    // taking care of hiding most items in resume page
    if (window_width < 767) {
      // less visible
      $(".toggler").each(function(){
        if ($(this).children("i").attr("class") == "icon-chevron-up") {
          $(this).click();
        }
      });
    }
    else {
      // more visible
      $(".toggler").each(function(){
        if ($(this).children("i").attr("class") == "icon-chevron-down") {
         $(this).click();
        }
      });
    }

    // taking care of resizing Title (Luis Perez)
    if (window_width < 360) {
      $('#header .brand').css('font-size', (window_width / 11) + 'px')
      $('#email').html('luisperez@college')
    }
    else {
      $('#header .brand').css('font-size', '34px')
      $('#email').html('luisperez@college.harvard.edu')
    }

    // Change project_page 
    $('.project_img').css('position', 'static');
    $('.project_descrip').css('position', 'static');
    $('.project_descrip').css('width', 'auto');

    if ($("#wrapper").width() < 500) {
      $('.project_descrip').css('padding', '0 10px');      
    }
    else {
      $('.project_descrip').css('padding', '0 ' + ($('#wrapper').width() / 20) +'px');
    }
}

// Respond each time page is resized
$(document).ready(function() {
    page_resize();
    if (window.orientation == undefined) {
      $(window).resize(page_resize);
    } 
    else {
      window.onorientationchange = function(e) {
        e.preventDefault();
        e.stopPropagation();
        page_resize();
      }
    }
});

// Function to preload images
function preload(arrayOfImages) {
  $(arrayOfImages).each(function () {
      $('<img />').attr('src',this).appendTo('body').hide();
  });
}

// Scrolls to selected object
function scroll_to_obj(obj) {
  $('html','body').animate({
    scrollTop:obj.offset().top - 10}, 500);
}

// Function to scroll to an element on the page with animation
function scroll_to_elt(id) {
  scroll_to_obj($(id));
  // Old code. Generalized with scroll_to_obj
  // $('html,body').animate({scrollTop:$(id).offset().top - 10}, 500);
}

// Function to create the array of options
function get_array(selected) {
  var links = new Array();
  $(selected).each(function () {
    var link = $(this).attr('href');
    links.push(link)
  });
  return links
}

// Function to return a random element from an array
function get_random(array) {
  return array[Math.floor(Math.random()*array.length)]
}

// DOM-specific Javascript
$(window).load(function() {
  // Preload Images
  preload([
  'img/about_photo_color.jpg',
  'img/about_photo_greyscale.jpg',
  'img/logo.png',
  'img/carousel/slide-01.jpg',
  'img/carousel/slide-02.jpg',
  'img/carousel/slide-03.jpg',
  ]);

  // Insert random link
  var random_link = get_random(get_array($("#nav_collapse li")));
  $('#random_caption_link').children('a').attr("href",random_link); 

  // Scroll to anchor effect
  $(".scroll_to_anchor").click(function(event){   
    event.preventDefault();
    scroll_to_elt(this.hash);
  });

  // Display appropriate section on load
  var subpage;
  if ((subpage = window.location.hash.substring(1)) == "") {
    window.location = "#about";
    subpage = "about";
  }

  $("#" + subpage + "_page").fadeIn(600, function() {
  $('#footer').show();
    window.scrollTo(0, 0);
  });

  if (subpage == "about") {
    // Begin Carousel on home page ONLY
    $('#myCarousel').fadeIn(600, function() {
      $(this).carousel({
        interval: 10000
      });
    });
  }

  $("#" + subpage + "_nav").addClass("active");
    
// Page Transitions
  $('.nav > li').click(function() {
    target = $(this).children('a').attr("href");
    $(this).parent().children('.active').removeClass("active");
    $(this).addClass("active");

    $('#main > div:not(:hidden)').fadeOut(300, function() {
        $(target + "_page").fadeIn(400);
    });

    $("#nav_collapse").attr("class","nav-collapse collapse").css('height','0px');

    if (target == "#about") {
    // Begin Carousel on home page ONLY
      $('#myCarousel').fadeIn(400, function() {
        $(this).carousel({
          interval: 10000
        });
      });
    }
    else {
      $('#myCarousel').fadeOut(400);
    }
  });

  // add effect to photo
  $('#about_photo').hover(function() {
    // on hovering over, change the image to the colored one
      $(this).attr('src','img/about_photo_color.jpg');
      }, function () {
        // on hovering out, change back to the deffault
        $(this).attr('src','img/about_photo_greyscale.jpg')
      }
    );
  }); 

  // Togglers
  // Hides the div above the button
  $('.toggler').click(function() {
    if ($(this).children('i').attr('class') == 'icon-chevron-down') {
      $(this).children('i').attr('class', 'icon-chevron-up');
      $(this).children('span').html('...less ');
    } else {
      $(this).children('i').attr('class', 'icon-chevron-down');
      $(this).children('span').html('more... ');
    }
    
    var content = $(this).prev('div');
    
    /*// prevent jerk at end, move up 17px
    content.css('margin-top','-17px'); */
    content.slideToggle(500, function() {
      $(this).css('margin-top','0px');
      scroll_to_obj($(this));
    }); 
  });

  // hides the div below the button
  $('.toggler2').click(function() {
    if ($(this).children('i').attr('class') == 'icon-chevron-down') {
      $(this).children('i').attr('class', 'icon-chevron-up');
      $(this).children('span').html('Hide');
    } else {
      $(this).children('i').attr('class', 'icon-chevron-down');
      $(this).children('span').html('Show');
    }
    var content = $(this).next('div');
    content.slideToggle(500);
  });

  // Projects
/*
  
  // If clicked, show project
  $('.thumbnail').click(function() {
  // Find previously active project
  var new_active = $(this);
  var prev_active = $('#projects .active');

  // Change attributes
  prev_active.removeClass('active');
  prev_active.children('img').attr('src', "img/projects/" + prev_active.attr('id') + "_logo_grayscale.png");

  // Prepare new project
  new_active.addClass('active');
  new_active.children('img').attr('src', "img/projects/" + new_active.attr('id') + "_logo.png");

  // Show new project
  scroll_to_elt('#showcase');
  $("#" + prev_active.attr('id') + "_show").fadeOut(300, function() {
      $("#" + new_active.attr('id') + "_show").fadeIn(400);
  });
    });
 
    // Hover, show color image
    $('.thumbnail').hover(
  function() {      
      $(this).children('img').attr('src', "img/projects/" + $(this).attr('id') + "_logo.png");
  }, function() {     
      if ($(this).attr('class').search('active') != -1)
        return;

      $(this).children('img').attr('src', "img/projects/" + $(this).attr('id') + "_logo_grayscale.png");
  }
    );
*/
  // Validate form client-side settings
  $("#contact").validate({
    rules:  {
      subject: "required",
      email: {
        required: true,
        email: true
      },
      message: "required"
  }
  });

  $("#contact #submit").click(function() {
  // check form before submission
    if (!$("#contact").valid())
      return false;
  
    // AJAX request
    $.ajax({
      type: "POST",
      url: 'http://lperez.bugs3.com/mail.php',
      data: { name: $('#name').val(), 
              email: $('#email').val(), 
              message: $('#message').val() }
    }).done(function( msg ) {
      $('#response').html(msg);
      if (msg.search("success") != -1) {
        $('#name').val("");
        $('#email').val("");
        $('#message').val("");
      }
    });
  });
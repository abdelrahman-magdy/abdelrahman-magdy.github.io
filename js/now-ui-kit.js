/*!

 =========================================================
 * Now-ui-kit - v1.1.0
 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
    backgroundOrange = false,
    toggle_initialized = false;

$(document).ready(function() {
    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Popovers and set color for popovers
    $('[data-toggle="popover"]').each(function() {
        color_class = $(this).data('color');
        $(this).popover({
            template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        });
    });

    // Activate the image for the navbar-collapse
    nowuiKit.initNavbarImage();

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

    if ($('.navbar[color-on-scroll]').length != 0) {
        nowuiKit.checkScrollForTransparentNavbar();
        $(window).on('scroll', nowuiKit.checkScrollForTransparentNavbar)
    }

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Activate bootstrapSwitch
    $('.bootstrap-switch').each(function() {
        $this = $(this);
        data_on_label = $this.data('on-label') || '';
        data_off_label = $this.data('off-label') || '';

        $this.bootstrapSwitch({
            onText: data_on_label,
            offText: data_off_label
        });
    });

    if ($(window).width() >= 992) {
        big_image = $('.page-header-image[data-parallax="true"]');

        $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
    }

    // Activate Carousel
    $('.carousel').carousel({
        interval: 4000
    });

    $('.date-picker').each(function() {
        $(this).datepicker({
            templates: {
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if (datepicker_color.length != 0) {
                $('.datepicker').addClass('datepicker-' + datepicker_color + '');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
        });
    });


});

$(window).on('resize', function() {
    nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);

    if (nowuiKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function() {
            $('html').removeClass('nav-open');
            nowuiKit.misc.navbar_menu_visible = 0;
            setTimeout(function() {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });

        $('html').addClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
    }
});

nowuiKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),

    initNavbarImage: function() {
        var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
        var background_image = $navbar.data('nav-image');

        if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .css('background-size', "cover")
                    .addClass('has-image');
            }
        } else if (background_image != undefined) {
            $navbar.css('background', "")
                .attr('data-nav-image', '' + background_image + '')
                .css('background-size', "")
                .removeClass('has-image');
        }
    },

    initSliders: function() {
        // Sliders for demo purpose in refine cards section
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });

    }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};



/************** smoooth type effect in header ************/


jQuery(document).ready(function($) {
    //set animation timing
    var animationDelay = 2500,
      //loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 50,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;
  
    initHeadline();
  
  
    function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
    }
  
    function singleLetters($words) {
      $words.each(function() {
        var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
        for (i in letters) {
          if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
          letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
        }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
      });
    }
  
    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function() {
        var headline = $(this);
  
        if (headline.hasClass('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(function() {
            headline.find('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);
        } else if (headline.hasClass('clip')) {
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10
          spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type')) {
          //assign to .cd-words-wrapper the width of its longest word
          var words = headline.find('.cd-words-wrapper b'),
            width = 0;
          words.each(function() {
            var wordWidth = $(this).width();
            if (wordWidth > width) width = wordWidth;
          });
          headline.find('.cd-words-wrapper').css('width', width);
        };
  
        //trigger animation
        setTimeout(function() {
          hideWord(headline.find('.is-visible').eq(0))
        }, duration);
      });
    }
  
    function hideWord($word) {
      var nextWord = takeNext($word);
  
      if ($word.parents('.cd-headline').hasClass('type')) {
        var parentSpan = $word.parent('.cd-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');
        setTimeout(function() {
          parentSpan.removeClass('selected');
          $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function() {
          showWord(nextWord, typeLettersDelay)
        }, typeAnimationDelay);
  
      } else if ($word.parents('.cd-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
  
      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          width: '2px'
        }, revealDuration, function() {
          switchWord($word, nextWord);
          showWord(nextWord);
        });
  
      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
        $word.parents('.cd-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, barAnimationDelay);
        setTimeout(function() {
          $word.parents('.cd-words-wrapper').addClass('is-loading')
        }, barWaiting);
  
      } else {
        switchWord($word, nextWord);
        setTimeout(function() {
          hideWord(nextWord)
        }, animationDelay);
      }
    }
  
    function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');
  
      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          'width': $word.width() + 10
        }, revealDuration, function() {
          setTimeout(function() {
            hideWord($word)
          }, revealAnimationDelay);
        });
      }
    }
  
    function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');
  
      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          hideLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else if ($bool) {
        setTimeout(function() {
          hideWord(takeNext($word))
        }, animationDelay);
      }
  
      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
      }
    }
  
    function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');
  
      if (!$letter.is(':last-child')) {
        setTimeout(function() {
          showLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else {
        if ($word.parents('.cd-headline').hasClass('type')) {
          setTimeout(function() {
            $word.parents('.cd-words-wrapper').addClass('waiting');
          }, 200);
        }
        if (!$bool) {
          setTimeout(function() {
            hideWord($word)
          }, animationDelay)
        }
      }
    }
  
    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }
  
    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }
  
    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }
  });
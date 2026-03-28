// Ensure pointer cursor is applied inline in case CSS is overridden
(function () {
  var boxes = document.querySelectorAll('.clickable-box');
  boxes.forEach(function(box) {
    try {
      box.style.cursor = 'pointer';
      // also apply to overlay/child elements that may cover the box
      var children = box.querySelectorAll('*');
      children.forEach(function(c){ c.style.cursor = 'pointer'; });
    } catch(e) { /* ignore */ }
  });
})();


// Make elements with .clickable-box navigate to their data-href and support keyboard activation.
(function () {
  var boxes = document.querySelectorAll('.clickable-box');
  if (!boxes.length) return;
  boxes.forEach(function(box) {
    var href = box.getAttribute('data-href');
    if (!href) return;
    // Click handler
    box.addEventListener('click', function(e) {
      // ignore if clicking a nested link
      var target = e.target;
      while (target && target !== box) {
        if (target.tagName === 'A') return;
        target = target.parentNode;
      }
      window.location.href = href;
    });
    // Keyboard (Enter / Space)
    box.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        box.click();
      }
    });
  });
})();



$(function() {
    'use strict';

/*--------------------------------------------------------------
    Preloder fadeout and newsletter popup
--------------------------------------------------------------*/
    $(window).load(function() {
        $(".pre-loder").delay(500).fadeOut('slow', function() {
            var newsLetterPopup = $('.news-letter-popup');
            newsLetterPopup.css({
                'visibility': 'visible',
                'opacity': 1
            });
        });
    });



/*--------------------------------------------------------------
  Setting resort and beautiful spa col heigh
--------------------------------------------------------------*/
    $(window).load(function() {
        resortSectionHeight();
        beautiSpaSectionHeight();
    });


    $(window).resize(function() {
        resortSectionHeight();
        beautiSpaSectionHeight();
    });



/*--------------------------------------------------------------
  Hero slider
--------------------------------------------------------------*/
    var time = 7; // time in seconds

    var $progressBar,
    $bar, 
    $elem, 
    isPause, 
    tick,
    percentTime;

    //Init the carousel
    $(".hero-slider").owlCarousel({
        slideSpeed : 500,
        paginationSpeed : 500,
        singleItem : true,
        afterInit : progressBar,
        afterMove : moved,
        startDragging : pauseOnDragging,
        mouseDrag: false

    });

    function progressBar(elem){
        $elem = elem;
        buildProgressBar();
        start();
    }

    function buildProgressBar(){
        $progressBar = $("<div>",{
            id:"progressBar"
        });
        $bar = $("<div>",{
            id:"bar"
        });
        $progressBar.append($bar).prependTo($elem);
    }

    function start() {
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    };

    function interval() {
        if(isPause === false){
            percentTime += 1 / time;
            $bar.css({
               width: percentTime+"%"
             });
            if(percentTime >= 100){
              //slide to next item 
              $elem.trigger('owl.next')
            }
        }
    }

    function pauseOnDragging(){
        isPause = true;
    }

    function moved(){
        clearTimeout(tick);
        start();
    }


/*--------------------------------------------------------------
    Functin for resort and beautiful spa coloum height
--------------------------------------------------------------*/
     /******************** resort section height ********************/
    function resortSectionHeight() {
        var aboutSectionHeight = $('.about').innerHeight();
        var resortSection = $('.resort .item');
        resortSection.css({
            'height': aboutSectionHeight + 'px'
        });
    }

    function beautiSpaSectionHeight() {
        var faetureSectionHeight = $('.beautifull-spa-and-faeture .faeture').height();
        var beautifullSpa = $('.beautifull-spa-and-faeture .beautifull-spa');
        beautifullSpa.css({
            'height': faetureSectionHeight + 'px'
        });
    }



/*--------------------------------------------------------------
    About slider
--------------------------------------------------------------*/
    $('.about-slider').owlCarousel({
        singleItem : true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Resort slider
--------------------------------------------------------------*/
    $('.resort-slider').owlCarousel({
        singleItem : true,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Butiful spa and feature section animation
--------------------------------------------------------------*/
    $('.beautifull-spa-and-faeture #first-box').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.beautifull-spa-and-faeture #first-box').addClass('animated bounceIn1');
            $('.beautifull-spa-and-faeture #second-box').addClass('animated bounceIn3');
        });
    });

    $('.beautifull-spa-and-faeture #third-box').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.beautifull-spa-and-faeture #third-box').addClass('animated bounceIn3');
            $('.beautifull-spa-and-faeture #fourth-box').addClass('animated bounceIn4');
        });
    });



/*--------------------------------------------------------------
   Fun fact section animate numbers
--------------------------------------------------------------*/
    $('.fun-fact .container .row').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('#happy-clients').animateNumber({ number: 1455 }, 2000);
            $('#awards').animateNumber({ number: 725 }, 2000);
            $('#coffee').animateNumber({ number: 260 }, 2000);
            $('#works').animateNumber({ number: 128 }, 2000);
        });
    });



/*--------------------------------------------------------------
   Advantage section animation
--------------------------------------------------------------*/
     $('.advantages #first-advantage, .advantages #second-advantage, .advantages #third-advantage, .advantages #fourth-advantage').css({
        'opacity': 0
     });

    $('.advantages #first-advantage').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.advantages #first-advantage').addClass('animated fadeInUp');
        });
    });

    $('.advantages #second-advantage').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.advantages #second-advantage').addClass('animated fadeInUp');
        });
    });

    $('.advantages #third-advantage').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.advantages #third-advantage').addClass('animated fadeInUp');
        });
    });

    $('.advantages #fourth-advantage').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.advantages #fourth-advantage').addClass('animated fadeInUp');
        });
    });



/*--------------------------------------------------------------
   Facial massage slider
--------------------------------------------------------------*/
    $('.facial-slider').owlCarousel({
        items : 3,
        itemsDesktop: [1199,3],    
        autoPlay: true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
  Shop slider
--------------------------------------------------------------*/
    $('.shop-slider').owlCarousel({
        singleItem : true,
        autoPlay: false,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
  Team member section animation
--------------------------------------------------------------*/
    $('.exparts #left-member, .exparts #right-member').css({
        'opacity': 0
    });
     
    $('.exparts .content').each(function () {
        var $this = $(this);
        var myVal = $(this).data("value");

        $this.appear(function() {
            $('.exparts #left-member').addClass('fadeInLeft');
            $('.exparts #right-member').addClass('fadeInRight');
        });
    });



/*--------------------------------------------------------------
    Jquery date picker
--------------------------------------------------------------*/
    $('#arrive-date').datepicker();
    $('#depart-date').datepicker();



/*--------------------------------------------------------------
    Partner slider
--------------------------------------------------------------*/
    $('.partner-slider').owlCarousel({
        items : 4,
        itemsTablet: [767,3],
        autoPlay: true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Appoinment Popup box
--------------------------------------------------------------*/
    (function() {
        var makeAppoinmentBtn = $('.make-appointment-btn'),
            appoinmentPopUpBox = $('.appoinment-popup-box'),
            closeBtn = $('.appoinment-popup-box .close');

        makeAppoinmentBtn.on('click', function(e) {
            e.preventDefault();
            appoinmentPopUpBox.css({
                'visibility': 'visible',
                'opacity': 1
            });

            closeBtn.on('click', function() {
                appoinmentPopUpBox.css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
                return false;
            });
            return false;
        });
    }());



/*--------------------------------------------------------------
    News letter Popup box close
--------------------------------------------------------------*/
    (function() {
        var newsLetterPopUpBox = $('.news-letter-popup'),
            closeBtn = $('.news-letter-popup .close');

        closeBtn.on('click', function() {
            newsLetterPopUpBox.css({
                'visibility': 'hidden',
                'opacity': 0
            });
            return false;
        });
    }());



/*--------------------------------------------------------------
    Common script for menu and back to top btn
--------------------------------------------------------------*/

    // toggle search box and menu
    var openSearch = $('header .open-search'),
        openMenu = $('header .open-menu'),
        searchBox = $('header .search-box'),
        menu = $('header .navbar .navbar-nav');

    openSearch.on('click', function() {
        searchBox.toggleClass('toggle-search-box');
        return false;
    });

    openMenu.on('click', function() {
        menu.toggleClass('toggle-menu');
        return false;
    });


    // back-to-top
    $('body').prepend('<a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>');
    var amountScrolled = 300;

    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('slow');
        } else {
            $('a.back-to-top').fadeOut('slow');
        }
    });
    
    $('a.back-to-top').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 700);
        return false;
    });

}); // end of document.ready

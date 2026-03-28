
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
    Jquery ui date picker
--------------------------------------------------------------*/
    $('#arrive-date').datepicker();
    $('#depart-date').datepicker();



/*--------------------------------------------------------------
    Hero slider
--------------------------------------------------------------*/
    $('.hero').owlCarousel({
        singleItem : true,
        autoPlay: true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



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
    Begin journey slider
--------------------------------------------------------------*/
    $('.begin-journey-slider').owlCarousel({
        singleItem : true,
        autoPlay: true,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Service slider
--------------------------------------------------------------*/
    $('.service-slider').owlCarousel({
        items : 3,
        itemsDesktop: [1199,3],
        itemsDesktopSmall: [991,2],
        autoPlay: true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Feature section animation
--------------------------------------------------------------*/
    $('.faeture #first-feature, .faeture #second-feature, .faeture #third-feature, .faeture #fourth-feature, .faeture #fifth-feature, .faeture #sixth-feature, .faeture #seventh-feature, .faeture #eighth-feature').css({
        'opacity': 0
    });

    $('.faeture #first-feature').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.faeture #first-feature').addClass('animated bounceIn1');
            $('.faeture #second-feature').addClass('animated bounceIn2');
            $('.faeture #third-feature').addClass('animated bounceIn3');
            $('.faeture #fourth-feature').addClass('animated bounceIn4');
        });
    });

    $('.faeture #fifth-feature').each(function () {
        var $this = $(this);

        $this.appear(function() {
            $('.faeture #fifth-feature').addClass('animated bounceIn1');
            $('.faeture #sixth-feature').addClass('animated bounceIn2');
            $('.faeture #seventh-feature').addClass('animated bounceIn3');
            $('.faeture #eighth-feature').addClass('animated bounceIn4');
        });
    });



/*--------------------------------------------------------------
    News slider
--------------------------------------------------------------*/
    $('.news-slider').owlCarousel({
        singleItem : true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Shop section slider
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
    Partner slider
--------------------------------------------------------------*/
    $('.partner-slider').owlCarousel({
        items : 4,
        itemsTablet: [767,3],
        itemsMobile: [500,1],
        autoPlay: true,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    News letter Popup box colse
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
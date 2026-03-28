
$(function() {
    'use strict';

/*--------------------------------------------------------------
    about-victoria section animation
--------------------------------------------------------------*/
    $('#facial-style').css({
        'opacity': '0'
    });

    $('#facial-style').each(function () {
        var $this = $(this);
        var myVal = $(this).data("value");

        $this.appear(function() {
            $('#facial-style').addClass('animated fadeInUp');
        });
    });



/*--------------------------------------------------------------
    Jquery ui date picker
--------------------------------------------------------------*/
    $('#arrive-date').datepicker();
    $('#depart-date').datepicker();



/*--------------------------------------------------------------
    Advantages section animation
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
    Facial massage silder
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
    Service shop slider
--------------------------------------------------------------*/
    $('.service-shop-slider').owlCarousel({
        items : 3,
        itemsDesktop: [1199,3],    
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

}) // end of document.ready
$(function() {

    'use strict';
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

}) //end of document.ready

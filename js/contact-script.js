
$(function() {
    'use strict';

/*--------------------------------------------------------------
    Setting leave message coloumn height
--------------------------------------------------------------*/
    function setLeftColHeight() {
        var leftCol = $('.leave-message .left-col'),
            rightCol = $('.leave-message .right-col'),
            rightColHeight = $('.leave-message .right-col').innerHeight();
       
        leftCol.css({
            'height': rightColHeight + 'px'
        })
    }

    // call the setLeftColHeight function
    setLeftColHeight();
    
    // when window resize call the setLeftColHeight function
    $(window).resize(function() {
        setLeftColHeight();
    });



/*--------------------------------------------------------------
    Jquery ui date picker
--------------------------------------------------------------*/
    $('#arrive-date').datepicker();
    $('#depart-date').datepicker();



/*--------------------------------------------------------------
    Goggle map setting
--------------------------------------------------------------*/
    // set the google map
    function map1() {
        var myLatLng = new google.maps.LatLng(44.841995,-93.116042);
        var mapProp = {
            center: myLatLng,
            zoom: 14,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROAD
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

        map.set('styles',
            [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#b1d0fe"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e9e5dc"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#f6a224"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#cbdfaa"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fee09b"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#cbdfaa"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#cbdfaa"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }, {
                    "lightness": 16
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#333333"
                }, {
                    "lightness": 40
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#b9c9a1"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }]
        );
    }; // end of map1


    // call the map1 function
    map1();



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

}); //end of document.ready
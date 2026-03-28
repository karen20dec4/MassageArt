
$(function() {
    'use strict'

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
    Product slider
--------------------------------------------------------------*/
    $('.product-slider').owlCarousel({
        singleItem : true,
        autoPlay: false,
        navigation: true,
        navigationText:  ["<i class='flaticon-arrows-3'></i>","<i class='flaticon-arrows-1'></i>"],
        pagination: false,
        mouseDrag: false
    });



/*--------------------------------------------------------------
    Content Section Height setting depending sidebar
--------------------------------------------------------------*/
    function colHeightSettingForBigScreen() {
        var firstRowFirstCol = $('.first-row #first-col'),
            firstRowLastCol = $('.first-row #snd-col'),
            secondRowFirstCol = $('.second-row #third-col'),
            secondRowLastCol = $('.second-row #fourth-col'),
            thirdRowFirstCol = $('.third-row #fifth-col'),
            thirdRowLastCol = $('.third-row .product-slider'),
            tallColl = $('#tall-col'),
            leftSide = $('.left-side');
        
        var breakPoint = 768;
        var colHeightFull = leftSide.innerHeight();
        var perColHeight = colHeightFull / 3;

        firstRowFirstCol.css({
            'height': perColHeight + 'px'
        })
        firstRowLastCol.css({
            'height': perColHeight + 'px'
        })
        secondRowFirstCol.css({
            'height': perColHeight + 'px'
        })
        secondRowLastCol.css({
            'height': perColHeight + 'px'
        })
        thirdRowFirstCol.css({
            'height': perColHeight + 'px'
        })
        thirdRowLastCol.css({
            'height': perColHeight + 'px'
        })
        tallColl.css({
            'height': colHeightFull + 'px'
        })
    }


    function colHeightSettingForSmallScreen() {
        var firstRowFirstCol = $('.first-row #first-col'),
            firstRowLastCol = $('.first-row #snd-col'),
            secondRowFirstCol = $('.second-row #third-col'),
            secondRowLastCol = $('.second-row #fourth-col'),
            thirdRowFirstCol = $('.third-row #fifth-col'),
            thirdRowLastCol = $('.third-row .product-slider'),
            tallColl = $('#tall-col'),
            leftSide = $('.left-side');

        var colHeightFull = 900;
        var perColHeight = colHeightFull / 3;

        firstRowFirstCol.css({
            'height': perColHeight + 'px'
        })
        firstRowLastCol.css({
            'height': perColHeight + 'px'
        })
        secondRowFirstCol.css({
            'height': perColHeight + 'px'
        })
        secondRowLastCol.css({
            'height': perColHeight + 'px'
        })
        thirdRowFirstCol.css({
            'height': perColHeight + 'px'
        })
        thirdRowLastCol.css({
            'height': perColHeight + 'px'
        })
        tallColl.css({
            'height': colHeightFull + 'px'
        })
    }

    // call the bigscreen size col setting function
    colHeightSettingForBigScreen();

    
    // call the smallscreen heigh setting function when into small screen
    if (window.innerWidth < 768) {          
         colHeightSettingForSmallScreen(); 
    }


    /**************************************************** 
        when window resize call the bigscreen 
        and small screen column height setting function
    *****************************************************/
    $(window).resize(colHeightSettingForBigScreen);

    $(window).resize(function() {
        if (window.innerWidth < 768) {          
             colHeightSettingForSmallScreen(); 
        }
    });



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
    Back to top
--------------------------------------------------------------*/
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

}); // end of doucment.ready

$(function() {
    'use strict';

/*--------------------------------------------------------------
    Preloder 
--------------------------------------------------------------*/
    $(window).load(function() {
         $(".pre-loder").delay(500).fadeOut('slow');
    });



/*--------------------------------------------------------------
    Common script for menu and back to top btn
--------------------------------------------------------------*/

    /***************************************
        Menu and search box open and close
    ***************************************/
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


    /***************************************
       Back to top
    ***************************************/
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

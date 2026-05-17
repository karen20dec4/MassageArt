
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
    var $stickyHeader = $('header.common-header');
    // Hysteresis: add .scrolled when crossing 80px downward, remove it only
    // when going back above 30px. The gap prevents the class from toggling
    // on/off rapidly around a single threshold while the header shrinks
    // and the layout shifts.
    var shrinkAt = 80;
    var unshrinkAt = 30;

    $(window).scroll(function() {
        var st = $(window).scrollTop();
        if (st > amountScrolled) {
            $('a.back-to-top').fadeIn('slow');
        } else {
            $('a.back-to-top').fadeOut('slow');
        }
        // Shrink the sticky header past the logo zone (desktop only — the
        // .scrolled CSS rules live inside a min-width: 768px media query).
        var isScrolled = $stickyHeader.hasClass('scrolled');
        if (!isScrolled && st > shrinkAt) {
            $stickyHeader.addClass('scrolled');
        } else if (isScrolled && st < unshrinkAt) {
            $stickyHeader.removeClass('scrolled');
        }
    });
    
    $('a.back-to-top').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 700);
        return false;
    });

}); // end of document.ready
